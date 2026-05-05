import { CreditCard, Download, ExternalLink, Calendar, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

const Billing = () => {
   const history = [
      { id: 'INV-1029', date: 'Apr 01, 2026', amount: '₹9,999.00', status: 'Paid' },
      { id: 'INV-0982', date: 'Mar 01, 2026', amount: '₹9,999.00', status: 'Paid' },
      { id: 'INV-0841', date: 'Feb 01, 2026', amount: '₹9,999.00', status: 'Paid' },
   ];

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

   const tableHeaderStyle = {
      padding: '1.25rem 1.5rem',
      fontSize: '0.625rem',
      fontWeight: 950,
      color: '#64748B',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      borderBottom: '1px solid #F1F5F9',
      textAlign: 'left'
   };

   return (
      <div className="page-container">
         {/* Premium Header */}
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <div>
               <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#111111' }}>Billing & Subscription</h1>
               <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem', fontWeight: 500 }}>Manage your SaaS plan and view payment history.</p>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
               {/* Enterprise Plan Card */}
               <div style={{ background: 'white', padding: '2.5rem', borderRadius: '24px', border: '1px solid #111111', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)' }}>
                  <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                     <span style={{ px: '3', py: '1', background: '#F0FDF4', color: '#10B981', fontSize: '9px', fontWeight: 950, borderRadius: '100px', padding: '4px 10px', letterSpacing: '0.1em' }}>ACTIVE</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                     <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                           <div style={{ padding: '8px', background: '#111111', borderRadius: '10px', color: 'white' }}>
                              <ShieldCheck size={20} />
                           </div>
                           <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#111111', letterSpacing: '-0.02em' }}>Enterprise Plan</h3>
                        </div>
                        <p style={{ fontSize: '0.9375rem', color: '#64748B', fontWeight: 500 }}>Up to 10 store locations with priority support.</p>
                     </div>
                     <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 950, color: '#111111', letterSpacing: '-0.04em' }}>₹9,999<span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 700 }}>/mo</span></div>
                        <p style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700, marginTop: '0.25rem' }}>Next billing: May 01, 2026</p>
                     </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2.5rem' }}>
                     {[
                        'Unlimited Transactions',
                        'Advanced Analytics',
                        'White-label Branding',
                        'REST API Access'
                     ].map((feature, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', fontWeight: 700, color: '#111111' }}>
                           <div style={{ color: '#10B981' }}>
                              <CheckCircle2 size={18} />
                           </div>
                           {feature}
                        </div>
                     ))}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                     <button style={primaryBtnStyle} onMouseOver={e => e.currentTarget.style.background = '#000000'} onMouseOut={e => e.currentTarget.style.background = '#111111'}>
                        Manage Subscription
                     </button>
                     <button style={actionBtnStyle} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                        <AlertCircle size={18} />
                        View Plan Features
                     </button>
                  </div>
               </div>

               {/* Billing History Table */}
               <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                  <div style={{ padding: '1.5rem', borderBottom: '1px solid #F1F5F9', background: '#FDFDFD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div>
                        <div style={{ fontSize: '0.625rem', fontWeight: 950, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Billing History</div>
                        <p style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, marginTop: '0.25rem' }}>Secure node payments and receipt audits.</p>
                     </div>
                     <button style={{ fontSize: '0.75rem', fontWeight: 950, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                        Download All (CSV)
                     </button>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                           <tr>
                              <th style={tableHeaderStyle}>Invoice ID</th>
                              <th style={tableHeaderStyle}>Date</th>
                              <th style={tableHeaderStyle}>Amount</th>
                              <th style={tableHeaderStyle}>Status</th>
                              <th style={{ ...tableHeaderStyle, textAlign: 'right' }}>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {history.map(inv => (
                              <tr key={inv.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.2s ease' }} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                                 <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 900, color: '#111111', fontFamily: 'monospace' }}>{inv.id}</td>
                                 <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.875rem', fontWeight: 700, color: '#64748B' }}>{inv.date}</td>
                                 <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.875rem', fontWeight: 900, color: '#111111' }}>{inv.amount}</td>
                                 <td style={{ padding: '1.25rem 1.5rem' }}>
                                    <span style={{ fontSize: '9px', fontWeight: 950, color: '#10B981', background: '#F0FDF4', padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.1em' }}>PAID</span>
                                 </td>
                                 <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                    <button style={{ ...actionBtnStyle, padding: '0.5rem', borderRadius: '10px' }} onMouseOver={e => e.currentTarget.style.background = '#F1F5F9'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                                       <Download size={16} />
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
               {/* Payment Method Card */}
               <div style={{ background: 'white', padding: '1.75rem', borderRadius: '24px', border: '1px solid #E2E8F0' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 950, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                     <CreditCard size={18} />
                     Payment Method
                  </h3>
                  <div style={{ padding: '1.25rem', background: '#F8FAFC', borderRadius: '18px', border: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '42px', height: '28px', background: '#111111', borderRadius: '6px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 950, letterSpacing: '0.1em' }}>VISA</div>
                        <div>
                           <div style={{ fontSize: '0.8125rem', fontWeight: 900, color: '#111111' }}>VISA •••• 4242</div>
                           <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>Expires 12/28</div>
                        </div>
                     </div>
                     <button style={{ fontSize: '0.75rem', fontWeight: 950, color: '#111111', textTransform: 'uppercase', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                        Edit
                     </button>
                  </div>
                  <button style={{ width: '100%', padding: '1rem', border: '1px dashed #CBD5E1', borderRadius: '16px', color: '#64748B', fontSize: '0.8125rem', fontWeight: 800, background: 'transparent', cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseOver={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#94A3B8'; }} onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#CBD5E1'; }}>
                     Add Backup Method
                  </button>
               </div>

               {/* Elite Upgrade Card */}
               <div style={{ background: '#064E3B', padding: '2rem', borderRadius: '24px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                  <div style={{ position: 'relative', zIndex: 10 }}>
                     <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Need more store slots?</h3>
                     <p style={{ fontSize: '0.8125rem', color: '#D1FAE5', marginBottom: '1.5rem', lineHeight: 1.5, fontWeight: 500 }}>Upgrade to <strong style={{ color: 'white' }}>ELITE</strong> for unlimited store nodes and professional white-label custom domains.</p>
                     <button style={{ width: '100%', padding: '1rem', background: '#34D399', color: '#064E3B', border: 'none', borderRadius: '14px', fontSize: '0.875rem', fontWeight: 900, cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} onMouseOver={e => e.currentTarget.style.background = '#6EE7B7'} onMouseOut={e => e.currentTarget.style.background = '#34D399'}>
                        Upgrade to Elite
                     </button>
                  </div>
                  <ExternalLink style={{ position: 'absolute', top: '-1rem', right: '-1rem', opacity: 0.1, transform: 'rotate(-10deg)' }} size={120} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Billing;
