import { useCallback, useEffect, useRef, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { 
  Package, AlertTriangle, CheckCircle2, Truck, 
  ArrowRight, Phone, Mail, Settings2, Bell, 
  RefreshCw, History, ChevronRight
} from 'lucide-react';

const InventoryManagement = () => {
  const { products, inventory, setInventory } = useDashboard();
  const [restockThreshold, setRestockThreshold] = useState(15);
  const [autoRestockEnabled, setAutoRestockEnabled] = useState(false);
  const [restockHistory, setRestockHistory] = useState([
    { id: 'RS-101', product: 'Original Milk', units: 100, status: 'Delivered', date: '2 days ago' },
    { id: 'RS-102', product: 'Dark Chocolate', units: 50, status: 'In Transit', date: 'Expected today' },
  ]);
  const [activeOrders, setActiveOrders] = useState([]);
  const restockCounter = useRef(101);

  const updateOrderStatus = useCallback((orderId, status) => {
    setActiveOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (status === 'Delivered') {
      setTimeout(() => {
        setActiveOrders(prev => {
          const order = prev.find(o => o.id === orderId);
          if (order) {
            setRestockHistory(h => [{ 
              id: order.id, 
              product: order.productName, 
              units: order.units, 
              status: 'Delivered', 
              date: 'Just now' 
            }, ...h.slice(0, 9)]);
          }
          return prev.filter(o => o.id !== orderId);
        });
      }, 3000);
    }
  }, []);

  const triggerRestock = useCallback((product, isAuto = false) => {
    const newOrder = {
      id: `RS-${restockCounter.current++}`,
      productId: product.id,
      productName: product.name,
      units: 100,
      status: 'Ordered',
      timestamp: new Date().toISOString(),
      isAuto
    };

    setActiveOrders(prev => [...prev, newOrder]);

    // Simulate delivery lifecycle
    setTimeout(() => {
      updateOrderStatus(newOrder.id, 'In Transit');
    }, 5000);

    setTimeout(() => {
      updateOrderStatus(newOrder.id, 'Delivered');
      // Add stock back to inventory
      setInventory(prev => ({
        ...prev,
        [product.id]: (prev[product.id] || 0) + 100
      }));
    }, 15000);
  }, [setInventory, updateOrderStatus]);

  // Simulate auto-restock check
  useEffect(() => {
    if (autoRestockEnabled) {
      const needsRestock = products.filter(p => inventory[p.id] < restockThreshold);
      needsRestock.forEach(p => {
        if (!activeOrders.find(o => o.productId === p.id)) {
          triggerRestock(p, true);
        }
      });
    }
  }, [activeOrders, inventory, autoRestockEnabled, restockThreshold, products, triggerRestock]);

  const secondaryBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1rem',
    background: 'white',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 800,
    color: '#111111',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  };

  return (
    <div className="page-container">
      {/* Premium Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#111111' }}>Supply Intelligence</h1>
          <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem', fontWeight: 500 }}>Real-time inventory optimization and automated vendor fulfillment.</p>
        </div>
        
        {/* Unified Control Bar */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 1rem' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Auto-Restock</span>
            <button 
              onClick={() => setAutoRestockEnabled(!autoRestockEnabled)}
              style={{ 
                width: '42px', 
                height: '22px', 
                background: autoRestockEnabled ? '#111111' : '#E2E8F0',
                borderRadius: '100px',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <div style={{ 
                width: '16px', 
                height: '16px', 
                background: 'white', 
                borderRadius: '50%',
                position: 'absolute',
                top: '3px',
                left: autoRestockEnabled ? '23px' : '3px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}></div>
            </button>
          </div>
          <div style={{ width: '1px', height: '24px', background: '#F1F5F9' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 1rem' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Threshold</span>
            <div style={{ position: 'relative' }}>
              <input 
                type="number" 
                value={restockThreshold}
                onChange={(e) => setRestockThreshold(parseInt(e.target.value))}
                style={{ 
                  width: '52px', 
                  padding: '6px 10px', 
                  background: '#F8FAFC', 
                  border: '1px solid #F1F5F9', 
                  borderRadius: '10px', 
                  fontSize: '0.8125rem', 
                  fontWeight: 800, 
                  textAlign: 'center', 
                  outline: 'none',
                  color: '#111111'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container" style={{ minHeight: 'auto', background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '1.5rem' }}>
          <div className="chart-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.05)', padding: '8px', borderRadius: '12px', color: '#111111' }}>
                <Package size={20} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#111111', letterSpacing: '-0.02em' }}>Stock Analysis</h3>
            </div>
            <button style={secondaryBtnStyle} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
              <RefreshCw size={14} />
              Re-Scan Inventory
            </button>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Product</th>
                  <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>On-Hand</th>
                  <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Health Status</th>
                  <th style={{ textAlign: 'right', padding: '1rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => {
                  const stock = inventory[p.id];
                  const isCritical = stock < restockThreshold;
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '1.25rem 1rem' }}>
                        <div style={{ fontWeight: 800, color: '#111111', fontSize: '0.875rem' }}>{p.name}</div>
                        <div style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 800, tracking: '0.05em', marginTop: '2px' }}>{p.category}</div>
                      </td>
                      <td style={{ padding: '1.25rem 1rem', fontWeight: 800, color: '#111111' }}>
                        {stock} units
                      </td>
                      <td style={{ padding: '1.25rem 1rem' }}>
                        <div style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '0.375rem', 
                          padding: '4px 10px', 
                          borderRadius: '100px', 
                          fontSize: '10px', 
                          fontWeight: 900, 
                          background: isCritical ? '#FEF2F2' : '#F0FDF4', 
                          color: isCritical ? '#EF4444' : '#10B981',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isCritical ? '#EF4444' : '#10B981' }}></span>
                          {isCritical ? 'CRITICAL' : 'HEALTHY'}
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                        <button 
                          onClick={() => triggerRestock(p)}
                          disabled={activeOrders.some(o => o.productId === p.id)}
                          style={{ 
                            padding: '0.625rem 1rem', 
                            background: activeOrders.some(o => o.productId === p.id) ? '#F1F5F9' : '#111111', 
                            color: activeOrders.some(o => o.productId === p.id) ? '#94A3B8' : 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            cursor: activeOrders.some(o => o.productId === p.id) ? 'default' : 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          Request Restock
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="chart-container" style={{ minHeight: 'auto', background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div style={{ width: '42px', height: '42px', background: 'rgba(15, 23, 42, 0.05)', borderRadius: '12px', color: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#111111', letterSpacing: '-0.03em', margin: 0 }}>Supply Chain Visualizer</h3>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ flex: 1, background: '#F8FAFC', padding: '0.875rem', borderRadius: '18px', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '8px', fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>In Transit</div>
                <div style={{ fontSize: '1.25rem', fontVariantNumeric: 'tabular-nums', fontWeight: 900, color: '#111111' }}>{activeOrders.filter(o => o.status === 'In Transit').length}</div>
              </div>
              <div style={{ flex: 1, background: '#F8FAFC', padding: '0.875rem', borderRadius: '18px', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '8px', fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Pending</div>
                <div style={{ fontSize: '1.25rem', fontVariantNumeric: 'tabular-nums', fontWeight: 900, color: '#111111' }}>{activeOrders.filter(o => o.status === 'Ordered').length}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activeOrders.length === 0 && (
              <div style={{ padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 0.5 }}>
                <div style={{ width: '48px', height: '48px', background: '#F8FAFC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                   <Package size={24} />
                </div>
                <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>No Active Fulfillments</p>
              </div>
            )}
            {activeOrders.map(order => (
              <div key={order.id} style={{ padding: '1.25rem', background: 'white', border: '1px solid #F1F5F9', borderRadius: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }} className="animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.875rem', color: '#111111' }}>{order.productName}</span>
                      {order.isAuto && <span style={{ background: '#F1F5F9', color: '#111111', padding: '2px 6px', borderRadius: '4px', fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>AUTO-FLOW</span>}
                    </div>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>ORDER REF: {order.id}</div>
                  </div>
                  <div style={{ 
                    padding: '4px 10px', 
                    borderRadius: '6px', 
                    fontSize: '9px', 
                    fontWeight: 900, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    background: order.status === 'Ordered' ? '#FFFBEB' : order.status === 'In Transit' ? '#F1F5F9' : '#F0FDF4',
                    color: order.status === 'Ordered' ? '#B45309' : order.status === 'In Transit' ? '#111111' : '#10B981'
                  }}>
                    {order.status}
                  </div>
                </div>
                
                <div style={{ height: '4px', background: '#F1F5F9', borderRadius: '100px', overflow: 'hidden', marginBottom: '1rem' }}>
                  <div 
                    style={{ 
                      height: '100%', 
                      transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)', 
                      width: order.status === 'Ordered' ? '33%' : order.status === 'In Transit' ? '66%' : '100%',
                      background: order.status === 'Ordered' ? '#F59E0B' : '#111111'
                    }}
                  ></div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '9px', fontWeight: 900, color: order.status === 'Ordered' ? '#111111' : '#CBD5E1', textTransform: 'uppercase' }}>
                    <CheckCircle2 size={12} />
                    ORDERED
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '9px', fontWeight: 900, color: order.status === 'In Transit' ? '#111111' : '#CBD5E1', textTransform: 'uppercase' }}>
                    <Truck size={12} />
                    SHIPPED
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '9px', fontWeight: 900, color: order.status === 'Delivered' ? '#111111' : '#CBD5E1', textTransform: 'uppercase' }}>
                    <Package size={12} />
                    STOCKED
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', background: 'white', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '1.5rem' }} className="chart-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.05)', padding: '8px', borderRadius: '12px', color: '#111111' }}>
              <History size={20} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#111111', letterSpacing: '-0.02em' }}>Intelligence Fulfillment Log</h3>
          </div>
          <button style={{ background: 'transparent', border: 'none', color: '#64748B', fontWeight: 800, fontSize: '0.8125rem', cursor: 'pointer' }}>Download Archives</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Ref. Identifier</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Product Information</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Batch Volume</th>
                <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Fulfillment Date</th>
                <th style={{ textAlign: 'right', padding: '1rem', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B', background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>Audit Status</th>
              </tr>
            </thead>
            <tbody>
              {restockHistory.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 800, color: '#94A3B8' }}>{log.id}</span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', fontWeight: 800, color: '#111111' }}>{log.product}</td>
                  <td style={{ padding: '1.25rem 1rem', fontWeight: 700, color: '#64748B' }}>100 units</td>
                  <td style={{ padding: '1.25rem 1rem', fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700 }}>{log.date}</td>
                  <td style={{ padding: '1.25rem 1rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#10B981', fontWeight: 950, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                       <CheckCircle2 size={14} />
                      REPLENISHED
                    </div>
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

export default InventoryManagement;
