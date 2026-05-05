import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import { DashboardProvider } from './context/DashboardContext';

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

import './App.css';

const PageWrapper = ({ session }) => {
  const location = useLocation();
  
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
        return 'RetailOS';
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TopNav title={getPageTitle(location.pathname)} />
          <button 
            onClick={handleLogout}
            style={{ marginRight: '2rem', padding: '8px 16px', background: '#FEF2F2', color: '#EF4444', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
        <div className="workspace">
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
        </div>
      </main>
    </div>
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
    <DashboardProvider>
      <Router>
        <PageWrapper session={session} />
      </Router>
    </DashboardProvider>
  );
}

export default App;
