import { useDashboard } from '../context/DashboardContext';
import { 
  Search, Filter, Download, Receipt, 
  ExternalLink, CreditCard, Smartphone, 
  CheckCircle2, Clock, AlertCircle, ShoppingBag
} from 'lucide-react';

const Transactions = () => {
  const { transactions } = useDashboard();

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
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#111111' }}>Transaction Audit</h1>
          <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem', fontWeight: 500 }}>Detailed ledger of all customer checkouts and payment settlements.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={actionBtnStyle} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
            <Download size={18} />
            Export Ledger
          </button>
          <button style={primaryBtnStyle} onMouseOver={e => e.currentTarget.style.background = '#000000'} onMouseOut={e => e.currentTarget.style.background = '#111111'}>
            <Receipt size={18} />
            Daily Reconcile
          </button>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }} className="animate-fade-in">
        {/* Modern Control Bar */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'white' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '480px' }}>
            <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={18} />
            <input
              type="text"
              placeholder="Search by ID, store or customer..."
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
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button style={filterBtnStyle} onMouseOver={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#111111'; }} onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B'; }}>
              <Filter size={16} />
              Type
            </button>
            <button style={filterBtnStyle} onMouseOver={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#111111'; }} onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B'; }}>
              <Clock size={16} />
              Status
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1.25rem 1.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Audit ID</th>
                <th style={{ textAlign: 'left', padding: '1.25rem 1.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Retail Node</th>
                <th style={{ textAlign: 'left', padding: '1.25rem 1.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Basket Details</th>
                <th style={{ textAlign: 'left', padding: '1.25rem 1.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Settlement</th>
                <th style={{ textAlign: 'left', padding: '1.25rem 1.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Timestamp</th>
                <th style={{ textAlign: 'left', padding: '1.25rem 1.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '1.25rem 1.5rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid #F1F5F9' }} onMouseOver={e => e.currentTarget.style.background = '#FDFDFD'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8' }}>{tx.id}</span>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.50rem' }}>
                       <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#111111' }}></div>
                       <span style={{ fontWeight: 800, color: '#111111', fontSize: '0.875rem' }}>{tx.store}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#111111', fontSize: '0.875rem' }}>
                      <ShoppingBag size={14} style={{ color: '#64748B' }} />
                      {tx.items} items
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 900, color: '#111111', fontSize: '0.9375rem' }}>₹{tx.total.toLocaleString()}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '9px', fontWeight: 950, color: '#94A3B8', textTransform: 'uppercase', marginTop: '2px', letterSpacing: '0.02em' }}>
                        {tx.method === 'UPI' ? <Smartphone size={10} /> : <CreditCard size={10} />}
                        {tx.method} SETTLED
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', color: '#64748B', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    {new Date(tx.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      padding: '4px 12px', 
                      background: '#F0FDF4', 
                      color: '#10B981', 
                      fontWeight: 950, 
                      fontSize: '10px', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.08em', 
                      borderRadius: '100px'
                    }}>
                      <CheckCircle2 size={12} strokeWidth={3} />
                      Verified
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                    <button style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      padding: '8px 12px', 
                      background: 'transparent', 
                      color: '#111111', 
                      border: 'none', 
                      cursor: 'pointer', 
                      fontSize: '10px', 
                      fontWeight: 900, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.08em', 
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                      <ExternalLink size={14} />
                      View Node Trace
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
