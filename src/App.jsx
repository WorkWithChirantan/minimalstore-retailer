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

import './App.css';

const PageWrapper = ({ session }) => {
  const location = useLocation();
  const { profile, profileLoaded } = useDashboard();
  
  // Map path to title
  const getPageTitle = (path) => {
    switch(path) {
      case '/': return 'Overview';
      case '/stores': return 'Stores';
      case '/products': return 'Products';
      case '/inventory': return 'Inventory';
      case '/transactions': return 'Transactions';
      case '/analytics': return 'Analytics';
      case '/promotions': return 'Promotions';
      case '/branding': return 'Branding';
      case '/staff': return 'Staff Access';
      case '/settings': return 'Settings';
      case '/billing': return 'Billing';
      default: 
        if (path.startsWith('/stores/')) return 'Node Analytics';
        return 'theminimalStore';
    }
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
        <Sidebar />
        <main className="main-content">
          <TopNav title={getPageTitle(location.pathname)} />
          <div className="workspace">
            {profile ? (
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/stores" element={<StoreManagement />} />
                <Route path="/stores/:storeId" element={<StoreAnalytics />} />
                <Route path="/products" element={<ProductManagement />} />
                <Route path="/inventory" element={<InventoryManagement />} />
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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Login onLogin={setSession} />;
  }

  return (
    <DashboardProvider session={session}>
      <Router>
        <PageWrapper session={session} />
      </Router>
    </DashboardProvider>
  );
}

export default App;
