import { Plus, Calendar, MapPin, ChevronDown } from 'lucide-react';

export default function Events() {
  const events = [
    {
      id: 1,
      title: 'HackSRM 5.0',
      organizer: 'SRM Tech Club',
      date: 'Oct 28, 2024 • 09:00 AM',
      location: 'Tech Park, 4th Floor',
      type: 'HACKATHON',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: 'var(--primary)',
      isNew: false
    },
    {
      id: 2,
      title: 'Future of AI Ethics',
      organizer: 'Dept of CSE',
      date: 'Nov 02, 2024 • 02:00 PM',
      location: 'Mini Auditorium',
      type: 'SEMINAR',
      price: 'Registration Required',
      image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: 'var(--success)',
      isNew: false
    },
    {
      id: 3,
      title: 'IoT Hands-on Training',
      organizer: 'Robotics Club',
      date: 'Nov 05, 2024 • 10:30 AM',
      location: 'Main Lab 201',
      type: 'WORKSHOP',
      price: '₹250 per head',
      image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: 'var(--warning)',
      isNew: true
    },
    {
      id: 4,
      title: 'Career Path in 2025',
      organizer: 'Placement Cell',
      date: 'Nov 10, 2024 • 11:00 AM',
      location: 'Dr. T.P. Ganesan Auditorium',
      type: 'SEMINAR',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1475721025505-23126fbb1fe6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: 'var(--success)',
      isNew: false
    }
  ];

  return (
    <div style={{ display: 'flex', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Left Sidebar for Categories */}
      <aside style={{ width: '220px', flexShrink: 0, marginTop: '1rem' }}>
        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '1rem' }}>Categories</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--primary)' }} />
            <span style={{ fontWeight: 500 }}>Hackathons</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--primary)' }} />
            <span style={{ fontWeight: 500 }}>Seminars</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--primary)' }} />
            <span style={{ fontWeight: 500 }}>Workshops</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--primary)' }} />
            <span style={{ fontWeight: 500 }}>Cultural</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--primary)' }} />
            <span style={{ fontWeight: 500 }}>Sports</span>
          </label>
        </div>
      </aside>

      {/* Main Events Content */}
      <div style={{ flex: 1, paddingBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', marginBottom: '0.3rem' }}>Discover Events</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Find and join the latest happenings around SRM</p>
          </div>
          <button className="btn btn-primary">
            <Plus size={18} /> Post Event
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <button style={{ padding: '0.75rem 0', fontWeight: 600, color: 'var(--primary)', borderBottom: '2px solid var(--primary)', background: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer' }}>Campus Events</button>
          <button style={{ padding: '0.75rem 0', fontWeight: 500, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>External Events</button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--primary)', borderColor: 'var(--primary)', backgroundColor: 'var(--primary-light)' }}>
            All Types <ChevronDown size={14} />
          </button>
          <button className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', backgroundColor: 'var(--surface-color)' }}>
            Date <Calendar size={14} />
          </button>
          <button className="btn btn-outline" style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', backgroundColor: 'var(--surface-color)' }}>
            Location <MapPin size={14} />
          </button>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {events.map((event, i) => (
            <div key={event.id} className="card animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, display: 'flex', flexDirection: 'column', height: '100%', border: 'none', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', backgroundColor: event.color, color: 'white', fontSize: '0.65rem', fontWeight: 800, padding: '0.25rem 0.5rem', borderRadius: '0.25rem', letterSpacing: '0.05em' }}>
                  {event.type}
                </div>
              </div>
              
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'inline-block', backgroundColor: 'var(--primary-subtle)', color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem', alignSelf: 'flex-start' }}>
                  {event.organizer}
                </div>
                
                <h3 style={{ fontSize: '1.125rem', margin: '0 0 1rem 0', lineHeight: 1.3 }}>{event.title}</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} /> {event.date}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} /> {event.location}
                  </div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <span style={{ fontWeight: 600, color: event.price === 'Free' ? 'var(--primary)' : 'var(--text-main)', fontSize: '0.9rem' }}>
                    {event.price}
                  </span>
                  <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Register</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
