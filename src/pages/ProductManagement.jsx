import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { createGlobalProduct, upsertInventory } from '../services/checkoutSync';
import {
  Search, Plus, Filter, Upload, Download,
  MoreVertical, Edit2, Trash2, ArrowUpRight,
  PackageCheck, PackageX
} from 'lucide-react';

const ProductManagement = () => {
  const { products, inventory } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    barcode: '',
    product_name: '',
    brand: '',
    category: '',
    unit: 'pcs',
    quantity_per_unit: 1,
    price: '',
    mrp: '',
    cost_price: '',
    stock_quantity: '',
    min_stock_level: 5,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.barcode.includes(searchTerm)
  );

  const actionBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    borderRadius: '14px',
    fontSize: '0.8125rem',
    fontWeight: 800,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid #E2E8F0',
    background: 'white',
    color: '#111111'
  };

  const primaryBtnStyle = {
    ...actionBtnStyle,
    background: '#111111',
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  const handleSaveProduct = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await createGlobalProduct({
        barcode: formData.barcode,
        product_name: formData.product_name,
        brand: formData.brand,
        category: formData.category,
        unit: formData.unit,
        quantity_per_unit: Number(formData.quantity_per_unit || 1),
      });

      await upsertInventory({
        barcode: formData.barcode,
        price: Number(formData.price),
        mrp: formData.mrp === '' ? null : Number(formData.mrp),
        cost_price: formData.cost_price === '' ? null : Number(formData.cost_price),
        stock_quantity: Number(formData.stock_quantity || 0),
        min_stock_level: Number(formData.min_stock_level || 0),
        is_available: true,
      });

      setMessage('Product saved. Inventory refreshes automatically.');
      setIsModalOpen(false);
      setFormData({
        barcode: '',
        product_name: '',
        brand: '',
        category: '',
        unit: 'pcs',
        quantity_per_unit: 1,
        price: '',
        mrp: '',
        cost_price: '',
        stock_quantity: '',
        min_stock_level: 5,
      });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const filterBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1rem',
    background: 'transparent',
    border: 'none',
    borderRadius: '10px',
    fontSize: '0.75rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#64748B',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  return (
    <div className="page-container">
      {/* Premium Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#111111' }}>Product Catalog</h1>
          <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem', fontWeight: 500 }}>Manage your product inventory, pricing, and assets.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={actionBtnStyle} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
            <Upload size={18} />
            Bulk Import
          </button>
          <button onClick={() => setIsModalOpen(true)} style={primaryBtnStyle} onMouseOver={e => e.currentTarget.style.background = '#000000'} onMouseOut={e => e.currentTarget.style.background = '#111111'}>
            <Plus size={18} />
            Add New Product
          </button>
        </div>
      </div>
      {message && <p style={{ marginBottom: '1rem', color: message.includes('saved') ? '#10B981' : '#EF4444', fontWeight: 800 }}>{message}</p>}

      <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }} className="animate-fade-in">
        {/* Modern Control Bar */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'white' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '480px' }}>
            <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={18} />
            <input
              type="text"
              placeholder="Search by name, barcode or SKU..."
              style={{ 
                width: '100%', 
                padding: '0.875rem 1rem 0.875rem 3rem', 
                background: '#F8FAFC', 
                border: '1px solid #F1F5F9', 
                borderRadius: '16px', 
                fontSize: '0.875rem', 
                fontWeight: 600, 
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              className="focus:bg-white focus:border-slate-200 focus:shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button style={filterBtnStyle} onMouseOver={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#111111'; }} onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B'; }}>
              <Filter size={16} />
              Filter
            </button>
            <button style={filterBtnStyle} onMouseOver={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#111111'; }} onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B'; }}>
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1.25rem 1.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Product Information</th>
                <th style={{ textAlign: 'left', padding: '1.25rem 1.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Barcode (GTIN)</th>
                <th style={{ textAlign: 'left', padding: '1.25rem 1.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Category</th>
                <th style={{ textAlign: 'left', padding: '1.25rem 1.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Retail Price</th>
                <th style={{ textAlign: 'left', padding: '1.25rem 1.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Live Stock</th>
                <th style={{ textAlign: 'left', padding: '1.25rem 1.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '1.25rem 1.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const stock = inventory[p.id];
                const isLowStock = stock < 10;
                const isOutOfStock = stock === 0;

                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }} onMouseOver={e => e.currentTarget.style.background = '#FDFDFD'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '52px', height: '52px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                          <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, color: '#111111', fontSize: '0.875rem' }}>{p.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>{p.weight} • <span style={{ opacity: 0.7 }}>Standard SKU</span></div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 600, color: '#64748B', letterSpacing: '0.05em' }}>{p.barcode}</span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 800, background: '#F1F5F9', color: '#111111', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{p.category}</span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: '#111111' }}>
                      ₹{p.price}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                         <span style={{ fontWeight: 800, fontSize: '0.875rem', color: isOutOfStock ? '#EF4444' : isLowStock ? '#F59E0B' : '#111111' }}>
                          {stock} units
                        </span>
                        <div style={{ width: '60px', height: '4px', background: '#F1F5F9', borderRadius: '2px' }}>
                          <div style={{ width: `${Math.min(100, (stock / 50) * 100)}%`, height: '100%', background: isOutOfStock ? '#EF4444' : isLowStock ? '#F59E0B' : '#10B981', borderRadius: '2px' }}></div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      {isOutOfStock ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#EF4444', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          <PackageX size={14} /> Stock-Out
                        </span>
                      ) : (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#10B981', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          <PackageCheck size={14} /> Active
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'end', gap: '0.25rem' }}>
                        <button style={{ padding: '8px', border: 'none', background: 'transparent', color: '#64748B', cursor: 'pointer', borderRadius: '8px' }} onMouseOver={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#111111'; }} onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B'; }}>
                          <Edit2 size={16} />
                        </button>
                        <button style={{ padding: '8px', border: 'none', background: 'transparent', color: '#64748B', cursor: 'pointer', borderRadius: '8px' }} onMouseOver={e => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.color = '#EF4444'; }} onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B'; }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <form onSubmit={handleSaveProduct} style={{ width: '100%', maxWidth: '640px', background: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #E2E8F0', boxShadow: '0 24px 60px rgba(15,23,42,0.18)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#111111' }}>Add Product</h2>
                <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem', fontWeight: 600 }}>Catalog fields are global. Price and stock are store-specific.</p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ border: 'none', background: '#F8FAFC', borderRadius: '12px', width: '40px', height: '40px', cursor: 'pointer', fontWeight: 900 }}>X</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                ['barcode', 'Barcode'],
                ['product_name', 'Product Name'],
                ['brand', 'Brand'],
                ['category', 'Category'],
                ['unit', 'Unit'],
                ['quantity_per_unit', 'Quantity Per Unit'],
                ['price', 'Selling Price'],
                ['mrp', 'MRP'],
                ['cost_price', 'Cost Price'],
                ['stock_quantity', 'Stock Quantity'],
                ['min_stock_level', 'Minimum Stock'],
              ].map(([key, label]) => (
                <label key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.7rem', fontWeight: 900, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {label}
                  <input
                    required={['barcode', 'product_name', 'price'].includes(key)}
                    type={['price', 'mrp', 'cost_price', 'stock_quantity', 'min_stock_level', 'quantity_per_unit'].includes(key) ? 'number' : 'text'}
                    value={formData[key]}
                    onChange={(event) => setFormData({ ...formData, [key]: event.target.value })}
                    style={{ padding: '0.8rem 0.9rem', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '0.875rem', color: '#111111', fontWeight: 700, textTransform: 'none', letterSpacing: 0 }}
                  />
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setIsModalOpen(false)} style={actionBtnStyle}>Cancel</button>
              <button type="submit" disabled={saving} style={{ ...primaryBtnStyle, opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving...' : 'Save Product'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
