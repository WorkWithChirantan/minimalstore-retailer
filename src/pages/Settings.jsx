import { useState, useEffect } from 'react';
import {
   User, Bell, Shield, Globe,
   Mail, Phone, Lock, ChevronRight, Copy
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { supabase } from '../lib/supabase';

const Settings = () => {
   const [activeTab, setActiveTab] = useState('profile');
   const { profile, session, setProfile } = useDashboard();
   const [formData, setFormData] = useState({
      full_name: profile?.full_name || '',
      company_name: profile?.company_name || '',
      phone: profile?.phone || '',
   });
   const [saving, setSaving] = useState(false);
   const [message, setMessage] = useState('');

   useEffect(() => {
      if (profile) {
         setFormData({
            full_name: profile.full_name || '',
            company_name: profile.company_name || '',
            phone: profile.phone || '',
         });
      }
   }, [profile]);

   const handleSave = async () => {
      setSaving(true);
      setMessage('');
      try {
         const { error } = await supabase
            .from('profiles')
            .update(formData)
            .eq('id', session.user.id);
            
         if (error) throw error;
         setProfile({ ...profile, ...formData });
         setMessage('Profile updated successfully!');
         setTimeout(() => setMessage(''), 3000);
      } catch (err) {
         setMessage(`Error: ${err.message}`);
      } finally {
         setSaving(false);
      }
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

   const navBtnStyle = (id) => ({
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 1.25rem',
      borderRadius: '16px',
      fontSize: '0.875rem',
      fontWeight: activeTab === id ? 900 : 700,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: '1px solid',
      borderColor: activeTab === id ? '#111111' : '#E2E8F0',
      background: activeTab === id ? '#111111' : 'white',
      color: activeTab === id ? 'white' : '#64748B',
      boxShadow: activeTab === id ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
   });

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
               <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: '#111111' }}>General Settings</h1>
               <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem', fontWeight: 500 }}>Manage your profile, notifications, and security preferences.</p>
               {message && <p style={{ color: message.includes('Error') ? '#EF4444' : '#10B981', fontWeight: 700, marginTop: '0.5rem' }}>{message}</p>}
            </div>
            <button 
               onClick={handleSave} 
               disabled={saving}
               style={{...primaryBtnStyle, opacity: saving ? 0.7 : 1}} 
               onMouseOver={e => e.currentTarget.style.background = '#000000'} 
               onMouseOut={e => e.currentTarget.style.background = '#111111'}
            >
               {saving ? 'Saving...' : 'Save Changes'}
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sidebar Navigation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               <button onClick={() => setActiveTab('profile')} style={navBtnStyle('profile')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                     <User size={20} />
                     Account Profile
                  </div>
                  <ChevronRight size={16} style={{ opacity: 0.5 }} />
               </button>
               <button onClick={() => setActiveTab('notifications')} style={navBtnStyle('notifications')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                     <Bell size={20} />
                     Notifications
                  </div>
                  <ChevronRight size={16} style={{ opacity: 0.5 }} />
               </button>
               <button onClick={() => setActiveTab('security')} style={navBtnStyle('security')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                     <Shield size={20} />
                     Privacy & Security
                  </div>
                  <ChevronRight size={16} style={{ opacity: 0.5 }} />
               </button>
               <button onClick={() => setActiveTab('integration')} style={navBtnStyle('integration')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                     <Globe size={20} />
                     Integration Settings
                  </div>
                  <ChevronRight size={16} style={{ opacity: 0.5 }} />
               </button>
            </div>

            {/* Profile Content */}
            <div className="lg:col-span-2 space-y-8">
               <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 950, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                     <User size={18} />
                     Profile Information
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                     <div>
                        <label style={labelStyle}>Full Name</label>
                        <input type="text" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} style={inputStyle} className="focus:bg-white focus:border-slate-200" />
                     </div>
                     <div>
                        <label style={labelStyle}>Company Name</label>
                        <input type="text" value={formData.company_name} onChange={e => setFormData({...formData, company_name: e.target.value})} style={inputStyle} className="focus:bg-white focus:border-slate-200" />
                     </div>
                     <div>
                        <label style={labelStyle}>Email Address (Read Only)</label>
                        <div style={{ position: 'relative' }}>
                           <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} size={16} />
                           <input type="email" value={session?.user?.email || ''} readOnly style={{ ...inputStyle, paddingLeft: '2.75rem', opacity: 0.7, cursor: 'not-allowed' }} />
                        </div>
                     </div>
                     <div>
                        <label style={labelStyle}>Phone Number</label>
                        <div style={{ position: 'relative' }}>
                           <Phone style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} size={16} />
                           <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ ...inputStyle, paddingLeft: '2.75rem' }} className="focus:bg-white focus:border-slate-200" />
                        </div>
                     </div>
                     
                     <div className="col-span-2 mt-4 pt-6" style={{ borderTop: '1px solid #F1F5F9' }}>
                        <label style={labelStyle}>Your Store ID (API Key for Self-Checkout PWA)</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                           <input type="text" value={session?.user?.id || ''} readOnly style={{ ...inputStyle, fontFamily: 'monospace', opacity: 0.8, flex: 1 }} />
                           <button 
                             onClick={() => navigator.clipboard.writeText(session?.user?.id || '')}
                             style={{ ...actionBtnStyle, background: '#F8FAFC', padding: '0.75rem' }}
                             title="Copy to clipboard"
                           >
                             <Copy size={16} />
                           </button>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.5rem', fontWeight: 600 }}>
                           Paste this ID into the Customer PWA code to securely link scanners to your dashboard.
                        </p>
                     </div>
                  </div>
               </div>

               <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 950, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                     <Lock size={18} />
                     Security Credentials
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', background: '#F8FAFC', borderRadius: '18px', border: '1px solid #F1F5F9' }}>
                        <div>
                           <div style={{ fontSize: '0.875rem', fontWeight: 900, color: '#111111' }}>Two-Factor Authentication</div>
                           <p style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, marginTop: '0.25rem' }}>Add an extra layer of security to your account.</p>
                        </div>
                        <div style={{ width: '42px', height: '22px', background: '#10B981', borderRadius: '100px', position: 'relative', cursor: 'pointer' }}>
                           <div style={{ position: 'absolute', right: '2px', top: '2px', width: '18px', height: '18px', background: 'white', borderRadius: '50%', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
                        </div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', background: '#F8FAFC', borderRadius: '18px', border: '1px solid #F1F5F9' }}>
                        <div>
                           <div style={{ fontSize: '0.875rem', fontWeight: 900, color: '#111111' }}>Automatic Backups</div>
                           <p style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, marginTop: '0.25rem' }}>Backup store data every 24 hours to secure cloud.</p>
                        </div>
                        <div style={{ width: '42px', height: '22px', background: '#10B981', borderRadius: '100px', position: 'relative', cursor: 'pointer' }}>
                           <div style={{ position: 'absolute', right: '2px', top: '2px', width: '18px', height: '18px', background: 'white', borderRadius: '50%', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
                        </div>
                     </div>
                  </div>
                  <button style={{ ...actionBtnStyle, marginTop: '1.5rem', border: 'none', background: 'transparent', padding: '0', textDecoration: 'underline', color: '#111111', fontWeight: 950, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }} onMouseOver={e => e.currentTarget.style.opacity = 0.7} onMouseOut={e => e.currentTarget.style.opacity = 1}>
                     Change Account Password
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Settings;
