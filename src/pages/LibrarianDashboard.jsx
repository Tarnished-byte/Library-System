import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Users, DollarSign, Clock, Bell, AlertCircle, 
  FileText, BarChart3, Search, ShieldAlert, LogOut, CheckSquare, 
  Menu, ChevronRight, TrendingUp, UserCheck, RefreshCw 
} from 'lucide-react';

/**
 * LIBRARIAN DASHBOARD - PROFESSIONAL ENTERPRISE COMPONENT
 * This file contains the complete logic, synthetic data, and view management.
 */
const COLORS = {
  bg: '#f8fafc',
  card: '#ffffff',
  primary: '#2563eb',
  textMain: '#1e293b',
  textMuted: '#64748b',
  border: '#e2e8f0'
};

// --- LARGE SCALE SYNTHETIC DATA ENGINE ---
const generateFullData = () => ({
  inventory: Array.from({ length: 20 }, (_, i) => ({
    id: `B-${1000 + i}`, title: `Engineering Principles Vol ${i + 1}`, author: `Dr. Author ${i}`, 
    category: ['Science', 'Tech', 'History', 'Fiction'][i % 4], stock: Math.floor(Math.random() * 20), 
    status: Math.random() > 0.1 ? 'Available' : 'Reserved'
  })),
  loans: Array.from({ length: 15 }, (_, i) => ({
    id: `L-900${i}`, book: `Book Title ${i}`, member: `Member ${i}`, 
    dueDate: `2026-07-${10 + i}`, status: i % 5 === 0 ? 'Overdue' : 'Active',
    fine: i % 5 === 0 ? (Math.random() * 10).toFixed(2) : '0.00'
  })),
  attendance: Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, name: `User ${i + 1}`, entry: '09:00 AM', 
    exit: i % 3 === 0 ? '05:00 PM' : 'Still Inside', status: i % 3 === 0 ? 'Completed' : 'In Library'
  })),
  payments: Array.from({ length: 12 }, (_, i) => ({
    id: `P-100${i}`, member: `Member ${i}`, amount: (Math.random() * 100).toFixed(2), 
    reason: i % 2 === 0 ? 'Fines' : 'Membership', status: i % 3 === 0 ? 'Pending' : 'Settled'
  })),
  auditLogs: [
    { ts: '10:00:01', msg: 'System initialized successfully' },
    { ts: '10:05:22', msg: 'Admin updated stock for B-1001' },
    { ts: '10:12:45', msg: 'Automated overdue email sent to L-9000' },
    { ts: '10:15:00', msg: 'Manual inventory sync requested' }
  ]
});

// --- CORE COMPONENT ---
export default function LibrarianDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [data] = useState(generateFullData());

  // Helper to render the current view
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewPanel data={data} />;
      case 'inventory': return <DataPanel title="Master Inventory" data={data.inventory} />;
      case 'loans': return <DataPanel title="Active Loan Ledger" data={data.loans} />;
      case 'attendance': return <DataPanel title="Live Attendance Log" data={data.attendance} />;
      case 'payments': return <DataPanel title="Financial Payment Gate" data={data.payments} />;
      case 'audit': return <AuditPanel logs={data.auditLogs} />;
      default: return <OverviewPanel data={data} />;
    }
  };

  return (
    <div style={{ padding: '32px', background: COLORS.bg, minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* ... Header and StatWidgets remain same ... */}

      {/* TABS */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: `2px solid ${COLORS.border}` }}>
        {['overview', 'inventory', 'loans', 'attendance', 'payments', 'audit'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px', background: 'transparent', border: 'none',
              borderBottom: activeTab === tab ? `2px solid ${COLORS.primary}` : 'none',
              color: activeTab === tab ? COLORS.primary : COLORS.textMuted,
              fontWeight: '600', cursor: 'pointer', textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div style={{ background: COLORS.card, padding: '24px', borderRadius: '16px', border: `1px solid ${COLORS.border}` }}>
        {renderContent()}
      </div>
    </div>
  );
}
// --- SUB-COMPONENTS (SCALABLE) ---

function StatWidget({ title, val, icon }) {
  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '15px' }}>
      <div style={{ color: '#64748b' }}>{icon}</div>
      <div><p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>{title}</p><h2 style={{ margin: 0 }}>{val}</h2></div>
    </div>
  );
}
// --- SAFE DATA PANEL ---
function DataPanel({ title, data }) {
  if (!data || data.length === 0) return <div>No data available.</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>{title}</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
            {Object.keys(data[0]).map(h => <th key={h} style={{ padding: '12px', textTransform: 'capitalize', color: COLORS.textMuted }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              {Object.values(row).map((v, j) => <td key={j} style={{ padding: '12px' }}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


function AuditPanel({ logs }) {
  return (
    <div>
      <h3>System Audit Logs</h3>
      {logs.map((log, i) => <p key={i} style={{ fontFamily: 'monospace', fontSize: '14px' }}>[{log.ts}] {log.msg}</p>)}
    </div>
  );
}

function OverviewPanel({ data }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <h3>Analytics</h3>
        <p>Your library is operating at 85% capacity today.</p>
        <button style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px' }}>Run Diagnostic</button>
      </div>
      <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <h3>Urgent Actions</h3>
        <ul>
          <li>Review 3 pending membership applications</li>
          <li>Re-order stock for Science category</li>
        </ul>
      </div>
    </div>
  );
}


