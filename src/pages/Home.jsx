import React, { useState, useEffect } from 'react';

export default function Home({ navigateTo }) {
  /* ---------------- FAQ STATE ---------------- */
  const [openFAQ, setOpenFAQ] = useState(null);

  /* ---------------- TESTIMONIAL AUTO SLIDE ---------------- */
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX(prev => (prev > -1000 ? prev - 1 : 0));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- DATA ---------------- */
  const features = [
    { 
      title: "Real-time Analytics", 
      desc: "Live dashboard tracking of library occupancy and usage.",
      color: "#22c55e", // Green
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    },
    { 
      title: "Secure Access", 
      desc: "Advanced identity management for all library resources.",
      color: "#3b82f6", // Blue
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    },
    { 
      title: "Spatial Booking", 
      desc: "Seamless reservation system for private study zones.",
      color: "#a855f7", // Purple
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    },
    { 
      title: "Smart Catalog", 
      desc: "AI-driven discovery engine for deep research.",
      color: "#f97316", // Orange
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    },
    { 
      title: "Member Perks", 
      desc: "Customized reading plans and exclusive content access.",
      color: "#ec4899", // Pink
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    },
    { 
      title: "Global Search", 
      desc: "Federated search across physical and digital archives.",
      color: "#06b6d4", // Cyan
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    }
  ];

  const facilities = [
    { name: "Fully Air Conditioned", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=500&q=80" },
    { name: "Personal Sitting Chairs", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=80" },
    { name: "High-Speed WiFi", img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=500&q=80" },
    { name: "Student Friendly", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80" },
    { name: "Chilled Water Facility", img: "https://images.unsplash.com/photo-1544474651-789a62df8a9a?auto=format&fit=crop&w=500&q=80" }
  ];

  const testimonials = Array(6).fill({
    name: "Dr. Sarah Chen",
    role: "Head of Research",
    comment: "ATHENA transformed our library operations. The spatial system is a game-changer.",
  });

  const faqs = [
    { q: "How do I reserve a room?", a: "Use the spatial booking section to view the live floor plan and select your preferred time slot." },
    { q: "What is the borrowing limit?", a: "Premium members can borrow up to 5 physical books for 14 days, alongside unlimited digital access." },
    { q: "Do you provide digital access?", a: "Yes, our digital archives are securely available immediately after institutional login." },
    { q: "What happens if I return a book late?", a: "Late returns accrue a small daily fee, which can be paid directly through your online member portal." },
    { q: "Can non-members access the spatial booking system?", a: "Currently, spatial bookings are reserved for registered members to ensure fair access and security." },
    { q: "How does the AI-driven Smart Catalog work?", a: "Our Smart Catalog uses natural language processing to understand your research topics and suggest highly relevant cross-disciplinary materials." }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 24px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Dynamic styles for hover effects and animations */}
      <style>{`
        .faq-btn {
          transition: background-color 0.2s ease;
        }
        .faq-btn:hover {
          background-color: #f8fafc !important;
        }
        
        /* Facility Cards */
        .facility-card {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: #fff;
          cursor: pointer;
        }
        .facility-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .facility-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .facility-card:hover .facility-img {
          transform: scale(1.08);
        }
        .facility-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent);
          padding: 30px 20px 15px 20px;
          color: white;
          font-weight: 600;
          font-size: 18px;
        }

        /* NEW: Feature Cards Styling */
        .feature-card {
          padding: 32px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #fff;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1;
        }
        .feature-icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 14px;
          margin-bottom: 24px;
          transition: transform 0.3s ease;
        }
        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.15) rotate(-5deg);
        }
      `}</style>

      {/* ---------------- HERO SECTION ---------------- */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '56px', fontWeight: '900', marginBottom: '32px', color: '#0f172a' }}>
          The Grand Athena Library
        </h1>
        
        {/* Adjusted Library Hero Image (0.8x Size & Opacity 0.75) */}
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80" 
          alt="Inside the beautiful library" 
          style={{
            display: 'block',
            width: '80%', 
            margin: '0 auto 40px auto', 
            maxHeight: '450px',
            objectFit: 'cover',
            borderRadius: '16px',
            opacity: 0.75,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        />

        <p style={{ fontSize: '20px', color: '#64748b', maxWidth: '600px', margin: '0 auto 48px auto', lineHeight: '1.6' }}>
          Enterprise-grade catalog management, real-time spatial reservations, and seamless reading experiences.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button
            onClick={() => navigateTo('books')}
            style={{
              padding: '16px 32px',
              background: '#0f172a',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '16px'
            }}>
            Browse Catalog
          </button>

          <button
            onClick={() => navigateTo('reading-room')}
            style={{
              padding: '16px 32px',
              background: '#fff',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '16px'
            }}>
            Book Reading Room
          </button>
        </div>
      </div>

      {/* ---------------- FACILITY IMAGES SECTION ---------------- */}
      <div style={{ marginBottom: '100px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '40px', color: '#0f172a' }}>
          World-Class Amenities
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          {facilities.map((facility, index) => (
            <div key={index} className="facility-card">
              <img 
                src={facility.img} 
                alt={facility.name} 
                className="facility-img"
              />
              <div className="facility-overlay">
                {facility.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- DASHBOARD ---------------- */}
      <div style={{
        background: '#0f172a',
        borderRadius: '24px',
        padding: '64px 48px', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '100px 0', 
        flexWrap: 'wrap',
        gap: '40px' 
      }}>
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ fontSize: '32px', margin: '0 0 12px 0', fontWeight: '800' }}>Live Campus Dashboard</h3>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '18px' }}>Current operating capacity at a glance.</p>
        </div>

        <div style={{ display: 'flex', gap: '56px', flexWrap: 'wrap' }}> 
          <div><b style={{ fontSize: '36px', color: '#22c55e' }}>44</b><br /><span style={{ fontSize: '16px', color: '#94a3b8' }}>Seats</span></div>
          <div><b style={{ fontSize: '36px', color: '#3b82f6' }}>12k+</b><br /><span style={{ fontSize: '16px', color: '#94a3b8' }}>Books</span></div>
          <div><b style={{ fontSize: '36px', color: '#eab308' }}>76</b><br /><span style={{ fontSize: '16px', color: '#94a3b8' }}>Readers</span></div>
        </div>
      </div>

      {/* ---------------- FEATURE CARDS (UPDATED WITH ICONS) ---------------- */}
      <div style={{ marginBottom: '100px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '48px', color: '#0f172a' }}>
          Everything you need
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '32px' 
        }}>
          {features.map((f, i) => (
            <div key={i} className="feature-card">
            <div 
              className="feature-icon-wrapper"
              style={{ 
                // Corrected: use string concatenation instead of ${}
                backgroundColor: f.color + '15', 
                color: f.color 
              }}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="28" height="28">
                {f.icon}
              </svg>
            </div>
            <h3 style={{ marginBottom: '12px', fontSize: '20px', color: '#0f172a' }}>{f.title}</h3>
            <p style={{ color: '#64748b', margin: 0, lineHeight: '1.6' }}>{f.desc}</p>
          </div>
        ))}
        </div>
      </div>

      {/* ---------------- TESTIMONIAL SLIDER ---------------- */}
      <div style={{ marginBottom: '100px', overflow: 'hidden' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '48px', color: '#0f172a' }}>
          Trusted by Users
        </h2>

        <div style={{
          display: 'flex',
          gap: '24px',
          transform: 'translateX(' +scrollX +'px)'
        }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              minWidth: '320px',
              background: '#0f172a',
              color: 'white',
              padding: '32px',
              borderRadius: '16px'
            }}>
              <p style={{ fontStyle: 'italic', lineHeight: '1.6', margin: '0 0 24px 0' }}>"{t.comment}"</p>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{t.name}</h4>
              <small style={{ color: '#94a3b8', fontSize: '14px' }}>{t.role}</small>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- CONTACT & LOCATION ---------------- */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 100px auto',
        padding: '40px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        alignItems: 'center',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Owner Details & Contact */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ margin: 0, fontSize: '28px', color: '#0f172a' }}>Visit Us Today</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
              alt="Owner"
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            />
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>Mr. James Sterling</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Founder & Head Librarian</p>
            </div>
          </div>

          <div style={{ color: '#475569', fontSize: '15px', lineHeight: '2' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span>📍</span> <span>123 Knowledge Avenue, Bookworm District, ST 90210</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span>📞</span> <span>+1 (555) 123-4567</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span>✉️</span> <span>hello@grandathenalibrary.com</span>
            </div>
          </div>
        </div>

        {/* Live Google Map */}
        <div style={{ flex: '1 1 350px', height: '260px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
          <iframe
            title="Library Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.83543450937!2d144.9537353153166!3d-37.80890827975163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sState%20Library%20Victoria!5e0!3m2!1sen!2sus!4v1689255011046!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* ---------------- FAQ ---------------- */}
      <div style={{ maxWidth: '800px', margin: '0 auto 80px auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '48px', color: '#0f172a' }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, i) => {
            const isOpen = openFAQ === i;
            
            return (
              <div 
                key={i} 
                style={{ 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px',
                  background: '#fff',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.3s ease',
                  boxShadow: isOpen ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                <button
                  className="faq-btn"
                  onClick={() => setOpenFAQ(isOpen ? null : i)}
                  style={{ 
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '24px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#0f172a',
                    textAlign: 'left'
                  }}
                >
                  {faq.q}
                  <span style={{ 
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.3s ease',
                    fontSize: '14px',
                    color: '#64748b',
                    display: 'inline-block',
                    marginLeft: '16px'
                  }}>
                    ❯
                  </span>
                </button>

                <div style={{
                  maxHeight: isOpen ? '200px' : '0',
                  opacity: isOpen ? 1 : 0,
                  transition: 'all 0.3s ease-in-out',
                  padding: isOpen ? '0 24px 24px 24px' : '0 24px',
                  color: '#64748b',
                  lineHeight: '1.6'
                }}>
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}