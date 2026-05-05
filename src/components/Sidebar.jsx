import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Store, Package, Database,
  ReceiptText, BarChart3, Tag, Palette,
  Users, Settings, CreditCard, LogOut
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/' },
    { label: 'Stores', icon: Store, path: '/stores' },
    { label: 'Products', icon: Package, path: '/products' },
    { label: 'Inventory', icon: Database, path: '/inventory' },
    { label: 'Transactions', icon: ReceiptText, path: '/transactions' },
    { label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { label: 'Promotions', icon: Tag, path: '/promotions' },
    { label: 'Branding', icon: Palette, path: '/branding' },
    { label: 'Staff Access', icon: Users, path: '/staff' },
    { label: 'Settings', icon: Settings, path: '/settings' },
    { label: 'Billing', icon: CreditCard, path: '/billing' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">F</div>
          <div className="logo-text-group">
            <span className="logo-text">FreshMart</span>
            <span className="powered-by">powered by minimalStore</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item logout">
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
