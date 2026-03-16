import React, { useState } from 'react';
import { Calendar, MapPin, Users, Flame, Clock, Edit, Trash2, BarChart3, Mail, MessageCircle, Settings, CheckCircle, Download, Filter, Grid, List, Calendar as CalendarIcon, Plus, Search, ChevronDown, Eye, StopCircle, Send, QrCode, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrganizerEvents() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list');

  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'live', label: 'Live Now', count: 1 },
    { id: 'upcoming', label: 'Upcoming', count: 11 },
    { id: 'drafts', label: 'Drafts', count: 2 },
    { id: 'past', label: 'Past', count: 45 },
    { id: 'archived', label: 'Archived', count: 12 },
  ];

  const events = [
    {
      id: 1,
      title: 'ML Workshop - Deep Learning Fundamentals',
      date: 'March 12, 2024',
      time: '9:00 AM - 1:00 PM',
      location: 'Lab 3, Tech Park',
      organizer: 'ACM Chapter',
      type: 'Formal Event',
      status: 'live',
      registered: 89,
      checkedIn: 67,
      currentAttendance: 71,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80',
      color: 'var(--success)',
    },
    {
      id: 2,
      title: 'Cast Reveal - AARUUSH 2024',
      date: 'March 13, 2024',
      time: '6:00 PM - 8:00 PM',
      location: 'TP Auditorium',
      organizer: 'AARUUSH',
      type: 'Simple Post',
      status: 'upcoming',
      interested: 456,
      going: 234,
      maybe: 89,
      views: 1200,
      comments: 45,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
      color: 'var(--warning)',
    },
    {
      id: 3,
      title: 'CodeSprint 2024 (Hackathon)',
      date: 'March 15-16, 2024',
      time: '24-hour hackathon',
      location: 'Tech Park',
      organizer: 'ACM Chapter',
      type: 'Formal Event',
      status: 'upcoming',
      registered: 234,
      capacity: 300,
      waitlist: 12,
      teamsFormed: 45,
      soloParticipants: 34,
      registrationCloses: 'Tomorrow 11:59 PM',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
      color: 'var(--primary)',
    },
    {
      id: 4,
      title: 'Advanced React Workshop',
      date: 'March 16, 2024',
      time: '2:00 PM - 5:00 PM',
      location: 'Lab 3',
      organizer: 'GDSC',
      type: 'Formal Event',
      status: 'upcoming',
      registered: 89,
      capacity: 100,
      image: 'https://images.unsplash.com/photo-1633356122544-f133569408ea?auto=format&fit=crop&q=80',
      color: 'var(--success)',
    },
    {
      id: 5,
      title: 'Core Team Coffee Chat',
      date: 'March 14, 2024',
      time: '4:00 PM - 5:00 PM',
      location: 'Java Green',
      organizer: 'ACM Chapter',
      type: 'Quick Post',
      status: 'upcoming',
      interested: 23,
      going: 12,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80',
      color: 'var(--primary)',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>

      {/* Header with Create Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Calendar size={24} color="var(--primary)" /> Events Management
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>Manage all your club events in one place</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Duplicate from Template
          </button>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Create New Event
          </button>
        </div>
      </div>

      {/* Sub-Navigation Filters */}
      <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }} className="custom-scrollbar">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: activeFilter === filter.id ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                backgroundColor: activeFilter === filter.id ? 'var(--primary-light)' : 'transparent',
                color: activeFilter === filter.id ? 'var(--primary)' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: activeFilter === filter.id ? 600 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {filter.label}
              {filter.count !== undefined && (
                <span style={{
                  padding: '0.1rem 0.4rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: activeFilter === filter.id ? 'var(--primary)' : 'var(--bg-color)',
                  color: activeFilter === filter.id ? 'white' : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}>
                  {filter.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Filter Controls & View Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search events..."
                style={{
                  paddingLeft: '2.25rem',
                  paddingRight: '1rem',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--surface-color)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  width: '200px',
                }}
              />
            </div>
            <button className="btn btn-outline" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={16} /> Type <ChevronDown size={14} />
            </button>
            <button className="btn btn-outline" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={16} /> Date <ChevronDown size={14} />
            </button>
            <button className="btn btn-outline" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Status <ChevronDown size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: viewMode === 'list' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'list' ? 'white' : 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: viewMode === 'grid' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'grid' ? 'white' : 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Grid size={18} />
            </button>
            <button
              style={{
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'transparent',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CalendarIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {events.map(event => (
          <div key={event.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Event Header */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', flexShrink: 0 }}>
                <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: event.color,
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}>
                        {event.type}
                      </span>
                      {event.status === 'live' && (
                        <span style={{
                          padding: '0.25rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--danger)',
                          color: 'white',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}>
                          <Flame size={12} /> LIVE NOW
                        </span>
                      )}
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{event.title}</h3>
                  </div>
                  {event.status === 'live' && (
                    <button className="btn btn-outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
                      <StopCircle size={16} /> End Event
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} /> {event.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {event.time}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {event.location}</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--bg-color)',
              borderRadius: 'var(--radius-md)',
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Registered</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {event.registered || event.interested}
                  {event.capacity && <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/{event.capacity}</span>}
                </div>
                {event.waitlist && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--warning)', marginTop: '0.25rem' }}>Waitlist: {event.waitlist}</div>
                )}
              </div>
              {event.checkedIn && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Checked-in</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>{event.checkedIn}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {Math.round((event.checkedIn / event.registered) * 100)}% attendance
                  </div>
                </div>
              )}
              {event.going && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Going</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{event.going}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Maybe: {event.maybe}</div>
                </div>
              )}
              {event.rating && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Avg Rating</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--warning)' }}>{event.rating}/5</div>
                </div>
              )}
              {event.views && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Page Views</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>{event.views}</div>
                </div>
              )}
              {event.teamsFormed !== undefined && (
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Teams Formed</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{event.teamsFormed}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Solo: {event.soloParticipants}</div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BarChart3 size={18} /> Live Dashboard
              </button>
              <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <QrCode size={18} /> Check-in
              </button>
              <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Megaphone size={18} /> Announce
              </button>
              <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Edit size={18} /> Edit
              </button>
              <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={18} /> Email Attendees
              </button>
              <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Settings size={18} /> Settings
              </button>
              <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Eye size={18} /> Preview
              </button>
              <div style={{ flex: 1 }} />
              <button className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)' }}>
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <button className="btn btn-outline">Load more events...</button>
      </div>

    </div>
  );
}

// Helper component for megaphone icon
function Megaphone({ size, style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="m3 11 18-5v12L3 14v-3z"/>
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
    </svg>
  );
}
