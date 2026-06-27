import React from 'react';
import { XCircle } from 'lucide-react';

export default function SearchOverlay({ setShowSearchOverlay, navigateTo }) {
  return (
    <div className="search-overlay">
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', margin: 0 }}>Global Search</h2>
          <XCircle size={32} style={{ cursor: 'pointer' }} onClick={() => setShowSearchOverlay(false)} />
        </div>
        <input 
          autoFocus
          type="text" 
          placeholder="Search books, authors, or ISBN..." 
          style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid #334155', color: 'white', fontSize: '48px', paddingBottom: '16px', outline: 'none', marginBottom: '40px' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div>
            <h4 style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Suggestions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '18px' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('books')}>Harry Potter</span>
              <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('books')}>Atomic Habits</span>
              <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('books')}>Machine Learning</span>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Categories</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {['Programming', 'AI', 'Engineering', 'Medical', 'History', 'Novel'].map(cat => (
                <span key={cat} style={{ background: '#1e293b', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }} onClick={() => navigateTo('books')}>{cat}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}