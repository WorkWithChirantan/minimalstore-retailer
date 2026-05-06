const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';
const STORE_KEY = 'scaas_retailer_store_id';

export const getStoreId = () => (
  import.meta.env.VITE_STORE_ID
  || localStorage.getItem(STORE_KEY)
  || ''
);

export const setStoreId = (storeId) => {
  if (storeId) localStorage.setItem(STORE_KEY, storeId);
};

const request = async (path, options = {}) => {
  const storeId = getStoreId();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(storeId ? { 'x-store-id': storeId } : {}),
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || `API request failed: ${response.status}`);
  }

  return payload;
};

const mapInventoryRowToProduct = (row) => {
  const product = row.products || {};
  return {
    id: row.barcode,
    barcode: row.barcode,
    name: product.product_name || row.barcode,
    brand: product.brand || '',
    category: product.category || '',
    subCategory: product.sub_category || '',
    description: product.description || '',
    image: product.image_url || '/favicon.svg',
    unit: product.unit || 'pcs',
    weight: product.quantity_per_unit ? `${product.quantity_per_unit} ${product.unit || ''}`.trim() : product.unit || '',
    price: Number(row.price || 0),
    mrp: row.mrp === null ? null : Number(row.mrp || 0),
    costPrice: row.cost_price === null ? null : Number(row.cost_price || 0),
    quantity: Number(row.stock_quantity || 0),
    minStockLevel: Number(row.min_stock_level || 0),
    batchNumber: row.batch_number || '',
    expiryDate: row.expiry_date || '',
    isAvailable: row.is_available,
  };
};

const mapOrderToTransaction = (order) => {
  const itemsList = (order.order_items || []).map((line) => ({
    id: line.barcode,
    barcode: line.barcode,
    name: line.products?.product_name || line.barcode,
    quantity: line.quantity,
    price: Number(line.price || 0),
  }));

  return {
    id: order.id,
    store: order.stores?.name || order.store_id,
    items: itemsList.reduce((sum, item) => sum + item.quantity, 0),
    total: Number(order.total_amount || 0),
    method: order.payment_method === 'COUNTER' ? 'Cash' : 'UPI',
    timestamp: order.created_at,
    status: order.status,
    itemsList,
  };
};

export const fetchSyncedTransactions = async () => {
  const storeId = getStoreId();
  if (!storeId) return [];

  const { orders } = await request(`/order?store_id=${encodeURIComponent(storeId)}`);
  return orders.map(mapOrderToTransaction);
};

export const fetchProducts = async () => {
  const storeId = getStoreId();
  if (!storeId) return [];

  const { inventory } = await request(`/inventory/${storeId}`);
  return inventory.map(mapInventoryRowToProduct);
};

export const createGlobalProduct = async (product) => {
  const { product: created } = await request('/products', {
    method: 'POST',
    body: JSON.stringify(product),
  });
  return created;
};

export const upsertInventory = async (inventory) => {
  const { inventory: saved } = await request('/inventory', {
    method: 'POST',
    body: JSON.stringify(inventory),
  });
  return mapInventoryRowToProduct(saved);
};

export const subscribeToCheckoutSync = ({ onSnapshot, onInventory, onError }) => {
  let active = true;

  const refresh = async () => {
    try {
      const [transactions, products] = await Promise.all([
        fetchSyncedTransactions(),
        fetchProducts(),
      ]);

      if (!active) return;
      if (onSnapshot) onSnapshot(transactions);
      if (onInventory) {
        onInventory(products.reduce((acc, product) => ({ ...acc, [product.id]: product.quantity }), {}));
      }
    } catch (err) {
      if (onError) onError(err);
    }
  };

  refresh();
  const intervalId = window.setInterval(refresh, 5000);

  return () => {
    active = false;
    window.clearInterval(intervalId);
  };
};
