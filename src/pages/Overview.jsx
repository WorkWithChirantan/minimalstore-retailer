import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { useDashboard } from '../context/DashboardContext';
import { TrendingUp, Users, ShoppingBag, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Download, Zap } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const StatCard = ({ label, value, icon: Icon, change, up }) => (
  <div style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
      <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '14px', color: '#111111' }}>
        <Icon size={22} />
      </div>
      {change && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.25rem', 
          fontSize: '0.75rem', 
          fontWeight: 950, 
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
    <div style={{ fontSize: '0.65rem', fontWeight: 950, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
    <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111111', marginTop: '0.5rem', letterSpacing: '-0.03em' }}>{value}</div>
    <div style={{ fontSize: '9px', color: '#94A3B8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.75rem' }}>vs. last 24h</div>
  </div>
);

const SALES_DATA = [];

const Overview = () => {
  const { stats, liveFeed, products, stores, inventory, transactions } = useDashboard();

  const handleExport = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Business Analytics Report', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    
    // Summary Stats
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Summary Statistics', 14, 45);
    
    autoTable(doc, {
      startY: 50,
      head: [['Metric', 'Value']],
      body: [
        ['Net Revenue', `INR ${stats.totalSales.toLocaleString()}`],
        ['Transactions', stats.completedToday],
        ['Total Products Sold', stats.totalProductsSold || 0],
        ['Basket Efficiency', `INR ${stats.avgCart}`],
        ['Active Store Nodes', stats.activeSessions]
      ],
      theme: 'grid',
      headStyles: { fillColor: [17, 17, 17] }
    });
    
    // Transactions
    let currentY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text('Recent Transactions', 14, currentY);
    
    const txBody = transactions.slice(0, 50).map(tx => [
      tx.id,
      tx.store,
      tx.items,
      `INR ${tx.total}`,
      new Date(tx.timestamp).toLocaleString()
    ]);
    
    autoTable(doc, {
      startY: currentY + 5,
      head: [['Tx ID', 'Store', 'Items', 'Total', 'Time']],
      body: txBody,
      theme: 'grid',
      headStyles: { fillColor: [17, 17, 17] }
    });
    
    // Inventory
    currentY = doc.lastAutoTable.finalY + 15;
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }
    
    doc.setFontSize(14);
    doc.text('Current Inventory Levels', 14, currentY);
    
    const invBody = products.map(p => [
      p.barcode,
      p.name,
      p.category,
      inventory[p.id] || 0
    ]);
    
    autoTable(doc, {
      startY: currentY + 5,
      head: [['Barcode', 'Product', 'Category', 'Stock Level']],
      body: invBody,
      theme: 'grid',
      headStyles: { fillColor: [17, 17, 17] }
    });

    doc.save(`business-analytics-export-${new Date().toISOString().split('T')[0]}.pdf`);
  };

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

  const chartHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  };

  return (
    <div className="page-container">
      {/* Premium Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
        <div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '9px', fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <span style={{ position: 'relative', display: 'flex', height: '6px', width: '6px' }}>
                  <span style={{ position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', background: '#10B981', opacity: 0.75 }} className="animate-ping"></span>
                  <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: '6px', width: '6px', background: '#10B981' }}></span>
                </span>
                LIVE AUDIT ACTIVE
              </span>
           </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#111111' }}>Operations Hub</h1>
          <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem', fontWeight: 500 }}>Real-time performance metrics across all active nodes.</p>
        </div>
        <button onClick={handleExport} style={primaryBtnStyle} onMouseOver={e => e.currentTarget.style.background = '#000000'} onMouseOut={e => e.currentTarget.style.background = '#111111'}>
          <Download size={18} />
          Export Analytics
        </button>
      </div>

      <div className="stats-grid">
        <StatCard label="Net Revenue" value={`₹${stats.totalSales.toLocaleString()}`} icon={DollarSign} change="12.5%" up />
        <StatCard label="Transactions" value={stats.completedToday} icon={Users} change="+4" up />
        <StatCard label="Total Products Sold" value={stats.totalProductsSold} icon={ShoppingBag} change="12" up />
        <StatCard label="Basket Efficiency" value={`₹${stats.avgCart}`} icon={TrendingUp} change="5.2%" up />
      </div>

      <div className="charts-grid mt-8">
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '1.5rem' }}>
          <div style={chartHeaderStyle}>
            <div>
               <h3 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#111111', letterSpacing: '-0.02em' }}>Revenue Velocity</h3>
               <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#64748B', marginTop: '0.25rem' }}>Transaction volume synchronized across minutes</p>
            </div>
            <select style={{ ...actionBtnStyle, padding: '0.5rem 0.75rem', fontSize: '0.75rem' }}>
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={SALES_DATA}>
              <defs>
                <linearGradient id="colorRevue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#111111" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#111111" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis 
                dataKey="name" 
                stroke="#94A3B8" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                dy={10} 
                fontWeight={700}
              />
              <YAxis 
                stroke="#94A3B8" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => `₹${val / 1000}k`} 
                fontWeight={700}
              />
              <Tooltip
                contentStyle={{ borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)', background: '#fff' }}
                cursor={{ stroke: '#111111', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#111111" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorRevue)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '1.5rem' }}>
          <div style={chartHeaderStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ padding: '8px', background: '#F8FAFC', borderRadius: '12px', color: '#111111' }}>
                 <Activity size={20} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#111111', letterSpacing: '-0.02em' }}>Live Node Stream</h3>
            </div>
            <span style={{ fontSize: '8px', fontWeight: 950, color: '#10B981', background: '#F0FDF4', padding: '4px 8px', borderRadius: '100px', letterSpacing: '0.1em' }}>STABLE</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {liveFeed.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', borderRadius: '16px', borderBottom: '1px solid #F8FAFC', transition: 'background 0.2s ease' }} onMouseOver={e => e.currentTarget.style.background = '#FDFDFD'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111' }}>
                  <ShoppingBag size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 900, color: '#111111' }}>{item.text}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, marginTop: '0.25rem' }}>
                    {item.units} unit{item.units > 1 ? 's' : ''} • <span style={{ color: '#111111', fontWeight: 900 }}>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => alert('Initiating full system audit... This may take a few minutes.')} style={{ 
             width: '100%', 
             marginTop: '1.5rem', 
             padding: '1rem',
             color: '#111111', 
             fontSize: '0.75rem', 
             fontWeight: 950, 
             textTransform: 'uppercase', 
             letterSpacing: '0.15em',
             background: 'transparent',
             border: '1px solid #E2E8F0',
             borderRadius: '16px',
             cursor: 'pointer',
             transition: 'all 0.2s ease'
          }} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
            Full System Audit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
