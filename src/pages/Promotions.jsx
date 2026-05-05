import { useState } from 'react';
import { Tag, Plus, Trash2, Calendar, ShoppingBag, ArrowRight, Edit3 } from 'lucide-react';

const Promotions = () => {
   const [promos] = useState([
      { id: 1, title: 'Pasta Combo', description: '10% off pasta sauce when pasta is scanned', status: 'Active', trigger: 'Pasta', discount: '10%', end: '2026-05-30' },
      { id: 2, title: 'Milk Morning', description: '5% off dairy products before 10 AM', status: 'Active', trigger: 'Dairy', discount: '5%', end: '2026-04-15' },
      { id: 3, title: 'Summer Snack', description: 'Buy 2 chocolates, get 1 free', status: 'Draft', trigger: 'Chocolate', discount: 'B2G1', end: '2026-08-01' },
   ]);

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

   const inputStyle = {
      width: '100%',
      padding: '0.75rem 1rem',
      background: '#F8FAFC',
      border: '1px solid #F1F5F9',
      borderRadius: '12px',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#111111',
      outline: 'none',
      transition: 'all 0.2s ease'
   };

   const labelStyle = {
      display: 'block',
      fontSize: '0.625rem',
      fontWeight: 950,
      color: '#64748B',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '0.5rem'
   };

   return (
      <div className="page-container">
         {/* Premium Header */}
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <div>
               <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#111111' }}>Promotions & Offers</h1>
               <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem', fontWeight: 500 }}>Create automated triggers to boost sales and customer loyalty.</p>
            </div>
            <button style={primaryBtnStyle} onMouseOver={e => e.currentTarget.style.background = '#000000'} onMouseOut={e => e.currentTarget.style.background = '#111111'}>
               <Plus size={18} />
               Create Promotion
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Promotions List */}
            <div className="lg:col-span-2 space-y-4">
               {promos.map(promo => (
                  <div key={promo.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }} onMouseOver={e => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05)'} onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)'}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                           <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#F8FAFC', color: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Tag size={24} />
                           </div>
                           <div>
                              <h3 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#111111', letterSpacing: '-0.02em' }}>{promo.title}</h3>
                              <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#64748B', marginTop: '0.25rem' }}>{promo.description}</p>
                           </div>
                        </div>
                        <span style={{ 
                           padding: '4px 12px', 
                           borderRadius: '100px', 
                           fontSize: '10px', 
                           fontWeight: 950, 
                           letterSpacing: '0.08em',
                           textTransform: 'uppercase',
                           background: promo.status === 'Active' ? '#F0FDF4' : '#F1F5F9',
                           color: promo.status === 'Active' ? '#10B981' : '#64748B'
                        }}>
                           {promo.status}
                        </span>
                     </div>

                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', padding: '1.25rem 0', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9' }}>
                        <div>
                           <div style={labelStyle}>Trigger Bundle</div>
                           <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#111111' }}>{promo.trigger}</div>
                        </div>
                        <div>
                           <div style={labelStyle}>Applied Reward</div>
                           <div style={{ fontSize: '0.875rem', fontWeight: 900, color: '#10B981' }}>{promo.discount} OFF</div>
                        </div>
                        <div>
                           <div style={labelStyle}>End Date</div>
                           <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#111111' }}>{promo.end}</div>
                        </div>
                     </div>

                     <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', mt: '1.25rem', pt: '1.25rem' }}>
                        <button style={{ ...actionBtnStyle, padding: '0.5rem', borderRadius: '10px' }} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                           <Edit3 size={16} />
                        </button>
                        <button style={{ ...actionBtnStyle, padding: '0.5rem', borderRadius: '10px', color: '#EF4444' }} onMouseOver={e => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.borderColor = '#FEE2E2'; }} onMouseOut={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#E2E8F0'; }}>
                           <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
               ))}
            </div>

            {/* Quick Build Sidebar */}
            <div style={{ background: 'white', padding: '1.75rem', borderRadius: '24px', border: '1px solid #E2E8F0', height: 'fit-content' }}>
               <h3 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#111111', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>Quick Build</h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                     <label style={labelStyle}>Trigger Product</label>
                     <select style={inputStyle} className="focus:bg-white focus:border-slate-200">
                        <option>Select Product...</option>
                        <option>Original Milk</option>
                        <option>Dark Chocolate</option>
                        <option>Multi-grain Bread</option>
                     </select>
                  </div>
                  <div>
                     <label style={labelStyle}>Discount Value (%)</label>
                     <input type="number" placeholder="e.g. 10" style={inputStyle} className="focus:bg-white focus:border-slate-200" />
                  </div>
                  <div>
                     <label style={labelStyle}>Validity Period</label>
                     <div style={{ position: 'relative' }}>
                        <input type="date" style={{ ...inputStyle, paddingRight: '2.5rem' }} className="focus:bg-white focus:border-slate-200" />
                     </div>
                  </div>
                  <button style={{ ...primaryBtnStyle, width: '100%', justifyContent: 'center', marginTop: '0.75rem' }} onMouseOver={e => e.currentTarget.style.background = '#000000'} onMouseOut={e => e.currentTarget.style.background = '#111111'}>
                     Generate Promotion
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Promotions;
