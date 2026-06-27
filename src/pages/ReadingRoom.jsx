import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, MapPin, Users, ArrowLeft, Sun, Sunset, Moon } from 'lucide-react';
import { ROOMS, ROOM_SEATS, SHIFTS } from '../data/mockData.js'; 

export default function ReadingRoom() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [activeShift, setActiveShift] = useState('morning'); // Master Shift State

  // Clear selected seat if the user changes the time shift (as it might get booked by someone else)
  useEffect(() => {
    setSelectedSeat(null);
  }, [activeShift]);

  const handleSeatClick = (seat, currentStatus) => {
    if (currentStatus === 'available') {
      setSelectedSeat(seat);
    }
  };

  const handleBackToRooms = () => {
    setActiveRoom(null);
    setSelectedSeat(null);
  };

  // --- REUSABLE SHIFT SELECTOR COMPONENT ---
  const ShiftSelector = () => (
    <div style={{ display: 'flex', gap: '8px', background: '#fff', padding: '8px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'inline-flex', marginBottom: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
      {SHIFTS.map(shift => (
        <button
          key={shift.id}
          onClick={() => setActiveShift(shift.id)}
          style={{
            padding: '12px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '14px', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
            background: activeShift === shift.id ? '#0f172a' : 'transparent',
            color: activeShift === shift.id ? '#fff' : '#64748b'
          }}
        >
          {shift.id === 'morning' && <Sun size={18} />}
          {shift.id === 'afternoon' && <Sun size={18} />}
          {shift.id === 'evening' && <Sunset size={18} />}
          {shift.id === 'night' && <Moon size={18} />}
          <span>{shift.label}</span>
          <span style={{ fontSize: '11px', fontWeight: '500', opacity: activeShift === shift.id ? 0.8 : 0.6 }}>{shift.time}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      
      {/* VIEW 1: ROOM SELECTION DIRECTORY */}
      {!activeRoom && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Campus Study Spaces</h1>
              <p style={{ color: '#64748b', margin: 0 }}>Select a physical room to view real-time seating availability.</p>
            </div>
            <ShiftSelector />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
            {ROOMS.map(room => {
              // Calculate real-time availability based on the currently selected shift
              const roomSeats = ROOM_SEATS[room.id];
              const availableCount = roomSeats.filter(seat => seat.shifts[activeShift] === 'available').length;
              const occupancyRate = Math.round(((room.capacity - availableCount) / room.capacity) * 100);
              
              return (
                <div key={room.id} onClick={() => setActiveRoom(room)} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: '800', color: '#3b82f6', letterSpacing: '1px' }}>{room.id}</span>
                      <h3 style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: '800' }}>{room.name}</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f1f5f9', padding: '6px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', color: '#475569' }}>
                      <MapPin size={14} /> Floor {room.floor}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                    {room.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '11px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '20px', color: '#64748b', fontWeight: '600' }}>{tag}</span>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    <div>
                      <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> Total Capacity</span>
                      <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '4px' }}>{room.capacity}</div>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '600' }}>Available • {SHIFTS.find(s => s.id === activeShift).label}</span>
                      <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '4px', color: occupancyRate > 85 ? '#ef4444' : '#22c55e' }}>{availableCount}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* VIEW 2: THE DETAILED SEAT MAP */}
      {activeRoom && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px' }}>
          
          {/* LEFT: ARCHITECTURAL MAP */}
          <div>
            <button onClick={handleBackToRooms} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: '#64748b', fontWeight: '700', fontSize: '15px', cursor: 'pointer', padding: 0, marginBottom: '24px', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#0f172a'} onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}>
              <ArrowLeft size={18} /> Back to Directory
            </button>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>{activeRoom.name}</h1>
                <p style={{ color: '#64748b', margin: 0 }}>Floor {activeRoom.floor} • Select an available desk to reserve your block.</p>
              </div>
            </div>

            <ShiftSelector />

            <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', fontSize: '14px', fontWeight: '700', background: '#fff', padding: '16px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'inline-flex' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '16px', height: '16px', background: '#22c55e', borderRadius: '4px' }}></div> Available</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '16px', height: '16px', background: '#eab308', borderRadius: '4px' }}></div> Reserved</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '4px' }}></div> Occupied</div>
            </div>

            <div style={{ background: '#fff', border: '2px dashed #cbd5e1', borderRadius: '24px', padding: '48px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#f4f7f6', padding: '0 24px', fontSize: '14px', fontWeight: '900', color: '#94a3b8', letterSpacing: '2px' }}>MAIN ENTRANCE</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: '20px' }}>
                {ROOM_SEATS[activeRoom.id].map(s => {
                  const currentStatus = s.shifts[activeShift]; // Get status for current time block
                  return (
                    <div 
                      key={s.id} 
                      onClick={() => handleSeatClick(s, currentStatus)} 
                      className={`desk ${currentStatus} ${selectedSeat?.id === s.id ? 'selected' : ''}`}
                    >
                      {s.id}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: LIVE INTERACTION SIDEBAR */}
          <div>
            {selectedSeat ? (
              <div style={{ background: '#fff', border: '2px solid #3b82f6', padding: '32px', borderRadius: '16px', marginBottom: '32px', boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <CheckCircle color="#3b82f6" size={28} />
                  <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '900' }}>Desk Selected</h3>
                </div>
                <div style={{ fontSize: '48px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>{selectedSeat.id}</div>
                <p style={{ color: '#64748b', fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>Located in {activeRoom.name}</p>
                <p style={{ color: '#3b82f6', fontSize: '14px', fontWeight: '700', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> Booking for {SHIFTS.find(s => s.id === activeShift).label} Block</p>
                
                <button style={{ width: '100%', padding: '16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', marginBottom: '12px', transition: 'background 0.2s' }}>Confirm Reservation</button>
                <button onClick={() => setSelectedSeat(null)} style={{ width: '100%', padding: '12px', background: 'transparent', color: '#64748b', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Cancel Selection</button>
              </div>
            ) : (
              (() => {
                const roomSeats = ROOM_SEATS[activeRoom.id];
                const availableCount = roomSeats.filter(seat => seat.shifts[activeShift] === 'available').length;
                
                return (
                  <div style={{ background: '#0f172a', color: 'white', padding: '32px', borderRadius: '16px', marginBottom: '32px', position: 'sticky', top: '100px' }}>
                    <h3 style={{ margin: '0 0 24px 0' }}>{activeRoom.id} Overview</h3>
                    <div style={{ fontSize: '64px', fontWeight: '900', lineHeight: '1', color: availableCount > 0 ? '#22c55e' : '#ef4444', marginBottom: '24px' }}>
                      {Math.round((availableCount / activeRoom.capacity) * 100)}%
                    </div>
                    <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>Availability Rate ({SHIFTS.find(s => s.id === activeShift).label})</div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}><span>Total Capacity</span><strong>{activeRoom.capacity}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}><span>Occupied/Held</span><strong style={{ color: '#ef4444' }}>{activeRoom.capacity - availableCount}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Available Now</span><strong style={{ color: '#22c55e' }}>{availableCount}</strong></div>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>
      )}
    </div>
  );
}