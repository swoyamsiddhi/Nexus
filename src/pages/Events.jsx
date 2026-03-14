import React, { useState } from 'react';
import { Plus, Calendar, MapPin, ChevronDown, ChevronRight, Bookmark, Users, Navigation, Flame, Clock, Navigation2, Zap, Trophy, Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Events() {
  const [activeTab, setActiveTab] = useState('campus');
  
  // Dummy data generated for different sections
  const todayEvents = [
    { id: 1, title: 'CodeSprint Hackathon', type: 'Technical', organizer: 'ACM Chapter', time: '🔴 Live', location: 'TP Gnd', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80', color: 'var(--primary)', spots: '45 here', action: 'Join Now' },
    { id: 2, title: 'ML Workshop Advanced', type: 'Workshop', organizer: 'GDSC', time: '⏰ 2:00 PM', location: 'Lab 3', image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80', color: 'var(--success)', spots: 'Filling fast', action: 'Register' },
    { id: 3, title: 'Cast Reveal AARUUSH', type: 'Cultural', organizer: 'Aaruush', time: '⏰ 6:00 PM', location: 'Audi', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80', color: 'var(--warning)', spots: 'Open', action: 'RSVP' }
  ];

  const recommendedEvents = [
    { id: 4, title: 'Web3 & Blockchains', date: 'March 18-19', time: '10:00 AM', location: 'Mini Audi', type: 'Technical', registered: 120, image: 'https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80', badge: '🎯 RECOMMENDED' },
    { id: 5, title: 'UI/UX Design Sprint', date: 'March 20', time: '2:00 PM', location: 'Design Lab', type: 'Workshop', registered: 85, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80', badge: '✨ NEW' }
  ];

  const clubs = [
    { name: 'ACM', color: '#10b981' }, 
    { name: 'IEEE', color: '#3b82f6' }, 
    { name: 'GDSC', color: '#ef4444' }, 
    { name: 'AARUUSH', color: '#f59e0b' },
    { name: 'SRM MILAN', color: '#8b5cf6' },
    { name: 'Robotics', color: '#0ea5e9' },
    { name: 'CSI', color: '#6366f1' }
  ];

  return (
    <div className="events-discovery-page" style={{ paddingBottom: '4rem' }}>
      
      {/* Page Header */}
      <div className="responsive-padding" style={{ paddingTop: '2rem', paddingBottom: '1.5rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Calendar size={28} color="var(--primary)" /> Campus Events
            </h1>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1.05rem' }}>Discover what's happening at SRM</p>
          </div>
          <button className="btn btn-primary show-on-desktop">
            <Plus size={18} /> Post Event*
          </button>
        </div>
        <div style={{ maxWidth: '1400px', margin: '0.5rem auto 0 auto', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }} className="show-on-desktop">
          *Club organizers only
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="responsive-padding" style={{ borderBottom: '1px solid var(--border-color)', position: 'sticky', top: '70px', backgroundColor: 'var(--bg-color)', zIndex: 10, paddingBottom: 0 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '2rem', overflowX: 'auto' }} className="custom-scrollbar">
          <button 
            onClick={() => setActiveTab('campus')}
            style={{ padding: '1rem 0', fontWeight: activeTab === 'campus' ? 600 : 500, color: activeTab === 'campus' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: activeTab === 'campus' ? '2px solid var(--primary)' : '2px solid transparent', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            🏫 Campus Events
          </button>
          <button 
            onClick={() => setActiveTab('external')}
            style={{ padding: '1rem 0', fontWeight: activeTab === 'external' ? 600 : 500, color: activeTab === 'external' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: activeTab === 'external' ? '2px solid var(--primary)' : '2px solid transparent', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            🌐 External Events
          </button>
          <button 
            onClick={() => setActiveTab('myevents')}
            style={{ padding: '1rem 0', fontWeight: activeTab === 'myevents' ? 600 : 500, color: activeTab === 'myevents' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: activeTab === 'myevents' ? '2px solid var(--primary)' : '2px solid transparent', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            📅 My Events
          </button>
        </div>
      </div>

      <div className="responsive-padding" style={{ maxWidth: '1400px', margin: '0 auto', paddingTop: '1.5rem' }}>
        
        {/* Search & Filter Bar */}
        <div className="card" style={{ padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
               <input type="text" placeholder="Search events, clubs, or keywords..." className="input" style={{ width: '100%', paddingLeft: '2.5rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg-color)', border: 'none' }} />
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }} className="custom-scrollbar">
              <button className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1rem', whiteSpace: 'nowrap' }}>Filter ▼</button>
              <button className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1rem', whiteSpace: 'nowrap' }}>📍 Near Me</button>
              <button className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1rem', whiteSpace: 'nowrap' }}>📅 Today</button>
              <button className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1rem', whiteSpace: 'nowrap' }}>❤️ Saved</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>ACTIVE:</span>
            <span style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Technical ✕</span>
            <span style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>This Week ✕</span>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', gap: '0.5rem', overflowX: 'auto' }} className="custom-scrollbar">
             <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>🏷️ CATEGORIES:</span>
             {['All', '💻 Technical', '🎭 Cultural', '🏃 Sports', '📚 Workshop', '🏆 Competition', '☕ Social', '🎓 Academic'].map(cat => (
               <button key={cat} style={{ padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', border: cat === 'All' ? '1px solid var(--primary)' : '1px solid var(--border-color)', backgroundColor: cat === 'All' ? 'var(--primary)' : 'transparent', color: cat === 'All' ? 'white' : 'var(--text-main)', fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>{cat}</button>
             ))}
             <button style={{ padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', border: 'none', backgroundColor: 'transparent', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>More filters ▼</button>
          </div>
        </div>

        {/* Location Context */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Navigation2 size={16} color="var(--primary)" /> Showing events near: <strong>SRM University Main Campus</strong>
          </div>
          <button style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 500, fontSize: '0.85rem' }}>Change location</button>
        </div>

        {/* FEED SECTIONS */}
        {activeTab === 'campus' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* HAPPENING NOW / TODAY */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Flame size={24} color="var(--danger)" /> Happening Today
              </h2>
              <Link to="#" style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'none', fontSize: '0.9rem' }}>See all today's events →</Link>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollSnapType: 'x mandatory' }} className="custom-scrollbar">
              {todayEvents.map((evt, i) => (
                <div key={evt.id} className="card" style={{ minWidth: '280px', flex: '0 0 auto', scrollSnapAlign: 'start', overflow: 'hidden', padding: 0, border: '1px solid var(--border-color)' }}>
                  <div style={{ height: '140px', position: 'relative' }}>
                     <img src={evt.image} alt={evt.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                     <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', backgroundColor: evt.color, color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                       {evt.type}
                     </div>
                  </div>
                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{evt.title}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{evt.organizer}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: evt.time.includes('Live') ? 'var(--danger)' : 'var(--text-main)' }}>{evt.time}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {evt.location}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Users size={14} /> {evt.spots}</div>
                    </div>
                    <Link to={`/events/${evt.id}`} className="btn btn-outline" style={{ marginTop: '0.5rem', justifyContent: 'center', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}>{evt.action}</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RECOMMENDED FOR YOU */}
          <section style={{ backgroundColor: 'var(--primary-subtle)', margin: '0 -2rem', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Zap size={24} color="var(--primary)" /> Recommended For You
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Based on: CSE • 3rd Year • AI/ML Interest • Past activity</p>
            
            <div className="responsive-grid">
              {recommendedEvents.map(evt => (
                <div key={evt.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', padding: 0, border: 'none', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ position: 'relative', height: '180px' }}>
                    <img src={evt.image} alt={evt.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', backgroundColor: 'rgba(255,255,255,0.9)', color: 'var(--primary-dark)', fontSize: '0.65rem', fontWeight: 800, padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                      {evt.badge}
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'inline-block', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>{evt.type}</div>
                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem' }}>{evt.title}</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> {evt.date} • {evt.time}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {evt.location}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={16} /> {evt.registered} registered</div>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                      <Link to={`/events/${evt.id}`} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>View Details</Link>
                      <button className="btn btn-outline" style={{ padding: '0.5rem', borderColor: 'var(--border-color)' }}><Heart size={20} color="var(--text-muted)" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn-ghost" style={{ fontSize: '0.85rem' }}>Not interested in this? ✕</button>
              <button className="btn-ghost" style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>Improve recommendations</button>
            </div>
          </section>

          {/* BROWSE BY CLUB */}
          <section>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              🏷️ Browse by Club
            </h2>
            <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', paddingX: '0.5rem' }} className="custom-scrollbar">
              {clubs.map(club => (
                <div key={club.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', minWidth: '80px', cursor: 'pointer' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-lg)', backgroundColor: club.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.85rem', boxShadow: 'var(--shadow-sm)', transition: 'transform var(--transition-fast)' }} className="hover-scale">
                    {club.name.substring(0, 3)}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{club.name}</span>
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', minWidth: '80px', cursor: 'pointer' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--surface-color)', border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    <ChevronRight size={24} />
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>View All</span>
              </div>
            </div>
          </section>

          {/* THIS WEEK */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Calendar size={24} color="var(--primary)" /> This Week
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>Monday, March 10 - Sunday, March 16</p>
              </div>
              <button className="btn-ghost" style={{ fontSize: '0.85rem' }}>View full calendar</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Monday</h3>
                <div className="responsive-grid">
                   {recommendedEvents.map((evt, i) => (
                      <div key={i} className="card" style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid var(--border-color)', boxShadow: 'none' }}>
                         <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
                           <img src={evt.image} alt="Event" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                         </div>
                         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.25rem' }}>{evt.time}</div>
                            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem' }}>{evt.title}</h4>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📍 {evt.location}</div>
                         </div>
                      </div>
                   ))}
                </div>
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tuesday</h3>
                <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', backgroundColor: 'transparent', boxShadow: 'none' }}>
                  <Calendar size={32} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                  <p style={{ margin: 0 }}>No events yet - Be the first to post!</p>
                  <button className="btn btn-outline" style={{ marginTop: '1rem', marginInline: 'auto' }}>Post Event</button>
                </div>
              </div>
            </div>
          </section>

          {/* TRENDING & JUST ADDED (Split Grid) */}
          <div className="responsive-grid" style={{ gap: '2rem' }}>
            <section style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Trophy size={20} color="var(--warning)" /> Trending Lists
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: i < 3 ? '1px solid var(--border-color)' : 'none' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--border-color)' }}>#{i}</div>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>Mega Job Fair 2024</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>450+ registered this week</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bookmark size={20} color="var(--primary)" /> Saved & Quick Access
              </h2>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', backgroundColor: 'var(--primary-subtle)', borderRadius: 'var(--radius-md)', color: 'var(--primary-dark)', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>You have <strong>3</strong> saved events</span>
                  <Link to="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>View →</Link>
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span><span style={{ color: 'var(--success)' }}>✓</span> Registered for Hackathon</span>
                  <Link to="#" style={{ color: 'var(--text-muted)', fontWeight: 500, textDecoration: 'none' }}>Ticket</Link>
                </div>
              </div>
            </section>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <p>You've reached the end of the feed.</p>
            <button className="btn btn-outline" style={{ margin: '0 auto' }}>Load more events</button>
          </div>

        </div>
        )}

        {activeTab === 'external' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingBottom: '3rem' }}>
            {/* External Page Header */}
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <h2 style={{ fontSize: '1.75rem', margin: 0, letterSpacing: '-0.02em' }}>🌐 Beyond Campus</h2>
                  <p style={{ marginTop: '0.4rem', color: 'var(--text-muted)', maxWidth: '520px', fontSize: '0.95rem' }}>
                    Discover hackathons, conferences, and meetups happening in your city. Find SRMites going and attend together.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" style={{ fontSize: '0.9rem' }}>+ Share External Event</button>
                  <button className="btn btn-outline" style={{ fontSize: '0.9rem' }}>My External Activity</button>
                </div>
              </div>
            </section>

            {/* Location Selector */}
            <section className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                  <Navigation2 size={16} color="var(--primary)" /> 
                  <span>Showing events near:</span>
                </div>
                <button className="btn-ghost" style={{ fontSize: '0.85rem' }}>Use my current location</button>
              </div>

              <div className="responsive-grid-sm">
                {[
                  { city: 'Chennai', active: true, count: 12 },
                  { city: 'Bangalore', active: false, count: 8 },
                  { city: 'Hyderabad', active: false, count: 5 },
                  { city: 'Pune', active: false, count: 3 },
                  { city: 'Online', active: false, count: 15 },
                ].map((c) => (
                  <button
                    key={c.city}
                    className="card"
                    style={{
                      padding: '0.9rem 1rem',
                      borderRadius: 'var(--radius-lg)',
                      textAlign: 'left',
                      border: c.active ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                      backgroundColor: c.active ? 'var(--primary-light)' : 'white',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <span style={{ fontWeight: 600 }}>{c.city}</span>
                      {c.active && <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--primary)' }} />}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.count} events</div>
                  </button>
                ))}
                <button
                  className="card"
                  style={{
                    padding: '0.9rem 1rem',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'left',
                    border: '1px dashed var(--border-color)',
                    backgroundColor: 'var(--bg-color)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  + Add new city
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Radius:</span>
                {['Within 10km', '10-50km', '50km+', 'Any distance'].map((r, i) => (
                  <button
                    key={r}
                    style={{
                      padding: '0.3rem 0.7rem',
                      borderRadius: '999px',
                      border: i === 0 ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                      backgroundColor: i === 0 ? 'var(--primary-light)' : 'white',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </section>

            {/* Secondary Filters */}
            <section className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
                  <input
                    type="text"
                    className="input"
                    placeholder="Search external events..."
                    style={{ paddingLeft: '2.4rem', borderRadius: 'var(--radius-full)' }}
                  />
                  <Search
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '0.9rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)',
                    }}
                  />
                </div>
              </div>

              <div className="responsive-grid-sm">
                <div className="form-group">
                  <label>Event Type</label>
                  <select className="input">
                    <option>All</option>
                    <option>Hackathon</option>
                    <option>Conference</option>
                    <option>Workshop</option>
                    <option>Meetup</option>
                    <option>Competition</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <select className="input">
                    <option>Anytime</option>
                    <option>This Weekend</option>
                    <option>This Month</option>
                    <option>Next 3 Months</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Cost</label>
                  <select className="input">
                    <option>Any</option>
                    <option>Free only</option>
                    <option>Under ₹500</option>
                    <option>Paid</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>SRM Group Status</label>
                  <select className="input">
                    <option>Any</option>
                    <option>Has SRM group</option>
                    <option>Need 5+ SRMites</option>
                    <option>Friends going</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem', marginTop: '0.75rem' }}>
                {['🚗 Can offer ride', '🏠 Need accommodation', '🎓 Beginner-friendly', '🏆 Has prizes'].map((chip) => (
                  <button
                    key={chip}
                    style={{
                      padding: '0.3rem 0.8rem',
                      borderRadius: '999px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-color)',
                      cursor: 'pointer',
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </section>

            {/* Quick stats */}
            <section className="card" style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', backgroundColor: 'var(--primary-light)' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>
                <strong>This month:</strong> 45 external events • 12 SRM groups formed • 234 SRMites attending
              </div>
              <button className="btn btn-outline" style={{ fontSize: '0.85rem' }}>View activity map →</button>
            </section>

            {/* Trending / Sections (skeleton) */}
            <section>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🔥 Trending near you (Chennai)
              </h3>
              <p style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Most SRMites interested this week
              </p>
              <div className="responsive-grid">
                <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: '96px', height: '96px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-color)' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ margin: 0, fontSize: '1rem' }}>DevFest Chennai 2024</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>By Google Developer Groups</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                        <span>📅 March 25, 2024 • 9:00 AM</span>
                        <span>📍 Chennai Trade Center, Nandanam</span>
                        <span>🎟️ Free registration</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: '0.6rem', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-color)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <strong>SRM Connect</strong>
                    <span>🔥 45 interested • 12 going</span>
                    <span>🚗 3 offering ride • 🏠 2 need accommodation</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                    <button className="btn btn-outline" style={{ fontSize: '0.8rem' }}>Interested</button>
                    <button className="btn btn-primary" style={{ fontSize: '0.8rem' }}>Going</button>
                    <button className="btn btn-outline" style={{ fontSize: '0.8rem' }}>Offer Ride</button>
                    <button className="btn btn-outline" style={{ fontSize: '0.8rem' }}>Join SRM Group Chat</button>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.6rem' }}>📅 This weekend</h3>
              <div className="responsive-grid-sm">
                <div className="card" style={{ padding: '1rem', fontSize: '0.9rem' }}>
                  <div style={{ fontWeight: 600 }}>UX Design Workshop</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                    By DesignUp • March 16 • 10:00 AM
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                    📍 IIT Madras Research Park
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.4rem' }}>
                    👥 SRM Group: 8 interested • 3 going
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem' }}>
                    <button className="btn btn-outline" style={{ fontSize: '0.8rem' }}>Interested</button>
                    <button className="btn btn-primary" style={{ fontSize: '0.8rem' }}>Going</button>
                  </div>
                </div>
              </div>
            </section>

            <div style={{ textAlign: 'center', paddingTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <button className="btn btn-outline" style={{ fontSize: '0.85rem' }}>Load more events</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
