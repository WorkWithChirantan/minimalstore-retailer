/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { fetchSyncedTransactions, subscribeToCheckoutSync, fetchProducts, fetchStores, createStoreApi, updateStoreApi, deleteStoreApi } from '../services/checkoutSync';
import { supabase } from '../lib/supabase';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children, session }) => {
  const [profile, setProfile] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [storesLoading, setStoresLoading] = useState(false);
  const [storesError, setStoresError] = useState(null);
  const [inventory, setInventory] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [liveFeed, setLiveFeed] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    activeSessions: 0,
    completedToday: 0,
    avgCart: 0,
    totalProductsSold: 0,
  });
  const processedTransactionIds = useRef(new Set());

  const ownerId = session?.user?.id;

  // Fetch Profile
  useEffect(() => {
    if (!session?.user?.id) return;

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!error && data) {
        setProfile(data);
      }
      setProfileLoaded(true);
    };

    loadProfile();
  }, [session]);

  // Fetch Stores from API when profile is loaded
  useEffect(() => {
    if (!profile || !ownerId) return;

    const loadStores = async () => {
      setStoresLoading(true);
      setStoresError(null);
      try {
        const storesData = await fetchStores(ownerId);
        setStores(storesData);
      } catch (err) {
        console.warn('Failed to fetch stores', err);
        setStoresError(err.message);
      } finally {
        setStoresLoading(false);
      }
    };

    loadStores();
  }, [profile, ownerId]);

  const processNewTransaction = useCallback((tx) => {
    if (!tx?.id || processedTransactionIds.current.has(tx.id)) return;

    processedTransactionIds.current.add(tx.id);
    const safeItems = Array.isArray(tx.itemsList) ? tx.itemsList : [];
    const safeTotal = Number(tx.total || 0);

    setTransactions((prev) => [{ ...tx, itemsList: safeItems }, ...prev]);

    setInventory((prev) => {
      const next = { ...prev };
      safeItems.forEach((item) => {
        if (next[item.id] !== undefined) {
          next[item.id] = Math.max(0, next[item.id] - item.quantity);
        }
      });
      return next;
    });

    setStats((prev) => {
      const completedToday = prev.completedToday + 1;
      const totalSales = prev.totalSales + safeTotal;
      const itemsInTx = safeItems.reduce((sum, item) => sum + item.quantity, 0);
      return {
        ...prev,
        totalSales,
        completedToday,
        activeSessions: Math.max(prev.activeSessions, 1),
        avgCart: Math.round(totalSales / completedToday),
        totalProductsSold: (prev.totalProductsSold || 0) + itemsInTx,
      };
    });

    const mainItem = tx.itemsList?.[0] || { name: 'Item', quantity: tx.items || 1 };
    setLiveFeed((prev) => [
      {
        id: `${tx.id}-${Date.now()}`,
        text: `${mainItem.name || 'Item'} purchased`,
        units: mainItem.quantity || 1,
        time: 'Just now',
        type: 'purchase',
      },
      ...prev.slice(0, 9),
    ]);
  }, []);

  useEffect(() => {
    // Only load dashboard data if profile is loaded and exists
    if (!profile) return;

    fetchSyncedTransactions()
      .then((snapshot) => snapshot.forEach(processNewTransaction))
      .catch((error) => console.warn('Initial checkout sync failed', error));

    fetchProducts().then(data => {
      setProducts(data);
      setInventory(data.reduce((acc, p) => ({ ...acc, [p.id]: p.quantity }), {}));
    }).catch(err => console.warn('Failed to fetch initial products', err));

    return subscribeToCheckoutSync({
      onSnapshot: (snapshot) => snapshot.forEach(processNewTransaction),
      onInventory: (newInventory) => setInventory(newInventory),
      onTransaction: processNewTransaction,
      onError: (error) => console.warn('Checkout sync stream interrupted', error),
    });
  }, [processNewTransaction, profile]);

  // ─── Store CRUD (persisted to database) ────────────────────────────────

  const addStore = useCallback(async (storeData) => {
    if (!ownerId) return;
    try {
      const saved = await createStoreApi(storeData, ownerId);
      setStores((prev) => [saved, ...prev]);
      return saved;
    } catch (err) {
      console.error('Failed to create store', err);
      throw err;
    }
  }, [ownerId]);

  const updateStore = useCallback(async (id, updates) => {
    if (!ownerId) return;
    try {
      const saved = await updateStoreApi(id, updates, ownerId);
      setStores((prev) => prev.map((s) => s.id === id ? saved : s));
      return saved;
    } catch (err) {
      console.error('Failed to update store', err);
      throw err;
    }
  }, [ownerId]);

  const removeStore = useCallback(async (id) => {
    if (!ownerId) return;
    try {
      await deleteStoreApi(id, ownerId);
      setStores((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error('Failed to delete store', err);
      throw err;
    }
  }, [ownerId]);

  return (
    <DashboardContext.Provider value={{
      profile, setProfile, profileLoaded, session,
      products, setProducts,
      stores, setStores, storesLoading, storesError,
      inventory, setInventory,
      transactions, setTransactions,
      liveFeed,
      stats,
      processNewTransaction,
      addStore,
      updateStore,
      removeStore,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
