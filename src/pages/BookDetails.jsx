import React from 'react';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';

export default function BookDetails({ selectedBook, navigateTo }) {
  if (!selectedBook) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>No book selected.</h2>
        <button onClick={() => navigateTo('books')} style={{ padding: '12px 24px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Return to Catalog</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', gap: '48px', marginBottom: '40px' }}>
        <img src={selectedBook.cover} alt={selectedBook.title} style={{ width: '250px', height: '380px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
        
        <div style={{ flex: 1 }}>
          <span style={{ color: '#3b82f6', fontWeight: '700', letterSpacing: '1px', fontSize: '14px', textTransform: 'uppercase' }}>{selectedBook.id} • {selectedBook.category}</span>
          <h1 style={{ fontSize: '56px', margin: '8px 0', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: '1.1' }}>{selectedBook.title}</h1>
          <p style={{ fontSize: '24px', color: '#475569', margin: '0 0 24px 0' }}>by {selectedBook.author}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '24px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '32px' }}>
            <div><span style={{ color: '#64748b', fontSize: '13px' }}>Total</span><div style={{ fontSize: '24px', fontWeight: '800' }}>{selectedBook.copies.total}</div></div>
            <div><span style={{ color: '#64748b', fontSize: '13px' }}>Available</span><div style={{ fontSize: '24px', fontWeight: '800', color: '#22c55e' }}>{selectedBook.copies.available}</div></div>
            <div><span style={{ color: '#64748b', fontSize: '13px' }}>Borrowed</span><div style={{ fontSize: '24px', fontWeight: '800', color: '#eab308' }}>{selectedBook.copies.borrowed}</div></div>
            <div><span style={{ color: '#64748b', fontSize: '13px' }}>Reserved</span><div style={{ fontSize: '24px', fontWeight: '800', color: '#3b82f6' }}>{selectedBook.copies.reserved}</div></div>
          </div>
          
          <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '16px' }}>{selectedBook.description}</p>
        </div>
      </div>

      {/* TWO COLUMN LOWER LAYOUT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '48px' }}>
        
        {/* LEFT: DEEP STATS */}
        <div>
          <h3 style={{ fontSize: '20px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>Publication Metrics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}><span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>ISBN-13</span><strong style={{ fontSize: '15px' }}>{selectedBook.details.isbn}</strong></div>
            <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}><span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Publisher</span><strong style={{ fontSize: '15px' }}>{selectedBook.details.publisher}</strong></div>
            <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}><span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Pages</span><strong style={{ fontSize: '15px' }}>{selectedBook.details.pages}</strong></div>
            <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}><span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Global Rating</span><strong style={{ fontSize: '15px' }}>⭐ {selectedBook.details.rating} / 5.0</strong></div>
          </div>

          <h3 style={{ fontSize: '20px', marginBottom: '16px', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px' }}>Physical Location</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ background: '#fff', padding: '12px', borderRadius: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}><MapPin size={24} color="#3b82f6" /></div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '800' }}>Floor {selectedBook.location.floor}, Shelf {selectedBook.location.shelf}</div>
              <div style={{ color: '#64748b', fontSize: '14px' }}>Proceed to the {selectedBook.category} wing to find this volume.</div>
            </div>
          </div>
        </div>

        {/* RIGHT: THE INTEGRATED RESERVATION SYSTEM */}
        <div>
          <div style={{ background: '#fff', border: '2px solid #0f172a', borderRadius: '24px', padding: '32px', position: 'sticky', top: '100px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>Secure Reservation</h2>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Book this volume for physical pickup at any campus counter.</p>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#475569', marginBottom: '8px', textTransform: 'uppercase' }}>Target Date</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input type="date" style={{ width: '100%', padding: '14px 14px 14px 40px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontFamily: 'inherit', fontWeight: '600', color: '#0f172a', outline: 'none' }} />
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#475569', marginBottom: '8px', textTransform: 'uppercase' }}>Pickup Node</label>
              <div style={{ position: 'relative' }}>
                <select style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontFamily: 'inherit', fontWeight: '600', color: '#0f172a', outline: 'none', appearance: 'none' }}>
                  <option>Main Desk (Floor 1)</option>
                  <option>Science Wing Node (Floor 2)</option>
                  <option>24/7 Self-Service Kiosk A</option>
                </select>
                <ChevronDown size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
              </div>
            </div>

            <button style={{ width: '100%', padding: '16px', background: selectedBook.status === 'Available' ? '#0f172a' : '#cbd5e1', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '800', cursor: selectedBook.status === 'Available' ? 'pointer' : 'not-allowed', transition: 'transform 0.2s' }}>
              {selectedBook.status === 'Available' ? 'Confirm Book Hold' : 'Currently Unavailable'}
            </button>
            
            {selectedBook.status !== 'Available' && (
              <p style={{ textAlign: 'center', color: '#ef4444', fontSize: '13px', fontWeight: '600', marginTop: '16px' }}>Expected return: {selectedBook.returnDate}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}