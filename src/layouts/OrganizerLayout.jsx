import React, { useState } from 'react';
import { Network, Search, Bell, MessageSquare, Plus, Menu, BarChart3, Calendar, Megaphone, Users, MessageCircle, FileText, Settings, ChevronDown, ArrowLeftRight, Building2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function OrganizerLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('organizer'); // 'student' or 'organizer'
  const [selectedClub, setSelectedClub] = useState('ACM Chapter');
  const [activeTab, setActiveTab] = useState('overview');

  const navTabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3, path: '/organizer' },
    { id: 'events', name: 'Events', icon: Calendar, path: '/organizer/events' },
    { id: 'quick-posts', name: 'Quick Posts', icon: Megaphone, path: '/organizer/quick-posts' },
    { id: 'members', name: 'Members', icon: Users, path: '/organizer/members' },
    { id: 'announcements', name: 'Announcements', icon: MessageCircle, path: '/organizer/announcements' },
    { id: 'reports', name: 'Reports', icon: FileText, path: '/organizer/reports' },
    { id: 'settings', name: 'Settings', icon: Settings, path: '/organizer/settings' },
  ];

  const handleSwitchToStudent = () => {
    navigate('/');
  };

  return (
    <div className="organizer-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Navigation Bar */}
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
          <Link to="/organizer" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary)', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <Network size={20} strokeWidth={2.5} />
            </div>
            <span className="hide-on-mobile" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-main)' }}>SRM Connect</span>
          </Link>

          {/* Search Bar */}
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
          }} className="hide-on-mobile">
            <Search size={16} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
            <input
              type="text"
              placeholder="Search events, members, posts..."
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
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Context Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--primary-light)',
            borderRadius: 'var(--radius-lg)',
            fontSize: '0.85rem',
          }} className="hide-on-mobile">
            <Building2 size={16} color="var(--primary)" />
            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{selectedClub}</span>
            <button
              onClick={handleSwitchToStudent}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 500,
              }}
            >
              <ArrowLeftRight size={14} />
              <span className="hide-on-mobile">Switch to Student</span>
            </button>
          </div>

          {/* Notifications */}
          <button className="apple-icon-btn" style={{ position: 'relative' }}>
            <Bell size={18} strokeWidth={2} />
            <span className="notification-dot" style={{ position: 'absolute', top: '8px', right: '8px' }}></span>
          </button>

          {/* Profile */}
          <div style={{
            width: '34px', height: '34px',
            borderRadius: '50%', overflow: 'hidden',
            cursor: 'pointer', border: '2px solid white',
            boxShadow: '0 0 0 1px var(--border-color)'
          }}>
            <img src="https://i.pravatar.cc/150?u=organizer" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <nav style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--surface-color)',
        position: 'sticky',
        top: '64px',
        zIndex: 99,
        overflowX: 'auto',
      }} className="custom-scrollbar">
        <div style={{
          display: 'flex',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          padding: '0 2rem',
        }}>
          {navTabs.map(tab => {
            const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path + '/');
            return (
              <Link
                key={tab.id}
                to={tab.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 1.25rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = 'var(--bg-color)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <tab.icon size={18} />
                <span className="hide-on-mobile">{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Page Content */}
      <main style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--bg-color)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          { /* Content will be rendered by Outlet */ }
        </div>
      </main>
    </div>
  );
}
