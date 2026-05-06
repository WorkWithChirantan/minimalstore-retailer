import { createElement, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import {
  TrendingUp, Users, ShoppingBag, DollarSign,
  Map, MousePointer2, UserCheck, Clock,
  ArrowUpRight, ArrowDownRight, Download, Calendar,
  BarChart3, PieChartIcon, Activity, Zap, RefreshCw, AlertTriangle
} from 'lucide-react';

const COLORS = ['#111111', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const IntelligenceCard = ({ title, value, change, up, icon }) => (
  <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
      <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '14px', color: '#111111' }}>
        {createElement(icon, { size: 22 })}
      </div>
      {change && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.25rem', 
          fontSize: '0.75rem', 
          fontWeight: 900, 
          color: up ? '#10B981' : '#EF4444',
          background: up ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
          padding: '4px 10px',
          borderRadius: '100px'
        }}>
          {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </div>
      )}
    </div>
    <div style={{ fontSize: '0.65rem', fontWeight: 950, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{title}</div>
    <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111111', marginTop: '0.5rem', letterSpacing: '-0.03em' }}>{value}</div>
  </div>
);

const Analytics = () => {
  const [activePillar, setActivePillar] = useState('financials');

  const FINANCIAL_DATA = [];
  const CUSTOMER_DATA = [];
  const INVENTORY_PIE = [];

  const actionBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
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

  return (
    <div className="page-container">
      {/* Premium Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ background: '#F1F5F9', color: '#111111', padding: '4px 10px', borderRadius: '100px', fontSize: '9px', fontWeight: 950, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Intelligence V2.0</span>
            <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '9px', fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <div style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }}></div>
              Global Scan Active
            </span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#111111' }}>Business Intelligence</h1>
          <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem', fontWeight: 500 }}>Unified data stack providing a single source of truth for operations.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={actionBtnStyle} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
            <Calendar size={18} />
            April 2024
          </button>
          <button style={primaryBtnStyle} onMouseOver={e => e.currentTarget.style.background = '#000000'} onMouseOut={e => e.currentTarget.style.background = '#111111'}>
            <Download size={18} />
            Generate PDF
          </button>
        </div>
      </div>

      {/* Modern Pillar Navigation (Category Tabs) */}
      <div style={{ display: 'flex', gap: '0.375rem', padding: '0.375rem', background: '#F1F5F9', borderRadius: '18px', marginBottom: '2rem', width: 'fit-content', border: '1px solid #E2E8F0' }}>
        {[
          { id: 'financials', label: 'Sales & Financials', icon: DollarSign },
          { id: 'inventory', label: 'Supply Chain', icon: BarChart3 },
          { id: 'customers', label: 'Customer Behavior', icon: UserCheck },
          { id: 'operations', label: 'Store Operations', icon: Activity },
        ].map((pillar) => (
          <button
            key={pillar.id}
            onClick={() => setActivePillar(pillar.id)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.625rem', 
              padding: '0.625rem 1.25rem', 
              borderRadius: '14px', 
              fontSize: '0.75rem', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              border: 'none', 
              cursor: 'pointer', 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: activePillar === pillar.id ? 'white' : 'transparent',
              color: activePillar === pillar.id ? '#111111' : '#64748B',
              boxShadow: activePillar === pillar.id ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            <pillar.icon size={16} />
            {pillar.label}
          </button>
        ))}
      </div>

      <div className="stats-grid">
        {activePillar === 'financials' && (
          <>
            <IntelligenceCard title="Gross Margin" value="0%" change="0%" icon={TrendingUp} />
            <IntelligenceCard title="Avg. Basket Value" value="₹0" change="0" icon={ShoppingBag} />
            <IntelligenceCard title="Net Profit" value="₹0" change="0%" icon={DollarSign} />
            <IntelligenceCard title="Tax Liability" value="₹0" change="0%" icon={Zap} />
          </>
        )}
        {activePillar === 'inventory' && (
          <>
            <IntelligenceCard title="Turnover Rate" value="0x" change="0" icon={RefreshCw} />
            <IntelligenceCard title="Sell-Through" value="0%" change="0%" icon={Activity} />
            <IntelligenceCard title="Shrinkage" value="0%" change="0%" icon={AlertTriangle} />
            <IntelligenceCard title="Stock Duration" value="0 days" change="0" icon={Clock} />
          </>
        )}
        {activePillar === 'customers' && (
          <>
            <IntelligenceCard title="Conversion Rate" value="0%" change="0%" icon={MousePointer2} />
            <IntelligenceCard title="Retention Rate" value="0%" change="0%" icon={Users} />
            <IntelligenceCard title="Avg. Store Time" value="0s" change="0" icon={Clock} />
            <IntelligenceCard title="Loyalty Ratio" value="0%" change="0%" icon={UserCheck} />
          </>
        )}
        {activePillar === 'operations' && (
          <>
            <IntelligenceCard title="Sales/Employee" value="₹0/h" change="0%" icon={TrendingUp} />
            <IntelligenceCard title="Peak Traffic" value="-" change="0" icon={Users} />
            <IntelligenceCard title="Checkout Speed" value="0s/cust" change="0" icon={Clock} />
            <IntelligenceCard title="OpEx Ratio" value="0%" change="0%" icon={Zap} />
          </>
        )}
      </div>

      <div className="charts-grid mt-8">
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#111111', letterSpacing: '-0.02em' }}>Trend Visualization</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#F8FAFC', padding: '6px 12px', borderRadius: '100px', border: '1px solid #F1F5F9' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#111111' }}></span>
                <span style={{ fontSize: '9px', fontWeight: 950, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Real-time Trace</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            {activePillar === 'financials' ? (
              <AreaChart data={FINANCIAL_DATA}>
                <defs>
                  <linearGradient id="colorRevue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#111111" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#111111" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} fontWeight={700} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94A3B8" fontSize={11} fontWeight={700} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' }} />
                <Area type="monotone" dataKey="revenue" stroke="#111111" strokeWidth={4} fillOpacity={1} fill="url(#colorRevue)" />
              </AreaChart>
            ) : activePillar === 'customers' ? (
              <BarChart data={CUSTOMER_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} fontWeight={700} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94A3B8" fontSize={11} fontWeight={700} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' }} />
                <Bar dataKey="conversion" fill="#111111" radius={[8, 8, 0, 0]} barSize={26} />
              </BarChart>
            ) : (
              <LineChart data={FINANCIAL_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                <Line type="monotone" dataKey="profit" stroke="#111111" strokeWidth={4} dot={{ r: 5, fill: '#fff', stroke: '#111111', strokeWidth: 3 }} activeDot={{ r: 7 }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#111111', letterSpacing: '-0.02em' }}>Composition Analysis</h3>
            <PieChartIcon size={20} color="#111111" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={INVENTORY_PIE}
                innerRadius={65}
                outerRadius={95}
                paddingAngle={10}
                dataKey="value"
                stroke="none"
              >
                {INVENTORY_PIE.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {INVENTORY_PIE.map((item, i) => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS[i] }}></div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#111111' }}>{item.name}</span>
                </div>
                <span style={{ fontSize: '0.8125rem', fontWeight: 900, color: '#64748B' }}>{item.value} units</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '2rem', marginTop: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '2.5rem', border: '2px dashed #F1F5F9', borderRadius: '20px', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', background: '#FDFDFD' }}>
          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '50%', color: '#94A3B8' }}>
            <Map size={32} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 950, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Store Heatmap Visualization</h4>
            <p style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 800, marginTop: '0.5rem', opacity: 0.8 }}>Geographic customer density plotting enabled for premium nodes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
