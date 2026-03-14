import { Home, Compass, MessageSquare, User, Send, Filter, TrendingUp } from 'lucide-react';

export default function Teams() {
  const activeEvents = [
    {
      id: 1,
      title: 'Smart India Hackathon 2024',
      subtitle: 'Sustainability, Fintech & Open Innovation challenges',
      timeLeft: 'ENDS IN 4 DAYS',
      participants: 42,
      color: 'var(--success)',
      bgColor: '#D1FAE5'
    },
    {
      id: 2,
      title: 'Decentralize Everything',
      subtitle: 'Web3 Ideathon for student entrepreneurs',
      timeLeft: 'NEW EVENT',
      participants: 18,
      color: 'var(--primary)',
      bgColor: '#E0E7FF'
    }
  ];

  const students = [
    {
      id: 1,
      name: 'Arjun K.',
      role: '3rd Year, CSE',
      avatar: 'https://i.pravatar.cc/150?u=arjun',
      tags: ['UI/UX', 'Figma', 'React Native']
    },
    {
      id: 2,
      name: 'Sarah James',
      role: '2nd Year, IT',
      avatar: 'https://i.pravatar.cc/150?u=sarah2',
      tags: ['Backend', 'Python', 'FastAPI']
    },
    {
      id: 3,
      name: 'Vikram S.',
      role: 'Final Year, ECE',
      avatar: 'https://i.pravatar.cc/150?u=vikram',
      tags: ['ML/AI', 'PyTorch', 'Data Viz']
    },
    {
      id: 4,
      name: 'Meera Nair',
      role: '3rd Year, CSE',
      avatar: 'https://i.pravatar.cc/150?u=meera',
      tags: ['Blockchain', 'Solidity', 'Node.js']
    },
    {
      id: 5,
      name: 'Rahul Verma',
      role: '2nd Year, CTech',
      avatar: 'https://i.pravatar.cc/150?u=rahul',
      tags: ['Cloud', 'AWS', 'Docker']
    },
    {
      id: 6,
      name: 'Priyal S.',
      role: '3rd Year, SWE',
      avatar: 'https://i.pravatar.cc/150?u=priyal',
      tags: ['Frontend', 'Vue.js', 'Tailwind']
    }
  ];

  return (
    <div className="mobile-stack" style={{ display: 'flex', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Left Sidebar */}
      <aside className="mobile-sidebar-left" style={{ width: '240px', flexShrink: 0, flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <a href="#" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>
            <Home size={18} /> Home Feed
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
            <Compass size={18} /> Explore Matches
          </a>
          <a href="#" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><MessageSquare size={18} /> Messages</div>
            <div style={{ backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>3</div>
          </a>
          <a href="#" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>
            <User size={18} /> My Profile
          </a>
        </nav>

        <div className="card" style={{ padding: '1.5rem', background: 'linear-gradient(to bottom, var(--primary) 0%, hsl(226, 96%, 45%) 100%)', color: 'white', border: 'none', boxShadow: 'var(--shadow-md)' }}>
          <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>QUICK TIP</h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>Completing your technical stack profile increases teammate matching by 65%.</p>
          <button className="btn btn-full" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>Update Skills</button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, paddingBottom: '3rem' }}>
        
        {/* Top Internal Nav */}
        <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
          <button style={{ padding: '1rem 0', fontWeight: 500, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Hackathons</button>
          <button style={{ padding: '1rem 0', fontWeight: 600, color: 'var(--primary)', borderBottom: '2px solid var(--primary)', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer' }}>Teammates</button>
          <button style={{ padding: '1rem 0', fontWeight: 500, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Projects</button>
        </div>

        {/* Active Events */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Active Events</h2>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Find a challenge and start building together</p>
            </div>
            <a href="#" style={{ fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>View All &rarr;</a>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {activeEvents.map((ev, i) => (
              <div key={ev.id} className="card animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, minWidth: '380px', flex: 1, border: 'none', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '140px', backgroundColor: ev.bgColor, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Placeholder for event banner graphic. Real app uses images. */}
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: ev.color, opacity: 0.8 }}>{ev.title.substring(0,2)}</div>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'white', color: ev.color, fontSize: '0.65rem', fontWeight: 800, padding: '0.25rem 0.6rem', borderRadius: '0.25rem', letterSpacing: '0.05em', boxShadow: 'var(--shadow-sm)' }}>
                    {ev.timeLeft}
                  </div>
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', margin: '0 0 0.25rem 0' }}>{ev.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: '0 0 1.5rem 0' }}>{ev.subtitle}</p>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold' }}>+{ev.participants}</div>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#D1FAE5', border: '2px solid white', marginRight: '-10px' }}></div>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FEF3C7', border: '2px solid white', marginRight: '-10px' }}></div>
                      </div>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '0.4rem 1.25rem', display: 'flex', gap: '0.5rem' }}><User size={16} /> Find Teammates</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Students Looking for Teams</h2>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Talented individuals ready to collaborate</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', cursor: 'pointer' }}><Filter size={16} /> Filter</button>
              <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', cursor: 'pointer' }}><TrendingUp size={16} /> Trending</button>
            </div>
          </div>

          <div className="responsive-grid-sm">
            {students.map((student, i) => (
              <div key={student.id} className="card animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                      <img src={student.avatar} alt={student.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-light)' }} />
                      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '14px', height: '14px', backgroundColor: 'var(--success)', border: '2px solid white', borderRadius: '50%' }}></div>
                    </div>
                    <div>
                      <h3 style={{ margin: '0 0 0.15rem 0', fontSize: '1.1rem' }}>{student.name}</h3>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{student.role}</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {student.tags.map(tag => (
                    <span key={tag} style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>{tag}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  <button className="btn btn-outline" style={{ flex: 1 }}>View Profile</button>
                  <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }} aria-label="Send Message"><Send size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
