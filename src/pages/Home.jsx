import React from 'react';

export default function Home({ navigateTo }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '56px', fontWeight: '900', letterSpacing: '-0.04em', marginBottom: '24px' }}>The Intelligent Library Engine.</h1>
        <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '600px', margin: '0 auto 40px auto' }}>Enterprise-grade catalog management, real-time spatial reservations, and seamless reading experiences.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button onClick={() => navigateTo('books')} style={{ padding: '16px 32px', fontSize: '16px', fontWeight: '700', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Browse Catalog</button>
          <button onClick={() => navigateTo('reading-room')} style={{ padding: '16px 32px', fontSize: '16px', fontWeight: '700', background: '#fff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer' }}>Book Reading Room</button>
        </div>
      </div>
      <div style={{ background: '#0f172a', borderRadius: '24px', padding: '40px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
        <div>
          <h3 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>Live Campus Dashboard</h3>
          <p style={{ color: '#94a3b8', margin: 0 }}>Current operating capacity across all zones.</p>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          <div style={{ textAlign: 'center' }}><span style={{ display: 'block', fontSize: '32px', fontWeight: '800', color: '#22c55e' }}>44</span><span style={{ fontSize: '12px', color: '#94a3b8' }}>Seats Available</span></div>
          <div style={{ textAlign: 'center' }}><span style={{ display: 'block', fontSize: '32px', fontWeight: '800', color: '#3b82f6' }}>12k+</span><span style={{ fontSize: '12px', color: '#94a3b8' }}>Books Ready</span></div>
          <div style={{ textAlign: 'center' }}><span style={{ display: 'block', fontSize: '32px', fontWeight: '800', color: '#eab308' }}>76</span><span style={{ fontSize: '12px', color: '#94a3b8' }}>Active Readers</span></div>
        </div>
      </div>
    </div>
  );
}