import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import { DashboardProvider, useDashboard } from './context/DashboardContext';

import Overview from './pages/Overview';
import StoreManagement from './pages/StoreManagement';
import ProductManagement from './pages/ProductManagement';
import InventoryManagement from './pages/InventoryManagement';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Promotions from './pages/Promotions';
import Branding from './pages/Branding';
import StaffAccess from './pages/StaffAccess';
import Settings from './pages/Settings';
import Billing from './pages/Billing';
import StoreAnalytics from './pages/StoreAnalytics';
import Login from './pages/Login';
import OnboardingModal from './components/OnboardingModal';

const StoreDetailRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StoreAnalytics />} />
      <Route path="/products" element={<ProductManagement />} />
      <Route path="/inventory" element={<InventoryManagement />} />
    </Routes>
  );
};

import './App.css';

const PageWrapper = ({ session, loginTime }) => {
  const location = useLocation();
  const { profile, profileLoaded } = useDashboard();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Map path to title
  const getPageTitle = (path) => {
    if (path === '/') return 'Overview';
    if (path === '/stores') return 'Stores';
    if (path === '/transactions') return 'Transactions';
    if (path === '/analytics') return 'Analytics';
    if (path === '/promotions') return 'Promotions';
    if (path === '/branding') return 'Branding';
    if (path === '/staff') return 'Staff Access';
    if (path === '/settings') return 'Settings';
    if (path === '/billing') return 'Billing';

    if (path.includes('/stores/')) {
      if (path.endsWith('/products')) return 'Store Products';
      if (path.endsWith('/inventory')) return 'Store Inventory';
      return 'Node Analytics';
    }

    return 'theminimalStore';
  };

  return (
    <>
      {profileLoaded && !profile && (
        <OnboardingModal
          session={session}
          onComplete={() => {
            // Re-fetch or hard reload to pick up the new profile
            window.location.reload();
          }}
        />
      )}
      <div className="layout-container">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="main-content">
          <TopNav
            title={getPageTitle(location.pathname)}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            loginTime={loginTime}
          />
          <div className="workspace">
            {profile ? (
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/stores" element={<StoreManagement />} />
                <Route path="/stores/:storeId/*" element={<StoreDetailRoutes />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/promotions" element={<Promotions />} />
                <Route path="/branding" element={<Branding />} />
                <Route path="/staff" element={<StaffAccess />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/billing" element={<Billing />} />
              </Routes>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <p style={{ color: '#64748B', fontWeight: 600 }}>Loading Dashboard...</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

function App() {
  const [session, setSession] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loginTime, setLoginTime] = useState(null);

  useEffect(() => {
    // Check for login time in local storage to persist timer across refreshes
    const storedLoginTime = localStorage.getItem('scaas_login_time');
    if (storedLoginTime) {
      setLoginTime(parseInt(storedLoginTime));
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session && !storedLoginTime) {
        const now = Date.now();
        setLoginTime(now);
        localStorage.setItem('scaas_login_time', now.toString());
      }
      setInitializing(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        if (!localStorage.getItem('scaas_login_time')) {
          const now = Date.now();
          setLoginTime(now);
          localStorage.setItem('scaas_login_time', now.toString());
        }
      } else {
        localStorage.removeItem('scaas_login_time');
        setLoginTime(null);
      }
      setInitializing(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (initializing) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#FAF9F6' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid #E2E8F0', borderTop: '3px solid #111111', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#64748B', fontWeight: 600, fontSize: '0.875rem' }}>Verifying Session...</p>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!session) {
    return <Login onLogin={(s) => {
      setSession(s);
      const now = Date.now();
      setLoginTime(now);
      localStorage.setItem('scaas_login_time', now.toString());
    }} />;
  }

  return (
    <DashboardProvider session={session}>
      <Router>
        <PageWrapper session={session} loginTime={loginTime} />
      </Router>
    </DashboardProvider>
  );
}

export default App;
