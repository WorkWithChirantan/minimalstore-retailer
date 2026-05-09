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

// ─── Store Management API ────────────────────────────────────────────────

const ownerRequest = async (path, options = {}, ownerId) => {
  if (!ownerId) throw new Error('Missing owner ID for store management');
  return request(path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'x-owner-id': ownerId,
    },
  });
};

export const fetchStores = async (ownerId) => {
  const { stores } = await ownerRequest('/stores', {}, ownerId);
  return stores.map(mapStoreRow);
};

export const createStoreApi = async (storeData, ownerId) => {
  const { store } = await ownerRequest('/stores', {
    method: 'POST',
    body: JSON.stringify({
      name: storeData.name,
      address: storeData.address || null,
      qr_code: storeData.qrCode || storeData.qr_code || null,
      subdomain: storeData.subdomain || null,
      status: storeData.status || 'Active',
    }),
  }, ownerId);
  return mapStoreRow(store);
};

export const updateStoreApi = async (id, updates, ownerId) => {
  const payload = {};
  if (updates.name !== undefined) payload.name = updates.name;
  if (updates.address !== undefined) payload.address = updates.address;
  if (updates.qrCode !== undefined) payload.qr_code = updates.qrCode;
  if (updates.qr_code !== undefined) payload.qr_code = updates.qr_code;
  if (updates.subdomain !== undefined) payload.subdomain = updates.subdomain;
  if (updates.status !== undefined) payload.status = updates.status;

  const { store } = await ownerRequest(`/stores/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }, ownerId);
  return mapStoreRow(store);
};

export const deleteStoreApi = async (id, ownerId) => {
  await ownerRequest(`/stores/${id}`, {
    method: 'DELETE',
  }, ownerId);
  return { deleted: true };
};

// Map Supabase store row to frontend shape
const mapStoreRow = (row) => ({
  id: row.id,
  name: row.name,
  address: row.address || '',
  qrCode: row.qr_code || '',
  subdomain: row.subdomain || '',
  status: row.status || 'Active',
  createdAt: row.created_at,
});

