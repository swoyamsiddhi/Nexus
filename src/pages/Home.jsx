import { Home as HomeIcon, Calendar, Users, Bookmark, Hash, Plus, Megaphone, Rocket, Share2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="mobile-stack" style={{ display: 'flex', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Left Sidebar */}
      <aside className="mobile-sidebar-left" style={{ width: '240px', flexShrink: 0, flexDirection: 'column', gap: '2rem' }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
            <HomeIcon size={18} /> Home Feed
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }} className="btn-ghost">
            <Calendar size={18} /> My Schedule
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }} className="btn-ghost">
            <Users size={18} /> Joined Teams
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }} className="btn-ghost">
            <Bookmark size={18} /> Saved Items
          </a>
        </nav>

        <div>
          <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '1rem', paddingLeft: '1rem' }}>Your Clubs</h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }} className="btn-ghost">
              <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.65rem' }}>AC</div>
              <span>ACM Chapter</span>
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }} className="btn-ghost">
              <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', fontWeight: 'bold', fontSize: '0.65rem' }}>WB</div>
              <span>WebDev Hub</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Feed */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '700px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', marginBottom: '0.25rem' }}>Student Feed</h1>
            <p style={{ color: 'var(--text-muted)' }}>What's happening in SRM today</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }} className="custom-scrollbar">
          <button className="btn btn-primary" style={{ backgroundColor: '#E0E7FF', color: 'var(--primary)', boxShadow: 'none' }}>All</button>
          <button className="btn btn-outline" style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}><Calendar size={16} /> Events</button>
          <button className="btn btn-outline" style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}><Rocket size={16} /> Projects</button>
          <button className="btn btn-outline" style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}><Megaphone size={16} /> Announcements</button>
        </div>

        {/* Feed Cards */}
        <div className="card animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: 'none', boxShadow: 'var(--shadow-sm)', marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
              <Megaphone size={20} />
            </div>
            <div>
              <h4 style={{ margin: 0 }}>Admin Office</h4>
              <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-muted)' }}>2 hours ago &bull; Announcement</p>
            </div>
          </div>
          
          <div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Final Semester Schedule Released</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>The end-term examination schedule for all undergraduate programs is now available on the official portal. Please check for any overlaps and report by Friday.</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E0E7FF', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold' }}>+1.2k</div>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FDE68A', border: '2px solid white', marginRight: '-10px' }}></div>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#A7F3D0', border: '2px solid white', marginRight: '-10px' }}></div>
              </div>
            </div>
            <a href="#" style={{ fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>View Details &rarr;</a>
          </div>
        </div>

        <div className="card animate-fade-in" style={{ animationDelay: '0.1s', display: 'flex', flexDirection: 'column', border: 'none', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ position: 'relative', height: '240px', width: '100%', backgroundColor: '#f0f0f0' }}>
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Event Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)' }}></div>
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', color: 'white' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'var(--success)', color: 'white', fontSize: '0.65rem', fontWeight: 800, padding: '0.25rem 0.5rem', borderRadius: '0.25rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>REGISTRATION OPEN</div>
              <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>HackSRM: 24h Build-a-thon</h2>
            </div>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> Oct 12, 2023</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><HomeIcon size={16} /> Main Auditorium</div>
            </div>
            <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Join over 500 developers to build innovative solutions for local community problems. Mentors from top tech companies will be present.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-primary btn-full">Join Event</button>
              <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}><Share2 size={20} /></button>
            </div>
          </div>
        </div>

        <div className="card animate-fade-in" style={{ animationDelay: '0.2s', padding: '1.5rem', border: 'none', boxShadow: 'var(--shadow-sm)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img src="https://i.pravatar.cc/150?u=alex" alt="Alex Rivera" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0 }}>Alex Rivera</h4>
              <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-muted)' }}>4 hours ago &bull; Project Update</p>
            </div>
            <div className="badge" style={{ backgroundColor: '#E0E7FF', color: 'var(--primary)', fontSize: '0.7rem' }}>ROBOTICS</div>
          </div>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Autonomous Delivery Drone Prototype V2</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>Just completed the first successful test flight with the new stability algorithms. Payload capacity increased by 30%!</p>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="mobile-sidebar-right" style={{ width: '320px', flexShrink: 0, flexDirection: 'column', gap: '1.5rem' }}>
        <div className="card" style={{ padding: '1.5rem', border: 'none', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', margin: 0 }}>Upcoming for You</h3>
            <Calendar size={18} color="var(--primary)" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ position: 'relative', paddingLeft: '1rem', borderLeft: '2px solid var(--primary)' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Tomorrow &bull; 10:00 AM</p>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>Algorithms Workshop</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Hall B-102</p>
            </div>
            <div style={{ position: 'relative', paddingLeft: '1rem', borderLeft: '2px solid var(--success)' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Fri, 15 Oct &bull; 4:00 PM</p>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>Team Sync: Delivery Drone</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>MakerSpace</p>
            </div>
            <div style={{ position: 'relative', paddingLeft: '1rem', borderLeft: '2px solid var(--text-muted)' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Mon, 18 Oct &bull; 2:00 PM</p>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>Industry Guest Lecture</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Main Hall</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <a href="#" style={{ fontSize: '0.875rem', fontWeight: 600 }}>See Full Schedule</a>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', border: 'none', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', margin: 0 }}>Trending Skills</h3>
            <Users size={18} color="var(--success)" /> {/* Replace with TrendingUp icon if imported properly, fallback to Users */}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ backgroundColor: '#E0E7FF', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>#reactjs</span>
            <span style={{ backgroundColor: '#D1FAE5', color: '#059669', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>#machinelearning</span>
            <span style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>#uiux</span>
            <span style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>#flutter</span>
            <span style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>#python</span>
            <span style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>#blockchain</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '1rem 0 0 0', fontStyle: 'italic' }}>Based on latest project requests</p>
        </div>

        <div className="card" style={{ padding: '1.5rem', border: 'none', background: 'linear-gradient(135deg, var(--primary) 0%, hsl(226, 96%, 35%) 100%)', color: 'white', boxShadow: 'var(--shadow-md)' }}>
           <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'white' }}>Exchange Skills?</h3>
           <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', opacity: 0.9 }}>Teach what you know, learn what you need from fellow students.</p>
           <button className="btn btn-full" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>Visit Skill Hub</button>
        </div>
      </aside>
    </div>
  );
}
