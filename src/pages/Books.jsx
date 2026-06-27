import React from 'react';
import { Search, ChevronDown, MapPin } from 'lucide-react';
import { BOOKS } from '../data/mockData.js'; // Added .js to fix Vite resolution

export default function Books({ navigateTo }) {
  return (
    <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 24px' }}>
      
      {/* FILTER BAR */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input type="text" placeholder="Search Books..." style={{ width: '100%', padding: '12px 16px 12px 40px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', outline: 'none' }} />
        </div>
        {['Category', 'Author', 'Language', 'Availability', 'Floor', 'Shelf'].map(f => (
          <div key={f} className="filter-dropdown">{f} <ChevronDown size={14} /></div>
        ))}
      </div>

      {/* NEW ELEGANT BOOK GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
        {BOOKS.map(book => (
          <div key={book.id} className="book-card">
            
            <div className="book-image-container">
              <img src={book.cover} alt={book.title} className="book-image" />
              <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.9)', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '800', color: '#0f172a', backdropFilter: 'blur(4px)' }}>
                {book.category}
              </div>
              <div className="book-hover-actions">
                <button className="book-btn" onClick={() => navigateTo('book-details', book)}>Open & Reserve</button>
              </div>
            </div>

            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: '700', letterSpacing: '1px', marginBottom: '4px' }}>{book.id}</span>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '800', lineHeight: '1.2' }}>{book.title}</h3>
              <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '14px' }}>by {book.author}</p>
              
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#475569' }}>
                  <MapPin size={14} /> F{book.location.floor} • S-{book.location.shelf}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700', color: book.status === 'Available' ? '#22c55e' : '#eab308' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: book.status === 'Available' ? '#22c55e' : '#eab308' }}></span>
                  {book.copies.available} Left
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}