import React from 'react';
import { BookOpen, Search, Bell, User } from 'lucide-react';

export default function Navbar({ user, currentView, navigateTo, setShowSearchOverlay }) {
  // Define nav items
  const navItems = ['home', 'books', 'reading-room', 'membership'];
  
  // Add librarian link only if user is authorized
  if (user.role === 'librarian') {
    navItems.push('librarian-dashboard');
  }

  return (
    <nav style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigateTo('home')}>
          <div style={{ background: '#0f172a', color: '#fff', padding: '8px', borderRadius: '8px' }}><BookOpen size={20} /></div>
          <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-0.02em' }}>ATHENA</span>
        </div>

        {/* Dynamic Links */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {navItems.map(route => (
            <span 
              key={route} 
              className={`nav-link ${currentView === route ? 'active' : ''}`} 
              onClick={() => {console.log(route); navigateTo(route);}}
              style={{ 
                cursor: 'pointer', 
                fontWeight: currentView === route ? '700' : '500',
                color: route === 'librarian-dashboard' ? '#dc2626' : '#334155' 
              }}
            >
              {route.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </span>
          ))}
        </div>

        {/* User Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Search size={20} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => setShowSearchOverlay(true)} />
          <Bell size={20} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => navigateTo('dashboard')} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', padding: '8px 16px', borderRadius: '20px' }}>
            <User size={16} /> <span>{user.name}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}