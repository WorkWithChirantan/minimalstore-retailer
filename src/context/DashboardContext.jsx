import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { fetchSyncedTransactions, subscribeToCheckoutSync } from '../services/checkoutSync';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

const INITIAL_PRODUCTS = [];

const INITIAL_STORES = [];

const INITIAL_INVENTORY = INITIAL_PRODUCTS.reduce((stock, product, index) => ({
  ...stock,
  [product.id]: 24 + ((index * 7) % 42),
}), {});

const getInitialTransactions = () => [];

const getMainItem = (tx) => tx.itemsList?.[0] || { name: 'Item', quantity: tx.items || 1 };

export const DashboardProvider = ({ children }) => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [stores, setStores] = useState(INITIAL_STORES);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [transactions, setTransactions] = useState(getInitialTransactions);
  const [liveFeed, setLiveFeed] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    activeSessions: 0,
    completedToday: 0,
    avgCart: 0,
    totalProductsSold: 0,
  });
  const processedTransactionIds = useRef(new Set(getInitialTransactions().map((tx) => tx.id)));

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

    const mainItem = getMainItem(tx);
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
    fetchSyncedTransactions()
      .then((snapshot) => snapshot.forEach(processNewTransaction))
      .catch((error) => console.warn('Initial checkout sync failed', error));

    // Wait, the products also need to be fetched and stored so they show up in tables
    import('../services/checkoutSync').then(({ fetchProducts }) => {
      fetchProducts().then(data => {
        setProducts(data);
      }).catch(err => console.warn('Failed to fetch initial products', err));
    });

    return subscribeToCheckoutSync({
      onSnapshot: (snapshot) => snapshot.forEach(processNewTransaction),
      onInventory: (newInventory) => setInventory(newInventory),
      onTransaction: processNewTransaction,
      onError: (error) => console.warn('Checkout sync stream interrupted', error),
    });
  }, [processNewTransaction]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'scaas_transactions' && e.newValue) {
        processNewTransaction(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [processNewTransaction]);

  const addStore = useCallback((storeData) => {
    setStores((prev) => [...prev, {
      id: `s${Date.now()}`,
      status: 'Active',
      ...storeData,
    }]);
  }, []);

  const updateStore = useCallback((id, updates) => {
    setStores((prev) => prev.map((s) => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const removeStore = useCallback((id) => {
    setStores((prev) => prev.filter((s) => s.id !== id));
  }, []);

  useEffect(() => {
    // Empty dependency array, mock interval removed.
  }, [products, stores, processNewTransaction]);

  return (
    <DashboardContext.Provider value={{
      products, setProducts,
      stores, setStores,
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
