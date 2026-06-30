import React, { useState, useMemo } from "react";
import {
  LayoutDashboard, BookOpen, Users, DollarSign, Clock, Bell, AlertCircle,
  FileText, Search, ShieldAlert, LogOut, CheckSquare,
  Menu, ChevronRight, TrendingUp, UserCheck, RefreshCw,
  Plus, Edit2, Trash2, X, Check, Download, Calendar, MapPin,
  AlertTriangle, CreditCard, BookMarked, UserPlus, Settings, ScanLine,
  Mail, Printer
} from "lucide-react";

/* ══════════════════════════════════════════════════
   No recharts, no external chart library. Every visual
   below is plain divs / inline SVG so this file only ever
   depends on React itself — it cannot break from a
   duplicate-React or unresolved-package issue elsewhere
   in node_modules.
══════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════
   DESIGN TOKENS
══════════════════════════════════════════════════ */
const C = {
  bg:        "#F5F6FA",
  surface:   "#FFFFFF",
  surface2:  "#FAFBFD",
  ink:       "#151A2E",
  inkSoft:   "#5B6478",
  inkFaint:  "#9AA1B5",
  border:    "#E7E9F1",
  borderSoft:"#F0F1F6",
  navyDeep:  "#0F1530",
  indigo:    "#4F5FE8",
  indigoSoft:"#EEF0FE",
  amber:     "#D98E2A",
  amberSoft: "#FBF1E0",
  green:     "#1F9D67",
  greenSoft: "#E4F7EE",
  red:       "#E0473F",
  redSoft:   "#FCEAE9",
  violet:    "#8B5CF6",
  violetSoft:"#F2EEFE",
  cyan:      "#0EA5C9",
  cyanSoft:  "#E4F7FB",
};

const PIE = [C.indigo, C.amber, C.green, C.violet, C.cyan];

/* ══════════════════════════════════════════════════
   SYNTHETIC DATA ENGINE
══════════════════════════════════════════════════ */
function genData() {
  const titles = ["Engineering Principles","Atomic Habits","Modern Physics","Data Structures","The Silk Road",
    "Calculus Essentials","Organic Chemistry","World History","Linear Algebra","Clean Code",
    "Thermodynamics","Macroeconomics","Operating Systems","Cell Biology","Discrete Mathematics",
    "Quantum Mechanics","Indian Constitution","Statistics for All","Network Security","Database Systems"];
  const authors = ["R. Mehta","A. Sharma","J. Patel","S. Iyer","K. Verma","N. Rao","D. Singh","P. Gupta","M. Das","T. Nair"];
  const categories = ["Science","Technology","History","Fiction","Mathematics","Reference","Economics","Biology"];
  const members = ["Aarav Shah","Diya Kapoor","Vihaan Joshi","Anaya Reddy","Kabir Malhotra","Ishita Rao","Reyansh Nair",
    "Myra Bose","Arjun Mehta","Sara Khan","Vivaan Pillai","Aditi Kulkarni","Yash Chawla","Riya Bhatt","Dev Saxena"];

  const inventory = Array.from({ length: 20 }, (_, i) => {
    const total = 4 + (i % 6);
    const out = Math.floor(Math.random() * (total - 1));
    return {
      id: `B-${1000 + i}`,
      title: titles[i],
      author: authors[i % authors.length],
      category: categories[i % categories.length],
      isbn: `978-${(1000000 + i * 137).toString().slice(0,9)}`,
      total, available: total - out,
      status: total - out === 0 ? "Out of Stock" : total - out <= 1 ? "Low Stock" : "Available",
      shelf: `${String.fromCharCode(65 + (i % 6))}-${(i % 12) + 1}`,
      addedDate: `2025-0${(i % 9) + 1}-1${i % 9}`,
    };
  });

  const loans = Array.from({ length: 16 }, (_, i) => {
    const overdue = i % 5 === 0;
    const dueDay = 10 + i;
    return {
      id: `L-90${i.toString().padStart(2,"0")}`,
      book: titles[(i * 3) % titles.length],
      member: members[i % members.length],
      issueDate: `2026-06-${(5 + i) % 28 + 1}`,
      dueDate: `2026-07-${(dueDay % 28) + 1}`,
      status: overdue ? "Overdue" : i % 7 === 0 ? "Due Soon" : "Active",
      fine: overdue ? (5 + Math.random() * 45).toFixed(2) : "0.00",
      daysOverdue: overdue ? Math.floor(Math.random() * 12) + 1 : 0,
    };
  });

  const attendance = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: members[i % members.length],
    memberId: `MEM-${2000 + i}`,
    entry: `0${8 + (i % 4)}:${(i * 7) % 60 < 10 ? "0" : ""}${(i * 7) % 60} AM`,
    exit: i % 3 === 0 ? `0${4 + (i % 3)}:${(i*11)%60<10?"0":""}${(i*11)%60} PM` : "—",
    status: i % 3 === 0 ? "Checked Out" : "In Library",
    slot: ["Morning (8-12)","Afternoon (12-4)","Evening (4-8)"][i % 3],
  }));

  const payments = Array.from({ length: 12 }, (_, i) => {
  const amount =
    Math.random() < 0.8
      ? 499
      : Math.floor(Math.random() * (498 - 300 + 1)) + 300;

  return {
    id: `P-100${i}`,
    member: members[i % members.length],
    amount,
    reason: [
      "Overdue Fine",
      "Membership Renewal",
      "New Membership",
      "Lost Book Fee",
      "Slot Booking Fee"
    ][i % 5],
    status: amount < 499 ? "Pending" : "Settled",
    date: `2026-06-${(i + 2) % 28 + 1}`,
    method: ["UPI", "Card", "Cash"][i % 3],
  };
});

  const memberList = members.map((m, i) => ({
    id: `MEM-${2000 + i}`,
    name: m,
    plan: ["Basic","Scholar","Premium"][i % 3],
    joined: `2025-0${(i % 9) + 1}-1${i % 9}`,
    booksOut: i % 4,
    finesDue: i % 5 === 0 ? (5 + Math.random() * 40).toFixed(2) : "0.00",
    status: i % 9 === 0 ? "Suspended" : "Active",
    email: `${m.toLowerCase().replace(" ",".")}@mail.com`,
  }));

  const reservations = Array.from({ length: 10 }, (_, i) => ({
    id: `R-${300 + i}`,
    member: members[(i * 2) % members.length],
    book: titles[(i * 5) % titles.length],
    date: `2026-07-0${(i % 9) + 1}`,
    slot: ["09:00 AM","11:00 AM","02:00 PM","04:00 PM","06:00 PM"][i % 5],
    status: i % 4 === 0 ? "Pending Confirmation" : "Confirmed",
  }));

  const auditLogs = [
    { ts: "10:00:01", msg: "System initialized successfully", type: "info" },
    { ts: "10:05:22", msg: "Admin updated stock for B-1001 (+3 copies)", type: "update" },
    { ts: "10:12:45", msg: "Automated overdue reminder sent to 4 members", type: "alert" },
    { ts: "10:15:00", msg: "Manual inventory sync requested by Priya R.", type: "info" },
    { ts: "10:22:10", msg: "Payment of ₹45.00 settled — Member MEM-2003", type: "success" },
    { ts: "10:30:55", msg: "New membership application received", type: "info" },
    { ts: "10:41:18", msg: "Book 'Quantum Mechanics' flagged Low Stock", type: "alert" },
    { ts: "10:55:02", msg: "Reservation R-305 confirmed for 04:00 PM slot", type: "success" },
  ];

  const visitTrend = [
    { day: "Mon", visits: 42, returns: 18 }, { day: "Tue", visits: 55, returns: 24 },
    { day: "Wed", visits: 38, returns: 15 }, { day: "Thu", visits: 61, returns: 28 },
    { day: "Fri", visits: 73, returns: 31 }, { day: "Sat", visits: 89, returns: 40 },
    { day: "Sun", visits: 52, returns: 22 },
  ];

  const categoryDist = categories.slice(0,5).map((c) => ({
    name: c, value: 12 + Math.floor(Math.random() * 40)
  }));

  const revenueTrend = [
    { month: "Jan", revenue: 28000 }, { month: "Feb", revenue: 31200 },
    { month: "Mar", revenue: 29800 }, { month: "Apr", revenue: 34500 },
    { month: "May", revenue: 38900 }, { month: "Jun", revenue: 41200 },
  ];

  return { inventory, loans, attendance, payments, memberList, reservations, auditLogs, visitTrend, categoryDist, revenueTrend };
}

/* ══════════════════════════════════════════════════
   SMALL UI PRIMITIVES
══════════════════════════════════════════════════ */
function StatusPill({ status }) {
  const map = {
    "Available": [C.greenSoft, C.green], "Active": [C.greenSoft, C.green], "Checked Out": [C.inkFaint+"22", C.inkSoft],
    "Settled": [C.greenSoft, C.green], "Confirmed": [C.greenSoft, C.green],
    "Low Stock": [C.amberSoft, C.amber], "Due Soon": [C.amberSoft, C.amber], "Pending": [C.amberSoft, C.amber], "Pending Confirmation": [C.amberSoft, C.amber],
    "Out of Stock": [C.redSoft, C.red], "Overdue": [C.redSoft, C.red], "Suspended": [C.redSoft, C.red],
    "In Library": [C.indigoSoft, C.indigo],
  };
  const [bg, fg] = map[status] || [C.borderSoft, C.inkSoft];
  return (
    <span style={{ background:bg, color:fg, fontSize:11.5, fontWeight:700, padding:"4px 10px", borderRadius:20, whiteSpace:"nowrap", display:"inline-flex", alignItems:"center", gap:5 }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:fg, display:"inline-block" }}/>
      {status}
    </span>
  );
}

function IconBtn({ icon: Icon, onClick, tone="default", title }) {
  const tones = { default:[C.border,C.inkSoft], danger:[C.redSoft,C.red], primary:[C.indigoSoft,C.indigo] };
  const [bg,fg] = tones[tone];
  return (
    <button title={title} onClick={onClick} style={{
      width:30, height:30, borderRadius:8, border:`1px solid ${bg}`, background:bg, color:fg,
      display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"transform .12s"
    }}
      onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
      onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
    ><Icon size={14}/></button>
  );
}

function Avatar({ name, size=34 }) {
  const initials = name.split(" ").map(p=>p[0]).slice(0,2).join("").toUpperCase();
  const hues = [C.indigo, C.amber, C.green, C.violet, C.cyan];
  const hue = hues[name.length % hues.length];
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:hue+"20", color:hue, fontWeight:700, fontSize:size*0.36,
      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      {initials}
    </div>
  );
}

function Card({ children, style }) {
  return <div style={{ background:C.surface, borderRadius:16, border:`1px solid ${C.border}`, ...style }}>{children}</div>;
}

function EmptyState({ label }) {
  return (
    <div style={{ padding:"60px 20px", textAlign:"center", color:C.inkFaint }}>
      <FileText size={32} style={{ marginBottom:10, opacity:0.5 }} />
      <div style={{ fontSize:14 }}>{label}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   DEPENDENCY-FREE CHARTS
   Plain SVG + CSS. No external library, so nothing here
   can be broken by a node_modules / version conflict.
══════════════════════════════════════════════════ */

function MiniAreaChart({ data, height = 220 }) {
  const w = 600;
  const h = height;
  const padL = 36, padB = 24, padT = 10, padR = 10;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  const maxV = Math.max(...data.map(d => Math.max(d.visits, d.returns))) * 1.15;
  const stepX = innerW / (data.length - 1);

  const pt = (val, i) => {
    const x = padL + i * stepX;
    const y = padT + innerH - (val / maxV) * innerH;
    return [x, y];
  };

  const visitsPts = data.map((d, i) => pt(d.visits, i));
  const returnsPts = data.map((d, i) => pt(d.returns, i));

  const linePath = pts => pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const areaPath = pts => `${linePath(pts)} L${pts[pts.length-1][0]},${padT+innerH} L${pts[0][0]},${padT+innerH} Z`;

  const yTicks = 4;
  const yLabels = Array.from({ length: yTicks + 1 }, (_, i) => Math.round((maxV / yTicks) * i));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: "block" }}>
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.indigo} stopOpacity="0.30" />
          <stop offset="100%" stopColor={C.indigo} stopOpacity="0" />
        </linearGradient>
      </defs>
      {yLabels.map((val, i) => {
        const y = padT + innerH - (val / maxV) * innerH;
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={w - padR} y2={y} stroke={C.borderSoft} strokeWidth="1" />
            <text x={padL - 8} y={y + 4} fontSize="10" fill={C.inkFaint} textAnchor="end">{val}</text>
          </g>
        );
      })}
      <path d={areaPath(visitsPts)} fill="url(#areaFill)" />
      <path d={linePath(visitsPts)} fill="none" stroke={C.indigo} strokeWidth="2.5" />
      <path d={linePath(returnsPts)} fill="none" stroke={C.amber} strokeWidth="2.5" />
      {visitsPts.map((p, i) => <circle key={"v"+i} cx={p[0]} cy={p[1]} r="3" fill={C.indigo} />)}
      {returnsPts.map((p, i) => <circle key={"r"+i} cx={p[0]} cy={p[1]} r="3" fill={C.amber} />)}
      {data.map((d, i) => (
        <text key={i} x={padL + i * stepX} y={h - 6} fontSize="11" fill={C.inkFaint} textAnchor="middle">{d.day}</text>
      ))}
    </svg>
  );
}

function MiniDonutChart({ data, height = 170 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const size = 160;
  const cx = size / 2, cy = size / 2;
  const rOuter = 72, rInner = 48;
  let angle = -90;

  const segments = data.map((d, i) => {
    const frac = d.value / total;
    const startAngle = angle;
    const sweep = frac * 360;
    angle += sweep;
    const endAngle = angle;

    const toXY = (r, a) => {
      const rad = (a * Math.PI) / 180;
      return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
    };

    const [x1o, y1o] = toXY(rOuter, startAngle);
    const [x2o, y2o] = toXY(rOuter, endAngle);
    const [x1i, y1i] = toXY(rInner, endAngle);
    const [x2i, y2i] = toXY(rInner, startAngle);
    const largeArc = sweep > 180 ? 1 : 0;

    const path = [
      `M${x1o},${y1o}`,
      `A${rOuter},${rOuter} 0 ${largeArc} 1 ${x2o},${y2o}`,
      `L${x1i},${y1i}`,
      `A${rInner},${rInner} 0 ${largeArc} 0 ${x2i},${y2i}`,
      "Z",
    ].join(" ");

    return { path, color: PIE[i % PIE.length] };
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", height }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        {segments.map((s, i) => <path key={i} d={s.path} fill={s.color} />)}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="18" fontWeight="800" fill={C.ink}>{total}</text>
        <text x={cx} y={cy + 13} textAnchor="middle" fontSize="10" fill={C.inkFaint}>total</text>
      </svg>
    </div>
  );
}

function MiniBarChart({ data, height = 160 }) {
  const max = Math.max(...data.map(d => d.revenue)) * 1.1;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height, paddingTop: 10 }}>
      {data.map((d, i) => {
        const barH = Math.max(6, (d.revenue / max) * (height - 28));
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 10, color: C.inkFaint }}>{Math.round(d.revenue / 1000)}k</div>
            <div style={{ width: "100%", height: barH, background: C.indigo, borderRadius: "6px 6px 0 0" }} />
            <div style={{ fontSize: 11, color: C.inkFaint }}>{d.month}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   STAT WIDGET (with trend)
══════════════════════════════════════════════════ */
function StatWidget({ title, val, sub, icon: Icon, tone, trend }) {
  const tones = {
    indigo:[C.indigoSoft,C.indigo], amber:[C.amberSoft,C.amber], green:[C.greenSoft,C.green],
    red:[C.redSoft,C.red], violet:[C.violetSoft,C.violet], cyan:[C.cyanSoft,C.cyan],
  };
  const [bg, fg] = tones[tone] || tones.indigo;
  const up = trend >= 0;
  return (
    <Card style={{ padding:"20px 20px 18px", position:"relative", overflow:"hidden" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div style={{ width:40, height:40, borderRadius:11, background:bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon size={19} color={fg} />
        </div>
        {trend !== undefined && (
          <div style={{ display:"flex", alignItems:"center", gap:3, fontSize:12, fontWeight:700, color: up ? C.green : C.red }}>
            {up ? "▲" : "▼"} {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div style={{ fontSize:26, fontWeight:800, color:C.ink, marginTop:14 }}>{val}</div>
      <div style={{ fontSize:12.5, color:C.inkSoft, marginTop:3, fontWeight:500 }}>{title}</div>
      {sub && <div style={{ fontSize:11, color:C.inkFaint, marginTop:6 }}>{sub}</div>}
    </Card>
  );
}

/* ══════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════ */
function Sidebar({ active, setActive, collapsed, setCollapsed, alerts }) {
  const items = [
    { key:"overview",   label:"Overview",     icon:LayoutDashboard },
    { key:"inventory",  label:"Inventory",    icon:BookOpen },
    { key:"loans",      label:"Loans & Returns", icon:RefreshCw, badge: alerts.overdue },
    // { key:"reservations",label:"Reservations", icon:Calendar },
    { key:"members",    label:"Members",      icon:Users },
    { key:"attendance", label:"Attendance",   icon:UserCheck },
    { key:"payments",   label:"Payments",     icon:DollarSign, badge: alerts.pending },
    { key:"audit",      label:"Audit Log",    icon:ShieldAlert },
  ];
  return (
    <div style={{
      width: collapsed ? 76 : 240, transition:"width .2s",
      background:C.navyDeep, minHeight:"100vh", padding:"20px 14px",
      display:"flex", flexDirection:"column", flexShrink:0,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 6px 26px", justifyContent: collapsed ? "center" : "flex-start" }}>
        <div style={{ width:34, height:34, borderRadius:9, background:C.indigo, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <BookOpen size={17} color="#fff" />
        </div>
        {!collapsed && (
          <div>
            <div style={{ color:"#fff", fontWeight:800, fontSize:15 }}>ATHENA</div>
            <div style={{ color:C.indigo, fontSize:9.5, fontWeight:700, letterSpacing:1.5 }}>STAFF CONSOLE</div>
          </div>
        )}
      </div>

      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:3 }}>
        {items.map(it => {
          const isActive = active === it.key;
          return (
            <button key={it.key} onClick={() => setActive(it.key)} title={it.label} style={{
              display:"flex", alignItems:"center", gap:12,
              padding: collapsed ? "11px 0" : "11px 13px",
              justifyContent: collapsed ? "center" : "flex-start",
              borderRadius:10, border:"none", cursor:"pointer",
              background: isActive ? "rgba(79,95,232,0.16)" : "transparent",
              color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
              fontSize:13.5, fontWeight: isActive ? 700 : 500,
              position:"relative", transition:"all .15s", textAlign:"left",
            }}>
              {isActive && <span style={{ position:"absolute", left:-14, top:"50%", transform:"translateY(-50%)", width:3, height:18, background:C.indigo, borderRadius:3 }}/>}
              <it.icon size={17} style={{ flexShrink:0 }}/>
              {!collapsed && <span style={{ flex:1 }}>{it.label}</span>}
              {!collapsed && it.badge > 0 && (
                <span style={{ background:C.red, color:"#fff", fontSize:10, fontWeight:700, padding:"1px 7px", borderRadius:10 }}>{it.badge}</span>
              )}
              {collapsed && it.badge > 0 && (
                <span style={{ position:"absolute", top:6, right:14, width:7, height:7, borderRadius:"50%", background:C.red }}/>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:14, display:"flex", flexDirection:"column", gap:3 }}>
        <button onClick={() => setCollapsed(!collapsed)} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 13px", justifyContent: collapsed?"center":"flex-start", borderRadius:10, border:"none", cursor:"pointer", background:"transparent", color:"rgba(255,255,255,0.5)", fontSize:13 }}>
          <Menu size={16} />{!collapsed && "Collapse"}
        </button>
        <button style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 13px", justifyContent: collapsed?"center":"flex-start", borderRadius:10, border:"none", cursor:"pointer", background:"transparent", color:"rgba(255,255,255,0.5)", fontSize:13 }}>
          <LogOut size={16} />{!collapsed && "Sign Out"}
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   TOPBAR
══════════════════════════════════════════════════ */
function Topbar({ title, subtitle, onSearch, query, notifCount }) {
  const [openNotif, setOpenNotif] = useState(false);
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:26, gap:20 }}>
      <div>
        <h1 style={{ fontWeight:800, fontSize:23, color:C.ink, margin:0 }}>{title}</h1>
        {subtitle && <p style={{ color:C.inkSoft, fontSize:13, margin:"4px 0 0" }}>{subtitle}</p>}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:"9px 14px", width:260 }}>
          <Search size={15} color={C.inkFaint} />
          <input value={query} onChange={e => onSearch(e.target.value)} placeholder="Search books, members, IDs…"
            style={{ border:"none", outline:"none", fontSize:13, flex:1, background:"transparent", color:C.ink, fontFamily:"inherit" }} />
        </div>
        <div style={{ position:"relative" }}>
          <button onClick={() => setOpenNotif(!openNotif)} style={{ width:38, height:38, borderRadius:10, background:C.surface, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", position:"relative" }}>
            <Bell size={16} color={C.inkSoft} />
            {notifCount > 0 && <span style={{ position:"absolute", top:6, right:7, width:8, height:8, borderRadius:"50%", background:C.red, border:"2px solid #fff" }}/>}
          </button>
          {openNotif && (
            <div style={{ position:"absolute", right:0, top:46, width:300, background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, boxShadow:"0 16px 40px rgba(0,0,0,0.12)", padding:10, zIndex:50 }}>
              <div style={{ fontWeight:700, fontSize:13, padding:"4px 8px 10px", color:C.ink }}>Notifications</div>
              {["4 books overdue — fines accruing","3 membership applications pending review","Low stock: Quantum Mechanics (1 left)","Reservation R-305 awaiting confirmation"].map((n,i)=>(
                <div key={i} style={{ display:"flex", gap:9, padding:"9px 8px", borderRadius:8, fontSize:12.5, color:C.inkSoft }}>
                  <AlertCircle size={14} color={C.amber} style={{ flexShrink:0, marginTop:1 }}/>{n}
                </div>
              ))}
            </div>
          )}
        </div>
        <button style={{ width:38, height:38, borderRadius:10, background:C.surface, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
          <Settings size={16} color={C.inkSoft} />
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:9, paddingLeft:6 }}>
          <Avatar name="Priya Ramesh" size={36} />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   OVERVIEW PANEL
══════════════════════════════════════════════════ */
function OverviewPanel({ data, setActive }) {
  const overdueCount = data.loans.filter(l => l.status === "Overdue").length;
  const inLibrary = data.attendance.filter(a => a.status === "In Library").length;
  const totalBooks = data.inventory.reduce((s,b) => s + b.total, 0);
  const pendingPayments = data.payments.filter(p => p.status === "Pending").length;
  const lowStock = data.inventory.filter(b => b.status !== "Available");

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:16, marginBottom:22 }}>
        <StatWidget title="Total Books" val={totalBooks} sub={`${data.inventory.length} titles`} icon={BookOpen} tone="indigo" trend={4.2} />
        <StatWidget title="Active Loans" val={data.loans.filter(l=>l.status!=="Overdue").length} sub="currently checked out" icon={BookMarked} tone="cyan" trend={2.1} />
        <StatWidget title="Overdue" val={overdueCount} sub="require follow-up" icon={AlertTriangle} tone="red" trend={-3.4} />
        <StatWidget title="In Library Now" val={inLibrary} sub="checked in today" icon={UserCheck} tone="green" trend={8.7} />
        <StatWidget title="Pending Payments" val={pendingPayments} sub="awaiting settlement" icon={CreditCard} tone="amber" trend={-1.2} />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr", gap:18, marginBottom:18 }}>
        <Card style={{ padding:"22px 22px 12px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:15, color:C.ink }}>Weekly Footfall</div>
              <div style={{ fontSize:12, color:C.inkFaint, marginTop:2 }}>Visits vs. returns processed</div>
            </div>
            <div style={{ display:"flex", gap:14, fontSize:12 }}>
              <span style={{ display:"flex", alignItems:"center", gap:5, color:C.inkSoft }}><span style={{width:8,height:8,borderRadius:2,background:C.indigo,display:"inline-block"}}/>Visits</span>
              <span style={{ display:"flex", alignItems:"center", gap:5, color:C.inkSoft }}><span style={{width:8,height:8,borderRadius:2,background:C.amber,display:"inline-block"}}/>Returns</span>
            </div>
          </div>
          <MiniAreaChart data={data.visitTrend} height={220} />
        </Card>

        <Card style={{ padding:"22px" }}>
          <div style={{ fontWeight:700, fontSize:15, color:C.ink, marginBottom:4 }}>Collection by Category</div>
          <div style={{ fontSize:12, color:C.inkFaint, marginBottom:8 }}>Share of total inventory</div>
          <MiniDonutChart data={data.categoryDist} height={170} />
          <div style={{ display:"flex", flexDirection:"column", gap:7, marginTop:4 }}>
            {data.categoryDist.map((c,i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.inkSoft }}>
                <span style={{ display:"flex", alignItems:"center", gap:7 }}><span style={{ width:8,height:8,borderRadius:2,background:PIE[i%PIE.length],display:"inline-block" }}/>{c.name}</span>
                <strong style={{ color:C.ink }}>{c.value}</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        <Card style={{ padding:"22px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div style={{ fontWeight:700, fontSize:15, color:C.ink }}>Urgent Actions</div>
            <span style={{ background:C.redSoft, color:C.red, fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:20 }}>{overdueCount + pendingPayments + lowStock.length} items</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <ActionRow icon={AlertTriangle} tone="red" label={`${overdueCount} overdue loans need follow-up`} cta="Review" onClick={() => setActive("loans")} />
            <ActionRow icon={CreditCard} tone="amber" label={`${pendingPayments} payments pending settlement`} cta="Review" onClick={() => setActive("payments")} />
            <ActionRow icon={BookOpen} tone="violet" label={`${lowStock.length} titles low or out of stock`} cta="Restock" onClick={() => setActive("inventory")} />
            <ActionRow icon={UserPlus} tone="cyan" label="3 new membership applications" cta="Review" onClick={() => setActive("members")} />
          </div>
        </Card>

        <Card style={{ padding:"22px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
            <div style={{ fontWeight:700, fontSize:15, color:C.ink }}>Revenue Trend</div>
            <span style={{ fontSize:12, color:C.green, fontWeight:700, display:"flex", alignItems:"center", gap:3 }}><TrendingUp size={13}/> +12.4%</span>
          </div>
          <div style={{ fontSize:12, color:C.inkFaint, marginBottom:14 }}>Fines, memberships & slot fees (₹)</div>
          <MiniBarChart data={data.revenueTrend} height={160} />
        </Card>
      </div>
    </div>
  );
}

function ActionRow({ icon: Icon, tone, label, cta, onClick }) {
  const tones = { red:[C.redSoft,C.red], amber:[C.amberSoft,C.amber], violet:[C.violetSoft,C.violet], cyan:[C.cyanSoft,C.cyan] };
  const [bg,fg] = tones[tone];
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 12px", borderRadius:11, background:C.surface2, border:`1px solid ${C.borderSoft}` }}>
      <div style={{ width:32, height:32, borderRadius:9, background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <Icon size={15} color={fg} />
      </div>
      <div style={{ flex:1, fontSize:13, color:C.ink, fontWeight:500 }}>{label}</div>
      <button onClick={onClick} style={{ background:"none", border:"none", color:C.indigo, fontWeight:700, fontSize:12.5, cursor:"pointer", display:"flex", alignItems:"center", gap:2 }}>
        {cta}<ChevronRight size={13}/>
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   GENERIC TOOLBAR (search result count + actions)
══════════════════════════════════════════════════ */
function PanelHeader({ title, count, primaryLabel, onPrimary, extra }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
      <div>
        <div style={{ fontWeight:700, fontSize:17, color:C.ink }}>{title}</div>
        <div style={{ fontSize:12.5, color:C.inkFaint, marginTop:2 }}>{count} records</div>
      </div>
      <div style={{ display:"flex", gap:9 }}>
        {extra}
        <button style={{ display:"flex", alignItems:"center", gap:6, background:C.surface, border:`1px solid ${C.border}`, color:C.inkSoft, padding:"9px 14px", borderRadius:9, fontSize:12.5, fontWeight:600, cursor:"pointer" }}>
          <Download size={14}/> Export
        </button>
        {onPrimary && (
          <button onClick={onPrimary} style={{ display:"flex", alignItems:"center", gap:6, background:C.indigo, border:"none", color:"#fff", padding:"9px 16px", borderRadius:9, fontSize:12.5, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 14px rgba(79,95,232,0.32)" }}>
            <Plus size={14}/> {primaryLabel}
          </button>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   INVENTORY PANEL
══════════════════════════════════════════════════ */
function InventoryPanel({ data, query }) {
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...new Set(data.inventory.map(b => b.category))];
  const rows = data.inventory
    .filter(b => filter === "All" || b.category === filter)
    .filter(b => !query || b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase()) || b.id.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PanelHeader title="Master Inventory" count={rows.length} primaryLabel="Add Book"
        extra={<button style={{ display:"flex", alignItems:"center", gap:6, background:C.surface, border:`1px solid ${C.border}`, color:C.inkSoft, padding:"9px 14px", borderRadius:9, fontSize:12.5, fontWeight:600, cursor:"pointer" }}><ScanLine size={14}/>Scan ISBN</button>}
      />
      <div style={{ display:"flex", gap:7, marginBottom:16, flexWrap:"wrap" }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:600, cursor:"pointer",
            border:`1px solid ${filter===c ? C.indigo : C.border}`,
            background: filter===c ? C.indigo : C.surface, color: filter===c ? "#fff" : C.inkSoft,
          }}>{c}</button>
        ))}
      </div>
      <Card style={{ overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:C.surface2, textAlign:"left" }}>
              {["Book","Category","Shelf","Stock","Status","Added",""].map(h => (
                <th key={h} style={{ padding:"13px 16px", fontSize:11.5, fontWeight:700, color:C.inkFaint, textTransform:"uppercase", letterSpacing:0.6, borderBottom:`1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={7}><EmptyState label="No books match your search." /></td></tr>}
            {rows.map((b,i) => (
              <tr key={i} style={{ borderBottom:`1px solid ${C.borderSoft}` }}>
                <td style={{ padding:"13px 16px" }}>
                  <div style={{ fontWeight:700, fontSize:13.5, color:C.ink }}>{b.title}</div>
                  <div style={{ fontSize:11.5, color:C.inkFaint, marginTop:2 }}>{b.author} · {b.id}</div>
                </td>
                <td style={{ padding:"13px 16px", fontSize:13, color:C.inkSoft }}>{b.category}</td>
                <td style={{ padding:"13px 16px", fontSize:13, color:C.inkSoft }}><span style={{ display:"flex", alignItems:"center", gap:5 }}><MapPin size={12}/>{b.shelf}</span></td>
                <td style={{ padding:"13px 16px", fontSize:13, color:C.ink, fontWeight:600 }}>{b.available}/{b.total}</td>
                <td style={{ padding:"13px 16px" }}><StatusPill status={b.status} /></td>
                <td style={{ padding:"13px 16px", fontSize:12.5, color:C.inkFaint }}>{b.addedDate}</td>
                <td style={{ padding:"13px 16px" }}>
                  <div style={{ display:"flex", gap:6 }}>
                    <IconBtn icon={Edit2} tone="default" title="Edit" />
                    <IconBtn icon={Trash2} tone="danger" title="Remove" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   LOANS PANEL
══════════════════════════════════════════════════ */
function LoansPanel({ data, query }) {
  const [tab, setTab] = useState("All");
  const tabs = ["All","Active","Due Soon","Overdue"];
  const rows = data.loans
    .filter(l => tab === "All" || l.status === tab)
    .filter(l => !query || l.member.toLowerCase().includes(query.toLowerCase()) || l.book.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PanelHeader title="Loans & Returns" count={rows.length} primaryLabel="Issue Book" />
      <div style={{ display:"flex", gap:7, marginBottom:16 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding:"7px 16px", borderRadius:20, fontSize:12.5, fontWeight:700, cursor:"pointer",
            border:`1px solid ${tab===t ? C.indigo : C.border}`,
            background: tab===t ? C.indigo : C.surface, color: tab===t ? "#fff" : C.inkSoft,
          }}>{t}</button>
        ))}
      </div>
      <Card style={{ overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:C.surface2, textAlign:"left" }}>
              {["Loan ID","Book","Member","Issued","Due","Fine","Status",""].map(h => (
                <th key={h} style={{ padding:"13px 16px", fontSize:11.5, fontWeight:700, color:C.inkFaint, textTransform:"uppercase", letterSpacing:0.6, borderBottom:`1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={8}><EmptyState label="No loans in this view." /></td></tr>}
            {rows.map((l,i) => (
              <tr key={i} style={{ borderBottom:`1px solid ${C.borderSoft}`, background: l.status==="Overdue" ? C.redSoft+"55" : "transparent" }}>
                <td style={{ padding:"13px 16px", fontSize:12.5, color:C.inkFaint, fontFamily:"monospace" }}>{l.id}</td>
                <td style={{ padding:"13px 16px", fontSize:13, fontWeight:600, color:C.ink }}>{l.book}</td>
                <td style={{ padding:"13px 16px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <Avatar name={l.member} size={26} /><span style={{ fontSize:13, color:C.inkSoft }}>{l.member}</span>
                  </div>
                </td>
                <td style={{ padding:"13px 16px", fontSize:12.5, color:C.inkFaint }}>{l.issueDate}</td>
                <td style={{ padding:"13px 16px", fontSize:12.5, color: l.status==="Overdue" ? C.red : C.inkFaint, fontWeight: l.status==="Overdue" ? 700 : 400 }}>
                  {l.dueDate} {l.status==="Overdue" && `(${l.daysOverdue}d late)`}
                </td>
                <td style={{ padding:"13px 16px", fontSize:13, fontWeight:700, color: l.fine !== "0.00" ? C.red : C.inkFaint }}>{l.fine !== "0.00" ? `₹${l.fine}` : "—"}</td>
                <td style={{ padding:"13px 16px" }}><StatusPill status={l.status} /></td>
                <td style={{ padding:"13px 16px" }}>
                  <div style={{ display:"flex", gap:6 }}>
                    <IconBtn icon={CheckSquare} tone="primary" title="Mark Returned" />
                    <IconBtn icon={Mail} tone="default" title="Send Reminder" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// /* ══════════════════════════════════════════════════
//    RESERVATIONS PANEL
// ══════════════════════════════════════════════════ */
// function ReservationsPanel({ data, query }) {
//   const rows = data.reservations.filter(r => !query || r.member.toLowerCase().includes(query.toLowerCase()) || r.book.toLowerCase().includes(query.toLowerCase()));
//   const slots = ["09:00 AM","11:00 AM","02:00 PM","04:00 PM","06:00 PM"];
//   return (
//     <div>
//       <PanelHeader title="Time Slot Reservations" count={rows.length} primaryLabel="New Reservation" />
//       <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:12, marginBottom:20 }}>
//         {slots.map((s,i) => {
//           const count = data.reservations.filter(r => r.slot === s).length;
//           return (
//             <Card key={i} style={{ padding:"14px 16px", textAlign:"center" }}>
//               <Clock size={15} color={C.indigo} style={{ marginBottom:6 }}/>
//               <div style={{ fontSize:12.5, fontWeight:700, color:C.ink }}>{s}</div>
//               <div style={{ fontSize:11, color:C.inkFaint, marginTop:3 }}>{count} booked</div>
//             </Card>
//           );
//         })}
//       </div>
//       <Card style={{ overflow:"hidden" }}>
//         <table style={{ width:"100%", borderCollapse:"collapse" }}>
//           <thead>
//             <tr style={{ background:C.surface2, textAlign:"left" }}>
//               {["Reservation","Member","Book","Date","Slot","Status",""].map(h => (
//                 <th key={h} style={{ padding:"13px 16px", fontSize:11.5, fontWeight:700, color:C.inkFaint, textTransform:"uppercase", letterSpacing:0.6, borderBottom:`1px solid ${C.border}` }}>{h}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((r,i) => (
//               <tr key={i} style={{ borderBottom:`1px solid ${C.borderSoft}` }}>
//                 <td style={{ padding:"13px 16px", fontSize:12.5, color:C.inkFaint, fontFamily:"monospace" }}>{r.id}</td>
//                 <td style={{ padding:"13px 16px" }}>
//                   <div style={{ display:"flex", alignItems:"center", gap:8 }}><Avatar name={r.member} size={26}/><span style={{ fontSize:13, color:C.inkSoft }}>{r.member}</span></div>
//                 </td>
//                 <td style={{ padding:"13px 16px", fontSize:13, fontWeight:600, color:C.ink }}>{r.book}</td>
//                 <td style={{ padding:"13px 16px", fontSize:12.5, color:C.inkFaint }}>{r.date}</td>
//                 <td style={{ padding:"13px 16px", fontSize:12.5, color:C.ink, fontWeight:600 }}>{r.slot}</td>
//                 <td style={{ padding:"13px 16px" }}><StatusPill status={r.status} /></td>
//                 <td style={{ padding:"13px 16px" }}>
//                   <div style={{ display:"flex", gap:6 }}>
//                     <IconBtn icon={Check} tone="primary" title="Confirm" />
//                     <IconBtn icon={X} tone="danger" title="Cancel" />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Card>
//     </div>
//   );
// }

/* ══════════════════════════════════════════════════
   MEMBERS PANEL
══════════════════════════════════════════════════ */
function MembersPanel({ data, query }) {
  const rows = data.memberList.filter(m => !query || m.name.toLowerCase().includes(query.toLowerCase()) || m.id.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <PanelHeader title="Member Directory" count={rows.length} primaryLabel="Add Member" />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:14 }}>
        {rows.map((m,i) => (
          <Card key={i} style={{ padding:"18px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div style={{ display:"flex", gap:11, alignItems:"center" }}>
                <Avatar name={m.name} size={42} />
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:C.ink }}>{m.name}</div>
                  <div style={{ fontSize:11.5, color:C.inkFaint }}>{m.id}</div>
                </div>
              </div>
              <StatusPill status={m.status} />
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:12 }}>
              <span style={{ background:C.indigoSoft, color:C.indigo, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 }}>{m.plan}</span>
              <span style={{ fontSize:11.5, color:C.inkFaint, alignSelf:"center" }}>Joined {m.joined}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", borderTop:`1px solid ${C.borderSoft}`, paddingTop:12 }}>
              <div>
                <div style={{ fontSize:10.5, color:C.inkFaint, textTransform:"uppercase", letterSpacing:0.6 }}>Books Out</div>
                <div style={{ fontWeight:700, fontSize:14, color:C.ink, marginTop:2 }}>{m.booksOut}</div>
              </div>
              <div>
                <div style={{ fontSize:10.5, color:C.inkFaint, textTransform:"uppercase", letterSpacing:0.6 }}>Fines Due</div>
                <div style={{ fontWeight:700, fontSize:14, color: m.finesDue !== "0.00" ? C.red : C.ink, marginTop:2 }}>{m.finesDue !== "0.00" ? `₹${m.finesDue}` : "₹0"}</div>
              </div>
              <button style={{ alignSelf:"center", background:"none", border:`1px solid ${C.border}`, borderRadius:8, padding:"6px 12px", fontSize:11.5, fontWeight:600, color:C.inkSoft, cursor:"pointer" }}>Profile</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ATTENDANCE PANEL
══════════════════════════════════════════════════ */
function AttendancePanel({ data, query }) {
  const rows = data.attendance.filter(a => !query || a.name.toLowerCase().includes(query.toLowerCase()));
  const inLib = data.attendance.filter(a => a.status === "In Library").length;
  return (
    <div>
      <PanelHeader title="Live Attendance Log" count={rows.length} primaryLabel="Check In Member" />
      <div style={{ display:"flex", gap:14, marginBottom:18 }}>
        <Card style={{ padding:"16px 22px", flex:1, display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:42, height:42, borderRadius:11, background:C.greenSoft, display:"flex", alignItems:"center", justifyContent:"center" }}><UserCheck size={19} color={C.green}/></div>
          <div><div style={{ fontWeight:800, fontSize:20, color:C.ink }}>{inLib}</div><div style={{ fontSize:12, color:C.inkFaint }}>Currently in library</div></div>
        </Card>
        <Card style={{ padding:"16px 22px", flex:1, display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:42, height:42, borderRadius:11, background:C.indigoSoft, display:"flex", alignItems:"center", justifyContent:"center" }}><Clock size={19} color={C.indigo}/></div>
          <div><div style={{ fontWeight:800, fontSize:20, color:C.ink }}>{data.attendance.length}</div><div style={{ fontSize:12, color:C.inkFaint }}>Total visits today</div></div>
        </Card>
      </div>
      <Card style={{ overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:C.surface2, textAlign:"left" }}>
              {["Member","Member ID","Entry","Exit","Slot","Status"].map(h => (
                <th key={h} style={{ padding:"13px 16px", fontSize:11.5, fontWeight:700, color:C.inkFaint, textTransform:"uppercase", letterSpacing:0.6, borderBottom:`1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((a,i) => (
              <tr key={i} style={{ borderBottom:`1px solid ${C.borderSoft}` }}>
                <td style={{ padding:"13px 16px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}><Avatar name={a.name} size={26}/><span style={{ fontSize:13, fontWeight:600, color:C.ink }}>{a.name}</span></div>
                </td>
                <td style={{ padding:"13px 16px", fontSize:12.5, color:C.inkFaint, fontFamily:"monospace" }}>{a.memberId}</td>
                <td style={{ padding:"13px 16px", fontSize:13, color:C.inkSoft }}>{a.entry}</td>
                <td style={{ padding:"13px 16px", fontSize:13, color:C.inkSoft }}>{a.exit}</td>
                <td style={{ padding:"13px 16px", fontSize:12.5, color:C.inkFaint }}>{a.slot}</td>
                <td style={{ padding:"13px 16px" }}><StatusPill status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PAYMENTS PANEL
══════════════════════════════════════════════════ */
function PaymentsPanel({ data, query }) {
  const rows = data.payments.filter(p => !query || p.member.toLowerCase().includes(query.toLowerCase()));
  const totalSettled = data.payments.filter(p=>p.status==="Settled").reduce((s,p)=>s+parseFloat(p.amount),0);
  const totalPending = data.payments.filter(p=>p.status==="Pending").reduce((s,p)=>s+parseFloat(p.amount),0);
  return (
    <div>
      <PanelHeader title="Financial Payment Gate" count={rows.length} primaryLabel="Record Payment" />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:18 }}>
        <Card style={{ padding:"18px 20px" }}>
          <div style={{ fontSize:11.5, color:C.inkFaint, fontWeight:600, textTransform:"uppercase", letterSpacing:0.6 }}>Settled This Month</div>
          <div style={{ fontWeight:800, fontSize:24, color:C.green, marginTop:8 }}>₹{totalSettled.toFixed(2)}</div>
        </Card>
        <Card style={{ padding:"18px 20px" }}>
          <div style={{ fontSize:11.5, color:C.inkFaint, fontWeight:600, textTransform:"uppercase", letterSpacing:0.6 }}>Pending Collection</div>
          <div style={{ fontWeight:800, fontSize:24, color:C.amber, marginTop:8 }}>₹{totalPending.toFixed(2)}</div>
        </Card>
        <Card style={{ padding:"18px 20px" }}>
          <div style={{ fontSize:11.5, color:C.inkFaint, fontWeight:600, textTransform:"uppercase", letterSpacing:0.6 }}>Transactions</div>
          <div style={{ fontWeight:800, fontSize:24, color:C.ink, marginTop:8 }}>{data.payments.length}</div>
        </Card>
      </div>
      <Card style={{ overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:C.surface2, textAlign:"left" }}>
              {["Txn ID","Member","Reason","Method","Date","Amount","Status",""].map(h => (
                <th key={h} style={{ padding:"13px 16px", fontSize:11.5, fontWeight:700, color:C.inkFaint, textTransform:"uppercase", letterSpacing:0.6, borderBottom:`1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((p,i) => (
              <tr key={i} style={{ borderBottom:`1px solid ${C.borderSoft}` }}>
                <td style={{ padding:"13px 16px", fontSize:12.5, color:C.inkFaint, fontFamily:"monospace" }}>{p.id}</td>
                <td style={{ padding:"13px 16px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}><Avatar name={p.member} size={26}/><span style={{ fontSize:13, color:C.inkSoft }}>{p.member}</span></div>
                </td>
                <td style={{ padding:"13px 16px", fontSize:13, color:C.ink }}>{p.reason}</td>
                <td style={{ padding:"13px 16px", fontSize:12.5, color:C.inkFaint }}>{p.method}</td>
                <td style={{ padding:"13px 16px", fontSize:12.5, color:C.inkFaint }}>{p.date}</td>
                <td style={{ padding:"13px 16px", fontSize:13.5, fontWeight:700, color:C.ink }}>₹{p.amount}</td>
                <td style={{ padding:"13px 16px" }}><StatusPill status={p.status} /></td>
                <td style={{ padding:"13px 16px" }}>
                  <div style={{ display:"flex", gap:6 }}>
                    <IconBtn icon={Printer} tone="default" title="Receipt" />
                    {p.status === "Pending" && <IconBtn icon={Check} tone="primary" title="Mark Settled" />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   AUDIT PANEL
══════════════════════════════════════════════════ */
function AuditPanel({ logs }) {
  const tones = { info:[C.indigoSoft,C.indigo], update:[C.cyanSoft,C.cyan], alert:[C.amberSoft,C.amber], success:[C.greenSoft,C.green] };
  return (
    <div>
      <PanelHeader title="System Audit Log" count={logs.length} />
      <Card style={{ padding:"8px 0" }}>
        {logs.map((log,i) => {
          const [bg,fg] = tones[log.type] || tones.info;
          return (
            <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", padding:"14px 22px", borderBottom: i < logs.length-1 ? `1px solid ${C.borderSoft}` : "none" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:fg, marginTop:6, flexShrink:0 }}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, color:C.ink }}>{log.msg}</div>
                <div style={{ fontSize:11.5, color:C.inkFaint, marginTop:3, fontFamily:"monospace" }}>{log.ts}</div>
              </div>
              <span style={{ background:bg, color:fg, fontSize:10.5, fontWeight:700, padding:"3px 9px", borderRadius:20, textTransform:"capitalize" }}>{log.type}</span>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ERROR BOUNDARY — last line of defense.
   Even though every chart above is plain React/SVG and
   should never throw, this still wraps the whole
   dashboard so that ANY unexpected error in any panel
   shows a recoverable message instead of a blank white
   page with only a console error.
══════════════════════════════════════════════════ */
class DashboardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("LibrarianDashboard crashed:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
          <div style={{ maxWidth: 480, textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.ink, marginBottom: 8 }}>
              The dashboard hit an unexpected error
            </div>
            <div style={{ fontSize: 13.5, color: C.inkSoft, marginBottom: 16 }}>
              {String(this.state.error && this.state.error.message ? this.state.error.message : this.state.error)}
            </div>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{ background: C.indigo, color: "#fff", border: "none", padding: "10px 20px", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ══════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════ */
function LibrarianDashboardInner() {
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const [data] = useState(genData);

  const alerts = useMemo(() => ({
    overdue: data.loans.filter(l => l.status === "Overdue").length,
    pending: data.payments.filter(p => p.status === "Pending").length,
  }), [data]);

  const titles = {
    overview:     ["Welcome back, Priya", "Here's what's happening in the library today"],
    inventory:    ["Master Inventory", "Manage your full book collection and stock levels"],
    loans:        ["Loans & Returns", "Track active loans, due dates, and overdue fines"],
    // reservations: ["Time Slot Reservations", "Manage student reading slot bookings"],
    members:      ["Member Directory", "View and manage library member accounts"],
    attendance:   ["Live Attendance", "Real-time check-in and check-out tracking"],
    payments:     ["Financial Payment Gate", "Track fines, memberships, and settlements"],
    audit:        ["System Audit Log", "Full activity trail for accountability"],
  };

  const renderContent = () => {
    switch (active) {
      case "overview":     return <OverviewPanel data={data} setActive={setActive} />;
      case "inventory":    return <InventoryPanel data={data} query={query} />;
      case "loans":        return <LoansPanel data={data} query={query} />;
      // case "reservations": return <ReservationsPanel data={data} query={query} />;
      case "members":      return <MembersPanel data={data} query={query} />;
      case "attendance":   return <AttendancePanel data={data} query={query} />;
      case "payments":     return <PaymentsPanel data={data} query={query} />;
      case "audit":        return <AuditPanel logs={data.auditLogs} />;
      default:              return <OverviewPanel data={data} setActive={setActive} />;
    }
  };

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:C.bg, fontFamily:"'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        table{font-family:'Inter',system-ui,sans-serif;}
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-thumb{background:#c7cbe0;border-radius:3px;}
      `}</style>

      <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} alerts={alerts} />

      <div style={{ flex:1, padding:"26px 32px", minWidth:0 }}>
        <Topbar title={titles[active][0]} subtitle={titles[active][1]} query={query} onSearch={setQuery} notifCount={alerts.overdue + alerts.pending} />
        {renderContent()}
      </div>
    </div>
  );
}

export default function LibrarianDashboard() {
  return (
    <DashboardErrorBoundary>
      <LibrarianDashboardInner />
    </DashboardErrorBoundary>
  );
}