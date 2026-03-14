import { Plus, Heart, Bookmark, UserPlus, Settings2 } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'EcoTracker AI',
      desc: 'Carbon footprint analysis tool using computer vision for daily habit tracking.',
      author: 'Alex Chen',
      avatar: 'https://i.pravatar.cc/150?u=alex',
      image: 'https://images.unsplash.com/photo-1622675363311-3e1904dc1885?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tags: ['AI', 'SOCIAL GOOD'],
      liked: false
    },
    {
      id: 2,
      title: 'Smart Campus App',
      desc: 'Indoor navigation and real-time amenity availability for university students.',
      author: 'Priya Rao',
      avatar: 'https://i.pravatar.cc/150?u=priya',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tags: ['MOBILE', 'EDUCATION'],
      liked: true
    },
    {
      id: 3,
      title: 'HealthSync',
      desc: 'Unified dashboard for student mental health tracking and counseling appointments.',
      author: 'Jordan Smith',
      avatar: 'https://i.pravatar.cc/150?u=jordan',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tags: ['HEALTH', 'WEB DEV'],
      liked: false
    },
    {
      id: 4,
      title: 'Nexus Social',
      desc: 'Hyper-local network for sharing campus resources and skill trading.',
      author: 'Sarah Lee',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      tags: ['COMMUNITY', 'SOCIAL'],
      liked: false
    }
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      
      {/* Sub Navigation */}
      <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border-color)', margin: '0 2rem 2rem 2rem' }}>
        <button style={{ padding: '1rem 0', fontWeight: 600, color: 'var(--primary)', borderBottom: '2px solid var(--primary)', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer' }}>Discover</button>
        <button style={{ padding: '1rem 0', fontWeight: 500, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>My Projects</button>
        <button style={{ padding: '1rem 0', fontWeight: 500, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Collabs</button>
      </div>

      <div style={{ padding: '0 2rem', paddingBottom: '3rem' }}>
        
        {/* Header Area */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              COMMUNITY SHOWCASE
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>Project Board</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.5 }}>
              Explore the latest innovations from the student community and find your next collaboration.
            </p>
          </div>
          <button className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>
            <Plus size={18} /> Submit Project
          </button>
        </div>

        {/* Tabs & Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <button style={{ padding: '0.75rem 0', fontWeight: 600, color: 'var(--primary)', borderBottom: '2px solid var(--primary)', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer' }}>All Projects</button>
            <button style={{ padding: '0.75rem 0', fontWeight: 500, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Web Dev</button>
            <button style={{ padding: '0.75rem 0', fontWeight: 500, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>AI & ML</button>
            <button style={{ padding: '0.75rem 0', fontWeight: 500, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Social Good</button>
            <button style={{ padding: '0.75rem 0', fontWeight: 500, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>IoT</button>
            <button style={{ padding: '0.75rem 0', fontWeight: 500, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Design</button>
          </div>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)' }}>
            <Settings2 size={18} /> Filters
          </button>
        </div>

        {/* Project Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {projects.map((proj, i) => (
            <div key={proj.id} className="card animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              <div style={{ position: 'relative', height: '180px', backgroundColor: '#f8f9fa' }}>
                <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  className="glass"
                  style={{ 
                    position: 'absolute', top: '0.75rem', right: '0.75rem', 
                    width: '36px', height: '36px', borderRadius: '50%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.4)', cursor: 'pointer', 
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)', transition: 'all var(--transition-fast)'
                  }}
                >
                  <Heart size={18} color={proj.liked ? 'var(--danger)' : 'var(--text-main)'} fill={proj.liked ? 'var(--danger)' : 'none'} style={{ transition: 'all 0.2s ease' }} />
                </button>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  {proj.tags.map((tag, idx) => (
                    <span key={idx} style={{ 
                      fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.5rem', 
                      borderRadius: 'var(--radius-sm)', letterSpacing: '0.05em',
                      backgroundColor: idx === 0 ? 'var(--primary-light)' : 'var(--success-bg)',
                      color: idx === 0 ? 'var(--primary)' : 'var(--success)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0' }}>{proj.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem', flex: 1 }}>
                  {proj.desc}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <img src={proj.avatar} alt={proj.author} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>{proj.author}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Bookmark size={16} /> Save
                  </button>
                  <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: 'var(--primary)', color: 'white', border: '1px solid transparent' }}>
                    <UserPlus size={16} /> Collab
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
