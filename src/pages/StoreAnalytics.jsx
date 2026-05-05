import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import {
  TrendingUp, Users, ShoppingBag, DollarSign,
  ArrowUpRight, ArrowDownRight, ArrowLeft,
  Calendar, Download, Activity, Smartphone, CreditCard, Clock
} from 'lucide-react';

const IntelligenceCard = ({ title, value, change, up, icon: Icon }) => (
  <div className="stat-card dashboard-card">
    <div className="flex justify-between items-start mb-4">
      <div style={{ background: 'rgba(15, 23, 42, 0.05)', padding: '10px', borderRadius: '12px', color: 'var(--primary)' }}>
        <Icon size={22} />
      </div>
      {change && (
        <div className={`flex items-center gap-1 text-xs font-bold ${up ? 'text-success' : 'text-error'}`}>
          {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </div>
      )}
    </div>
    <div className="stat-label uppercase tracking-widest text-[10px] font-black">{title}</div>
    <div className="stat-value" style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{value}</div>
  </div>
);

const StoreAnalytics = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { stores, transactions } = useDashboard();
  
  const store = useMemo(() => stores.find(s => s.id === storeId), [stores, storeId]);
  
  const storeTransactions = useMemo(() => 
    transactions.filter(tx => tx.store === store?.name),
    [transactions, store]
  );

  const stats = useMemo(() => {
    const totalSales = storeTransactions.reduce((acc, tx) => acc + tx.total, 0);
    const avgBasket = storeTransactions.length > 0 ? Math.round(totalSales / storeTransactions.length) : 0;
    
    return {
      totalSales,
      avgBasket,
      totalOrders: storeTransactions.length,
      activeSessions: Math.floor(Math.random() * 5) + 1 // Mock session data for the node
    };
  }, [storeTransactions]);

  const chartData = [
    { name: '08:00', total: 400 },
    { name: '10:00', total: 750 },
    { name: '12:00', total: 1200 },
    { name: '14:00', total: 900 },
    { name: '16:00', total: 1100 },
    { name: '18:00', total: 1500 },
    { name: '20:00', total: 1300 },
  ];

  if (!store) {
    return (
      <div className="page-container flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Node Not Found</h2>
        <button className="btn-primary" onClick={() => navigate('/stores')}>
          <ArrowLeft size={18} />
          Back to Fleet
        </button>
      </div>
    );
  }

  const isActive = store.status === 'Active';

  return (
    <div className="page-container">
      {/* Premium Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <button 
            onClick={() => navigate('/stores')}
            style={{ 
              marginTop: '0.5rem', 
              padding: '0.75rem', 
              background: 'white', 
              border: '1px solid #E2E8F0', 
              borderRadius: '16px', 
              cursor: 'pointer',
              color: '#111111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
            onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'}
            onMouseOut={e => e.currentTarget.style.background = 'white'}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.375rem', 
                padding: '0.25rem 0.75rem', 
                background: isActive ? 'rgba(5, 150, 105, 0.1)' : '#F1F5F9', 
                borderRadius: '100px',
                border: isActive ? '1px solid rgba(5, 150, 105, 0.2)' : '1px solid #E2E8F0'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isActive ? '#10B981' : '#94A3B8' }}></span>
                <span style={{ fontSize: '10px', fontWeight: 900, color: isActive ? '#059669' : '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {store.status} NODE
                </span>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                PROTOCOL ID: <span style={{ color: '#111111' }}>{store.id.toUpperCase()}</span>
              </span>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#111111', lineHeight: 1.1 }}>
              {store.name} <span style={{ fontWeight: 400, color: '#94A3B8' }}>Intelligence</span>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', color: '#64748B', fontSize: '0.925rem', fontWeight: 500 }}>
              <MapPin size={16} />
              {store.address}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.75rem 1.25rem', 
            background: 'white', 
            border: '1px solid #E2E8F0', 
            borderRadius: '14px', 
            fontSize: '0.8125rem', 
            fontWeight: 800, 
            color: '#111111',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <Calendar size={18} />
            Real-time Feed
          </button>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.75rem 1.25rem', 
            background: '#111111', 
            border: 'none', 
            borderRadius: '14px', 
            fontSize: '0.8125rem', 
            fontWeight: 800, 
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <Download size={18} />
            Export Node Logs
          </button>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <IntelligenceCard title="Node Revenue" value={`₹${stats.totalSales.toLocaleString()}`} change="8.4%" up icon={DollarSign} />
        <IntelligenceCard title="Active Sessions" value={stats.activeSessions} change="2" up icon={Users} />
        <IntelligenceCard title="Throughput" value={stats.totalOrders} change="1.5%" down icon={ShoppingBag} />
        <IntelligenceCard title="Ticket Size" value={`₹${stats.avgBasket}`} change="5.2%" up icon={TrendingUp} />
      </div>

      <div className="charts-grid mt-8">
        <div className="chart-container col-span-2">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Sales Momentum</h3>
              <p className="text-xs text-muted font-bold mt-1">Transaction velocity for this specific node.</p>
            </div>
            <select className="bg-white border-border rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-none">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="nodeSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
              <Area type="monotone" dataKey="total" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#nodeSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <div className="flex items-center gap-2">
              <Activity size={20} color="var(--primary)" />
              <h3 className="chart-title">Live Trace</h3>
            </div>
            <span className="badge badge-success">SYNCED</span>
          </div>
          <div className="activity-feed" style={{ maxHeight: '350px' }}>
            {storeTransactions.length > 0 ? (
              storeTransactions.map((tx) => (
                <div key={tx.id} className="activity-item" style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid var(--bg)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {tx.method === 'UPI' ? <Smartphone size={18} color="var(--primary)" /> : <CreditCard size={18} color="var(--primary)" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="flex justify-between items-start">
                      <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>₹{tx.total.toLocaleString()} Settlement</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{tx.method}</div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.items} items • <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Just now</span></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted py-12">
                <Clock size={32} className="mb-2 opacity-20" />
                <p className="text-xs font-bold uppercase tracking-widest">Waiting for Activity</p>
              </div>
            )}
          </div>
          <button className="w-full mt-6 py-3 border border-slate-100 rounded-xl text-xs font-black uppercase tracking-widest text-primary hover:bg-slate-50 transition-all">
            Full Audit Trail
          </button>
        </div>
      </div>
    </div>
  );
};

// Add missing MapPin import
const MapPin = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export default StoreAnalytics;
