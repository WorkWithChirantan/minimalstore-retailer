import { supabase } from '../lib/supabase';

export const fetchSyncedTransactions = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) {
    throw error;
  }
  
  // Convert Supabase items_list back to itemsList for frontend compatibility
  return data.map(tx => ({
    ...tx,
    itemsList: tx.items_list
  }));
};

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
};

export const subscribeToCheckoutSync = ({ onSnapshot, onTransaction, onInventory, onError }) => {
  
  const fetchAndNotifyInventory = async () => {
    try {
      const data = await fetchProducts();
      if(onInventory) {
        onInventory(data.reduce((acc, p) => ({ ...acc, [p.id]: p.quantity }), {}));
      }
    } catch (err) {
      if (onError) onError(err);
    }
  };

  const channel = supabase.channel('retailer-dashboard-changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'transactions' },
      (payload) => {
        const tx = payload.new;
        onTransaction({ ...tx, itemsList: tx.items_list });
      }
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'products' },
      () => {
        fetchAndNotifyInventory();
      }
    )
    .subscribe();

  // Initial loads
  fetchAndNotifyInventory();
  // onSnapshot is typically handled by fetchSyncedTransactions outside, but we can call it if needed.
  // Actually, DashboardContext already calls fetchSyncedTransactions manually.

  return () => {
    supabase.removeChannel(channel);
  };
};
