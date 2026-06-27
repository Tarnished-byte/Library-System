import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function Membership() {
  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '40px', fontWeight: '900', marginBottom: '16px' }}>Library Access Tier</h1>
      <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '40px' }}>One unified plan for complete physical and digital ecosystem access.</p>
      <div style={{ background: '#fff', border: '3px solid #0f172a', borderRadius: '24px', padding: '48px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}>
        <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', background: '#0f172a', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>Recommended</div>
        <h3 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 8px 0' }}>Premium Membership</h3>
        <div style={{ fontSize: '56px', fontWeight: '900', marginBottom: '40px', letterSpacing: '-0.04em' }}>₹499<span style={{ fontSize: '16px', color: '#64748b', fontWeight: '600', letterSpacing: '-0.04em'  }}>/ Month</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', marginBottom: '48px' }}>
          {['Unlimited Reservations', 'Reading Room Priority Booking', 'Digital Library Full Access', 'Instant Book Notifications', 'Extended Borrow Period'].map(benefit => (
            <div key={benefit} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '600', color: '#334155' }}>
              <CheckCircle size={20} color="#22c55e" /> {benefit}
            </div>
          ))}
        </div>
        <button style={{ width: '100%', padding: '20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '800', cursor: 'pointer', transition: 'background 0.2s' }}>Become Premium Now</button>
      </div>
    </div>
  );
}