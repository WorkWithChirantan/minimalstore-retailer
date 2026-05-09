import { Bell, Search, User, Settings, HelpCircle, ChevronDown, LogOut, Menu } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext';
import { supabase } from '../lib/supabase';
import styles from './TopNav.module.css';

const TopNav = ({ title, onToggleSidebar, loginTime }) => {
  const navigate = useNavigate();
  const { profile } = useDashboard();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
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

  useEffect(() => {
    if (!loginTime) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.floor((now - loginTime) / 1000);
      
      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      const format = (n) => n.toString().padStart(2, '0');
      setElapsedTime(`${format(hours)}:${format(minutes)}:${format(seconds)}`);
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, [loginTime]);

  return (
    <header ref={navRef} className={styles.header}>
      <div className={styles.titleGroup}>
        <button 
          className={styles.menuButton} 
          onClick={onToggleSidebar}
          aria-label="Toggle Menu"
        >
          <Menu size={20} />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 className={styles.title}>{title}</h2>
          {loginTime && (
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
              Session: {elapsedTime}
            </span>
          )}
        </div>
      </div>
      <style>{`@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }`}</style>

      <div className={styles.actionsGroup}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search commands or data..."
            className={styles.searchInput}
          />
          <div className={styles.searchShortcut}>
            <span className={styles.shortcutText}>⌘K</span>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.iconButtons}>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }} 
                className={styles.iconButton}
              >
                <Bell size={20} />
                <span className={styles.notificationDot}></span>
              </button>
              
              {showNotifications && (
                <div className={styles.notificationDropdown}>
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
            <button 
              onClick={() => alert('Help Center opened')} 
              className={styles.iconButton}
            >
              <HelpCircle size={20} />
            </button>
          </div>
          
          <div className={styles.divider}></div>
          
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }} 
              className={styles.profilePill}
            >
              <div className={styles.avatar}>
                {profile?.full_name ? profile.full_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '??'}
              </div>
              <div className={styles.profileInfo}>
                <div className={styles.profileNameGroup}>
                  <span className={styles.profileName}>{profile?.full_name || 'Loading...'}</span>
                  <ChevronDown size={12} style={{ color: 'var(--text-muted)', opacity: 0.5, transform: showProfile ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
                </div>
                <div className={styles.profileCompany}>
                  {profile?.company_name || 'Store Owner'}
                </div>
              </div>
            </button>
            
            {showProfile && (
              <div className={styles.dropdown}>
                <button onClick={() => { navigate('/settings'); setShowProfile(false); }} className={styles.dropdownItem}>
                  <Settings size={16} style={{ color: '#64748B' }} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>Account Settings</span>
                </button>
                <button onClick={() => { navigate('/staff'); setShowProfile(false); }} className={styles.dropdownItem}>
                  <User size={16} style={{ color: '#64748B' }} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111111' }}>Staff Access</span>
                </button>
                <div style={{ height: '1px', background: '#E2E8F0', margin: '0.25rem 0' }}></div>
                <button onClick={async () => { await supabase.auth.signOut(); setShowProfile(false); }} className={styles.logoutItem}>
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
