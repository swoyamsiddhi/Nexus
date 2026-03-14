import { Network, Search, Bell, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Teams', path: '/teams' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
  ];

  return (
    <header className="glass" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary)', textDecoration: 'none' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <Network size={20} strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-main)' }}>SRM Connect</span>
        </Link>
        
        <nav style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
          {navLinks.map(link => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link 
                key={link.name} 
                to={link.path}
                style={{
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  transition: 'all var(--transition-fast)'
                }}
                className={isActive ? '' : 'btn-ghost'}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: 'var(--bg-color)',
          border: '1px solid var(--border-color)',
          padding: '0.4rem 1rem',
          borderRadius: 'var(--radius-full)',
          width: '280px',
          boxShadow: 'var(--shadow-inner)',
          transition: 'all var(--transition-fast)'
        }} className="search-container">
          <Search size={16} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
          <input 
            type="text" 
            placeholder="Search projects, events, or skills..." 
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '0.85rem',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>

        <button className="btn-ghost" style={{ padding: '0.5rem', borderRadius: '50%', color: 'var(--text-muted)' }}>
          <Bell size={20} />
        </button>
        <button className="btn-ghost" style={{ padding: '0.5rem', borderRadius: '50%', color: 'var(--text-muted)' }}>
          <MessageSquare size={20} />
        </button>
        
        <div style={{ 
          width: '34px', height: '34px', 
          borderRadius: '50%', overflow: 'hidden', 
          cursor: 'pointer', border: '2px solid white',
          boxShadow: '0 0 0 1px var(--border-color)'
        }}>
          <img src="https://i.pravatar.cc/150?u=srmconnect" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </header>
  );
}
