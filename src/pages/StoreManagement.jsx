import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext';
import { 
  MapPin, Plus, Edit3, ToggleRight, 
  Download, ExternalLink, Globe, X, 
  Trash2, BarChart3, ChevronRight,
  Package, Database
} from 'lucide-react';

const StoreCard = ({ store, onToggle, onEdit, onDelete }) => {
  const navigate = useNavigate();
  if (!store) return null;

  const isActive = store.status === 'Active';

  // Simplified and high-contrast button style for reliability
  const secondaryBtnStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.625rem',
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    fontSize: '0.65rem',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#64748B',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  return (
    <div className="stat-card animate-fade-in dashboard-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'default' }}>
      {/* Header with quick actions */}
      <div style={{ 
        padding: '1.25rem', 
        background: isActive ? '#111111' : '#F1F5F9', 
        color: isActive ? 'white' : '#64748B',
        transition: 'all 0.3s ease'
      }}>
        <div className="flex justify-between items-start mb-4">
          <div style={{ background: isActive ? 'rgba(255,255,255,0.1)' : 'white', padding: '10px', borderRadius: '12px' }}>
            <Globe size={20} color={isActive ? 'white' : '#64748B'} />
          </div>
          <div className="flex gap-1.5">
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(store); }}
              style={{ background: 'transparent', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer', color: 'inherit' }}
            >
              <Edit3 size={14} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onToggle(store.id, isActive ? 'Inactive' : 'Active'); }}
              style={{ background: 'transparent', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer', color: 'inherit' }}
            >
              <ToggleRight size={14} style={{ transform: isActive ? 'none' : 'rotate(180deg)', transition: 'transform 0.3s ease' }} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(store.id); }}
              style={{ background: 'transparent', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer', color: '#fb7185' }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <h3 style={{ fontSize: '1.125rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.15rem' }}>{store.name || 'Unnamed Store'}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', opacity: 0.7, fontSize: '0.75rem', fontWeight: 600 }}>
          <MapPin size={12} />
          {store.address || 'No address provided'}
        </div>
      </div>

      {/* Main Body - Interactive Analytics Link */}
      <div 
        onClick={() => navigate(`/stores/${store.id}`)}
        style={{ 
          flex: 1, 
          padding: '2rem 1.5rem', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '1.25rem', 
          background: 'white',
          cursor: 'pointer'
        }}
        className="group"
      >
        <div style={{ 
          width: '64px', 
          height: '64px', 
          borderRadius: '20px', 
          background: '#F8FAFC', 
          border: '1px solid #F1F5F9', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'var(--primary)',
          transition: 'all 0.3s ease'
        }} className="icon-box">
          <BarChart3 size={28} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.625rem', fontWeight: 900, color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Click to Enter Node</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontWeight: 800, color: '#111111', fontSize: '0.925rem' }}>
            VIEW ANALYTICS 
            <ChevronRight size={18} />
          </div>
        </div>
        
        {/* Subtle Node ID */}
        <div style={{ fontSize: '10px', fontWeight: 800, color: '#CBD5E1', letterSpacing: '0.05em' }}>
          NODE ID: {store.id.toUpperCase()}
        </div>
      </div>

      {/* Footer secondary actions */}
      <div style={{ padding: '1.25rem', background: 'white', borderTop: '1px solid #F1F5F9' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <button 
            style={secondaryBtnStyle} 
            onClick={(e) => { e.stopPropagation(); navigate(`/stores/${store.id}/products`); }}
            onMouseOver={e => e.currentTarget.style.background = '#F1F5F9'} 
            onMouseOut={e => e.currentTarget.style.background = '#F8FAFC'}
          >
            <Package size={14} />
            Manage Catalog
          </button>
          <button 
            style={secondaryBtnStyle} 
            onClick={(e) => { e.stopPropagation(); navigate(`/stores/${store.id}/inventory`); }}
            onMouseOver={e => e.currentTarget.style.background = '#F1F5F9'} 
            onMouseOut={e => e.currentTarget.style.background = '#F8FAFC'}
          >
            <Database size={14} />
            Inventory
          </button>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <button style={secondaryBtnStyle} onClick={(e) => { e.stopPropagation(); window.print(); }} onMouseOver={e => e.currentTarget.style.background = '#F1F5F9'} onMouseOut={e => e.currentTarget.style.background = '#F8FAFC'}>
            <Download size={14} />
            Print Kit
          </button>
          <button style={secondaryBtnStyle} onClick={(e) => { e.stopPropagation(); window.open(`http://localhost:5173/?store_id=${store.id}`, '_blank'); }} onMouseOver={e => e.currentTarget.style.background = '#F1F5F9'} onMouseOut={e => e.currentTarget.style.background = '#F8FAFC'}>
            <ExternalLink size={14} />
            Kiosk preview
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isActive ? '#10B981' : '#CBD5E1' }}></span>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{store.status}</span>
          </div>
          <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', opacity: 0.6, letterSpacing: '0.02em' }}>
            IDENTIFIER: {store.qrCode.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

const StoreManagement = () => {
  const { stores, addStore, updateStore, removeStore } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', address: '', qrCode: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addStore(formData);
    setFormData({ name: '', address: '', qrCode: '' });
    setIsModalOpen(false);
  };

  const handleToggle = (id, newStatus) => {
    updateStore(id, { status: newStatus });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this node? This action cannot be undone.')) {
      removeStore(id);
    }
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[10px] font-black text-muted uppercase tracking-widest">Fleet Monitoring Active</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em' }}>Store Fleet</h1>
          <p className="text-muted" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Monitor and manage physical checkout nodes across your global retail network.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Deploy New Node
        </button>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {(stores || []).map(store => (
          <StoreCard 
            key={store.id} 
            store={store} 
            onToggle={handleToggle}
            onEdit={(s) => console.log('Edit', s)}
            onDelete={handleDelete}
          />
        ))}

        <div 
          onClick={() => setIsModalOpen(true)}
          className="stat-card flex flex-col items-center justify-center border-dashed border-2 bg-slate-50 hover:bg-white hover:border-solid hover:border-primary cursor-pointer text-muted min-h-[440px] transition-all duration-300 group rounded-[2rem]"
        >
          <div className="w-16 h-16 rounded-full bg-white border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <Plus size={32} />
          </div>
          <span className="font-extrabold text-sm uppercase tracking-widest">Expand Fleet</span>
          <p className="text-[10px] font-bold mt-2 opacity-60 uppercase tracking-tight">Add New Physical Endpoint</p>
        </div>
      </div>

      {/* Deploy Node Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="animate-fade-in" style={{
            background: 'white',
            width: '100%',
            maxWidth: '480px',
            borderRadius: '32px',
            padding: '2.5rem',
            boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.3)'
          }}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Deploy Node</h2>
                <p className="text-xs font-bold text-muted uppercase tracking-widest mt-1">Network Expansion</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                style={{ position: 'relative', top: '-1rem', right: '-0.5rem' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Downtown Express"
                  style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid var(--border)', fontSize: '0.875rem', fontWeight: 600 }}
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Physical Address</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. 123 Main St, NY"
                  style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid var(--border)', fontSize: '0.875rem', fontWeight: 600 }}
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Node Protocol ID</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. node-001"
                  style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid var(--border)', fontSize: '0.875rem', fontWeight: 600 }}
                  value={formData.qrCode}
                  onChange={e => setFormData({...formData, qrCode: e.target.value})}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  style={{ flex: 1, padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-muted)' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1.5, justifyContent: 'center', padding: '1rem', borderRadius: '16px', fontSize: '0.875rem', fontWeight: 800 }}
                >
                  Confirm Deployment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreManagement;
