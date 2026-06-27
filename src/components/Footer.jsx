import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '60px 24px', marginTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', marginBottom: '24px' }}>
            <BookOpen size={20} /> <span style={{ fontSize: '20px', fontWeight: '900' }}>ATHENA</span>
          </div>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>The premier library ecosystem for advanced learning and spatial management.</p>
        </div>
        <div><h4 style={{ color: 'white', marginBottom: '16px' }}>Library Rules</h4><ul style={{ listStyle: 'none', padding: 0, gap: '12px', display: 'flex', flexDirection: 'column', fontSize: '14px' }}><li>Code of Conduct</li><li>Borrowing Policy</li><li>Fines & Fees</li></ul></div>
        <div><h4 style={{ color: 'white', marginBottom: '16px' }}>Opening Hours</h4><ul style={{ listStyle: 'none', padding: 0, gap: '12px', display: 'flex', flexDirection: 'column', fontSize: '14px' }}><li>Mon - Fri: 8 AM - 10 PM</li><li>Sat: 9 AM - 8 PM</li><li>Sun: Closed</li></ul></div>
        <div><h4 style={{ color: 'white', marginBottom: '16px' }}>Contact & Support</h4><ul style={{ listStyle: 'none', padding: 0, gap: '12px', display: 'flex', flexDirection: 'column', fontSize: '14px' }}><li>support@athena.edu</li><li>+91 1800 123 4567</li><li>Librarian Intercom</li></ul></div>
      </div>
    </footer>
  );
}