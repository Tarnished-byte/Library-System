import React from 'react';
import { BookOpen, Search, Bell, User } from 'lucide-react';

export default function Navbar({ currentView, navigateTo, setShowSearchOverlay }) {
  return (
    <nav style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigateTo('home')}>
          <div style={{ background: '#0f172a', color: '#fff', padding: '8px', borderRadius: '8px' }}><BookOpen size={20} /></div>
          <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-0.02em' }}>ATHENA</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['home', 'books', 'reading-room', 'membership'].map(route => (
            <span key={route} className={`nav-link ${currentView === route ? 'active' : ''}`} onClick={() => navigateTo(route)}>
              {route.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Search size={20} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => setShowSearchOverlay(true)} />
          <Bell size={20} color="#64748b" style={{ cursor: 'pointer' }} onClick={() => navigateTo('dashboard')} />
          <button onClick={() => navigateTo('dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: '600' }}>
            <User size={16} /> Login / Sougat
          </button>
        </div>
      </div>
    </nav>
  );
}