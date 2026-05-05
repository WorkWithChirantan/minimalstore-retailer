import { Bell, Search, User, Settings, HelpCircle, ChevronDown, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TopNav = ({ title }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowNotifications(false);
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <header ref={navRef} className="top-nav" style={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border)', 
      background: 'white',
      height: '80px',
      padding: '0 3rem',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
          {title}
        </h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {/* Modern Search Bar */}
        <div style={{ position: 'relative', width: '320px' }} className="hidden md:block">
          <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search commands or data..."
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem 0.75rem 2.75rem', 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0', 
              borderRadius: '14px', 
              fontSize: '0.8125rem',
              fontWeight: 500,
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
          />
          <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4, pointerEvents: 'none' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, border: '1px solid #94a3b8', padding: '1px 4px', borderRadius: '4px' }}>⌘K</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }} style={{ padding: '0.625rem', color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative' }}>
                <Bell size={20} />
                <span style={{ position: 'absolute', top: '0.625rem', right: '0.625rem', width: '8px', height: '8px', background: 'var(--error)', borderRadius: '50%', border: '2px solid white' }}></span>
              </button>
              {showNotifications && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', width: '320px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '1.25rem', zIndex: 110 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#111111' }}>Notifications</h4>
                    <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700, cursor: 'pointer' }}>Mark all as read</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '12px', borderLeft: '3px solid #10B981' }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#111111' }}>Sync Server Online</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>Inventory synced across all nodes.</div>
                    </div>
                    <div style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#111111' }}>New Store Added</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>"Westside Deli" was created successfully.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => alert('Help Center opened')} style={{ padding: '0.625rem', color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <HelpCircle size={20} />
            </button>
          </div>
          
          <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }}></div>
          
          {/* User Profile Pill */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              padding: '0.375rem', 
              paddingRight: '1rem',
              background: 'white', 
              border: '1px solid #e2e8f0', 
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }} className="profile-btn-hover">
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '12px', 
                background: '#111111', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 700, 
                fontSize: '0.875rem' 
              }}>
                AK
              </div>
              <div style={{ textAlign: 'left' }} className="hidden lg:block">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-main)' }}>Arjun Kapoor</span>
                  <ChevronDown size={12} style={{ color: 'var(--text-muted)', opacity: 0.5, transform: showProfile ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Store Owner
                </div>
              </div>
            </button>
            
            {showProfile && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', width: '240px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '0.5rem', zIndex: 110 }}>
                <button onClick={() => { navigate('/settings'); setShowProfile(false); }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem 1rem', background: 'transparent', border: 'none', borderRadius: '12px', cursor: 'pointer', textAlign: 'left' }} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <Settings size={16} style={{ color: '#64748B' }} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>Account Settings</span>
                </button>
                <button onClick={() => { navigate('/staff'); setShowProfile(false); }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem 1rem', background: 'transparent', border: 'none', borderRadius: '12px', cursor: 'pointer', textAlign: 'left' }} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <User size={16} style={{ color: '#64748B' }} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>Staff Access</span>
                </button>
                <div style={{ height: '1px', background: '#E2E8F0', margin: '0.25rem 0' }}></div>
                <button onClick={() => { alert('Logged out successfully.'); navigate('/'); setShowProfile(false); }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem 1rem', background: 'transparent', border: 'none', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', color: '#EF4444' }} onMouseOver={e => e.currentTarget.style.background = '#FEF2F2'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                  <LogOut size={16} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
