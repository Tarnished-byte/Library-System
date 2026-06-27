import React from 'react';
import { Activity } from 'lucide-react';

export default function Dashboard() {
  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '8px' }}>Welcome back, Sougat</h1>
      <p style={{ color: '#64748b', marginBottom: '40px' }}>Here is your active library standing and current statistics.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '40px' }}>
        {[
          { label: 'Books Borrowed', val: '3', color: '#3b82f6' },
          { label: 'Reservations', val: '2', color: '#22c55e' },
          { label: 'Reading Hours', val: '28', color: '#8b5cf6' },
          { label: 'Membership', val: 'Premium', color: '#eab308' },
          { label: 'Pending Fine', val: '₹0', color: '#ef4444' }
        ].map(stat => (
          <div key={stat.label} style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', borderTop: `4px solid ${stat.color}` }}>
            <div style={{ fontSize: '24px', fontWeight: '900', marginBottom: '4px' }}>{stat.val}</div>
            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 24px 0' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#3b82f6', background: '#eff6ff', padding: '2px 8px', borderRadius: '4px' }}>Reserved</span>
                <div style={{ fontWeight: '700', marginTop: '4px' }}>Atomic Habits</div>
              </div>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>Yesterday</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#22c55e', background: '#f0fdf4', padding: '2px 8px', borderRadius: '4px' }}>Returned</span>
                <div style={{ fontWeight: '700', marginTop: '4px' }}>Deep Learning</div>
              </div>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>Today</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#8b5cf6', background: '#f5f3ff', padding: '2px 8px', borderRadius: '4px' }}>Booked</span>
                <div style={{ fontWeight: '700', marginTop: '4px' }}>Reading Room Seat A12</div>
              </div>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>Tomorrow</span>
            </div>
          </div>
        </div>
        <div style={{ background: '#0f172a', padding: '32px', borderRadius: '16px', color: 'white' }}>
          <h3 style={{ margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={20} color="#eab308" /> Reading Statistics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div><span style={{ color: '#94a3b8', fontSize: '13px' }}>Total Books Read</span><div style={{ fontSize: '28px', fontWeight: '900' }}>25</div></div>
            <div><span style={{ color: '#94a3b8', fontSize: '13px' }}>Hours Studied</span><div style={{ fontSize: '28px', fontWeight: '900' }}>140</div></div>
            <div><span style={{ color: '#94a3b8', fontSize: '13px' }}>Favorite Category</span><div style={{ fontSize: '20px', fontWeight: '700' }}>Programming</div></div>
            <div><span style={{ color: '#94a3b8', fontSize: '13px' }}>Current Streak</span><div style={{ fontSize: '20px', fontWeight: '700', color: '#eab308' }}>15 Days 🔥</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}