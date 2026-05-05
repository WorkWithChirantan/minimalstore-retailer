import { useState } from 'react';
import {
   Upload, Palette, Smartphone,
   CheckCircle2, ShoppingCart, ArrowLeft, Search,
   Layout, Sparkles, Eye, Save
} from 'lucide-react';

const Branding = () => {
   const [brandColor, setBrandColor] = useState('#111111');
   const [accentColor, setAccentColor] = useState('#10B981');
   const [storeName, setStoreName] = useState('minimalStore Express');

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

   const cardStyle = {
      background: 'white',
      padding: '2rem',
      borderRadius: '24px',
      border: '1px solid #E2E8F0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
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
               <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#111111' }}>Experience Design</h1>
               <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem', fontWeight: 500 }}>Customize the digital interface and sensory identity of your shoppers.</p>
            </div>
            <button style={primaryBtnStyle} onMouseOver={e => e.currentTarget.style.background = '#000000'} onMouseOut={e => e.currentTarget.style.background = '#111111'}>
               <Save size={18} />
               Publish Changes
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
               <div style={cardStyle}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 950, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                     <Layout size={18} />
                     Core Identity
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                     <div>
                        <label style={labelStyle}>Legal Entity Name</label>
                        <input
                           type="text"
                           value={storeName}
                           onChange={(e) => setStoreName(e.target.value)}
                           style={{ 
                              width: '100%', 
                              padding: '0.875rem 1rem', 
                              background: '#F8FAFC', 
                              border: '1px solid #F1F5F9', 
                              borderRadius: '16px', 
                              fontSize: '0.875rem', 
                              fontWeight: 700, 
                              color: '#111111',
                              outline: 'none',
                              transition: 'all 0.2s ease'
                           }}
                           className="focus:bg-white focus:border-slate-200"
                        />
                     </div>
                     <div>
                        <label style={labelStyle}>Primary Node Logo</label>
                        <div style={{ 
                           border: '2px dashed #F1F5F9', 
                           borderRadius: '20px', 
                           padding: '2rem', 
                           display: 'flex', 
                           flexDirection: 'column', 
                           alignItems: 'center', 
                           justifyContent: 'center', 
                           background: '#FDFDFD',
                           cursor: 'pointer',
                           transition: 'all 0.3s ease'
                        }} onMouseOver={e => { e.currentTarget.style.background = '#white'; e.currentTarget.style.borderColor = '#E2E8F0'; }} onMouseOut={e => { e.currentTarget.style.background = '#FDFDFD'; e.currentTarget.style.borderColor = '#F1F5F9'; }}>
                           <div style={{ 
                              width: '64px', 
                              height: '64px', 
                              borderRadius: '18px', 
                              background: 'white', 
                              border: '1px solid #F1F5F9', 
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              marginBottom: '1rem', 
                              fontSize: '1.5rem', 
                              fontWeight: 900, 
                              color: brandColor 
                           }}>
                              {storeName.substring(0, 1).toUpperCase()}
                           </div>
                           <span style={{ fontSize: '0.8125rem', fontWeight: 900, color: '#111111' }}>Replace Identifier</span>
                           <span style={{ fontSize: '9px', fontWeight: 950, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.50rem' }}>SVG, High-Res PNG (512px)</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div style={cardStyle}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 950, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                     <Palette size={18} />
                     Visual DNA
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                     <div>
                        <label style={labelStyle}>Primary Chrome</label>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                           <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '14px', overflow: 'hidden', border: '1px solid #F1F5F9' }}>
                              <input
                                 type="color"
                                 value={brandColor}
                                 onChange={(e) => setBrandColor(e.target.value)}
                                 style={{ position: 'absolute', top: '-10px', left: '-10px', width: '200%', height: '200%', cursor: 'pointer', border: 'none' }}
                              />
                           </div>
                           <div style={{ flex: 1, padding: '0.875rem 1rem', background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '14px', fontSize: '0.75rem', fontWeight: 900, color: '#64748B', fontFamily: 'monospace' }}>
                              {brandColor.toUpperCase()}
                           </div>
                        </div>
                     </div>
                     <div>
                        <label style={labelStyle}>Action Accent</label>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                           <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '14px', overflow: 'hidden', border: '1px solid #F1F5F9' }}>
                              <input
                                 type="color"
                                 value={accentColor}
                                 onChange={(e) => setAccentColor(e.target.value)}
                                 style={{ position: 'absolute', top: '-10px', left: '-10px', width: '200%', height: '200%', cursor: 'pointer', border: 'none' }}
                              />
                           </div>
                           <div style={{ flex: 1, padding: '0.875rem 1rem', background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: '14px', fontSize: '0.75rem', fontWeight: 900, color: '#64748B', fontFamily: 'monospace' }}>
                              {accentColor.toUpperCase()}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Premium Phone Mockup */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.5rem', background: '#111111', color: 'white', padding: '6px 14px', borderRadius: '100px', fontSize: '8px', fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.15em', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                  <Eye size={12} className="animate-pulse" />
                  Live Shopper Node Preview
               </div>

               <div style={{ 
                  width: '320px', 
                  height: '660px', 
                  background: '#0a0a0a', 
                  borderRadius: '52px', 
                  padding: '12px', 
                  boxShadow: '0 40px 80px -20px rgba(0,0,0,0.3)', 
                  border: '1px solid #2a2a2a',
                  position: 'relative'
               }}>
                  {/* Notch & Frame Details */}
                  <div style={{ position: 'absolute', top: '18px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '24px', background: '#0a0a0a', borderRadius: '0 0 16px 16px', zIndex: 10 }}></div>
                  
                  <div style={{ 
                     width: '100%', 
                     height: '100%', 
                     background: '#FAF9F6', 
                     borderRadius: '42px', 
                     overflow: 'hidden', 
                     position: 'relative',
                     display: 'flex',
                     flexDirection: 'column'
                  }}>
                     {/* Shopper App UI */}
                     <div style={{ flex: 1, padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', marginTop: '1rem' }}>
                           <div style={{ 
                              width: '42px', 
                              height: '42px', 
                              borderRadius: '12px', 
                              background: brandColor, 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              color: 'white', 
                              fontWeight: 900, 
                              fontSize: '1.25rem',
                              boxShadow: `0 8px 16px ${brandColor}30`
                           }}>
                              {storeName.substring(0, 1).toUpperCase()}
                           </div>
                           <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                 <Search size={16} color="#64748B" />
                              </div>
                              <div style={{ position: 'relative', width: '42px', height: '42px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                 <ShoppingCart size={16} color="#64748B" />
                                 <div style={{ position: 'absolute', top: '-1px', right: '-1px', background: '#F97316', color: 'white', fontSize: '9px', fontWeight: 950, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2.5px solid white' }}>2</div>
                              </div>
                           </div>
                        </div>

                        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111111', letterSpacing: '-0.04em' }}>Hello! 👋</h2>
                        <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748B', marginTop: '0.25rem' }}>Scan items to start checkout.</p>

                        <div style={{ 
                           background: 'white', 
                           borderRadius: '24px', 
                           padding: '1.25rem', 
                           boxShadow: '0 4px 12px rgba(0,0,0,0.03)', 
                           marginTop: '2rem',
                           border: '1px solid #F1F5F9'
                        }}>
                           <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                              <div style={{ width: '56px', height: '56px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #F1F5F9' }}></div>
                              <div style={{ flex: 1 }}>
                                 <div style={{ fontSize: '0.8125rem', fontWeight: 900, color: '#111111' }}>Organic Milk (1L)</div>
                                 <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B' }}>₹45.00</div>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                                 <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: '#64748B' }}>-</div>
                                 <span style={{ fontSize: '0.8125rem', fontWeight: 900, color: '#111111' }}>1</span>
                                 <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: 'white', boxShadow: `0 4px 10px ${accentColor}40` }}>+</div>
                              </div>
                           </div>
                        </div>

                        <div style={{ marginTop: 'auto', paddingBottom: '1rem' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem', marginBottom: '1.5rem' }}>
                              <span style={{ fontSize: '9px', fontWeight: 950, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Estimated Total</span>
                              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#111111' }}>₹45.00</span>
                           </div>
                           <button style={{ 
                              width: '100%', 
                              padding: '1.125rem', 
                              background: brandColor, 
                              color: 'white', 
                              border: 'none', 
                              borderRadius: '20px', 
                              fontSize: '0.8125rem', 
                              fontWeight: 950, 
                              letterSpacing: '0.15em',
                              boxShadow: `0 12px 24px ${brandColor}40`
                           }}>
                              START CHECKOUT
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Branding;
