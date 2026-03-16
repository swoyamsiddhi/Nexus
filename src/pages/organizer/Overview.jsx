import React, { useState } from 'react';
import { Calendar, MapPin, Users, Flame, Zap, TrendingUp, TrendingDown, MessageSquare, Star, Clock, Bell, CheckCircle, AlertTriangle, Info, ChevronRight, Plus, Megaphone, BarChart3, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrganizerOverview() {
  const [dateRange, setDateRange] = useState('This Week');

  const kpiMetrics = [
    { id: 'events', label: 'Events', value: '3', period: 'This Week', change: 12, positive: true, icon: Calendar, color: 'var(--primary)' },
    { id: 'reach', label: 'Reach', value: '1,247', period: 'Students Reached', change: 5, positive: true, icon: Users, color: 'var(--success)' },
    { id: 'engagement', label: 'Engagement', value: '78%', period: 'Avg Attend Rate', change: 2, positive: false, icon: Zap, color: 'var(--warning)' },
    { id: 'posts', label: 'Posts', value: '8', period: 'This Week', change: 3, positive: true, icon: MessageSquare, color: 'var(--primary)' },
    { id: 'comments', label: 'Comments', value: '156', period: 'This Week', change: 23, positive: true, icon: MessageSquare, color: 'var(--success)' },
    { id: 'rating', label: 'Rating', value: '4.6/5', period: 'Avg Event', change: 0.2, positive: true, icon: Star, color: 'var(--warning)' },
  ];

  const activityTimeline = [
    { day: 'Monday, March 10', events: [
      { time: '9:00 AM', type: 'post', title: 'Posted: CodeSprint Registration Open', icon: MessageSquare },
      { time: '2:00 PM', type: 'registration', title: '45 new registrations (234 total)', icon: Users },
      { time: '6:00 PM', type: 'announcement', title: 'Venue change notification', icon: Megaphone },
    ]},
    { day: 'Tuesday, March 11', events: [
      { time: '10:00 AM', type: 'post', title: 'Cast Reveal teaser', icon: MessageSquare },
      { time: '11:30 AM', type: 'comment', title: '23 comments on Cast Reveal post', icon: MessageSquare },
      { time: '4:00 PM', type: 'team', title: '12 new team formations for hackathon', icon: Users },
    ]},
    { day: 'Wednesday, March 12 (Today)', events: [
      { time: '9:00 AM', type: 'live', title: 'LIVE: ML Workshop starting now', icon: Flame, highlight: true },
      { time: '9:15 AM', type: 'checkin', title: '89 students checked in', icon: CheckCircle },
      { time: 'NOW', type: 'reminder', title: 'Cast Reveal in 6 hours (6:00 PM)', icon: Clock, highlight: true },
    ]},
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Cast Reveal - AARUUSH 2024',
      time: 'TODAY 6:00 PM',
      location: 'TP Auditorium',
      interested: 456,
      status: 'live',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
      actions: ['Manage', 'Check-in', 'Live Stats']
    },
    {
      id: 2,
      title: 'CodeSprint 2024 (Hackathon)',
      time: 'TOMORROW 9:00 AM',
      location: 'Tech Park',
      registered: 234,
      status: 'live',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
      actions: ['Manage', 'Check-in Scanner', 'Send Alert']
    },
    {
      id: 3,
      title: 'Advanced React Workshop',
      time: 'SATURDAY 2:00 PM',
      location: 'Lab 3',
      registered: 89,
      spotsLeft: 11,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80',
      actions: ['Edit', 'View Registrations', 'Promote']
    },
  ];

  const quickActions = [
    { label: 'Create Formal Event', icon: Plus, primary: true },
    { label: 'Quick Post', icon: MessageSquare, primary: false },
    { label: 'Broadcast', icon: Megaphone, primary: false },
    { label: 'Invite Members', icon: Users, primary: false },
    { label: 'View Reports', icon: BarChart3, primary: false },
  ];

  const alerts = [
    { type: 'warning', title: 'CodeSprint at 85% capacity (only 45 spots left)', icon: AlertTriangle },
    { type: 'info', title: '23 students requested team formation help', icon: Info },
    { type: 'warning', title: 'Cast Reveal venue needs confirmation', icon: AlertTriangle },
    { type: 'success', title: 'ML Workshop feedback: 4.8/5 rating', icon: CheckCircle },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '3rem' }}>

      {/* Date Range Filter */}
      <div className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>Showing:</span>
          {['This Week', 'This Month', 'This Semester', 'Custom'].map(range => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: dateRange === range ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                backgroundColor: dateRange === range ? 'var(--primary-light)' : 'transparent',
                color: dateRange === range ? 'var(--primary)' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: dateRange === range ? 600 : 500,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              {range}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <Calendar size={16} />
          <span>March 10 - March 16, 2026</span>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="responsive-grid-sm" style={{ gap: '1.25rem' }}>
        {kpiMetrics.map(kpi => (
          <div key={kpi.id} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: `${kpi.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <kpi.icon size={20} color={kpi.color} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{kpi.label}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>{kpi.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{kpi.period}</div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: kpi.positive ? 'var(--success-bg)' : 'var(--danger-bg)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: kpi.positive ? 'var(--success)' : 'var(--danger)',
              }}>
                {kpi.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{kpi.positive ? '+' : '-'}{kpi.change}%</span>
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>vs last {dateRange.toLowerCase()}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="show-on-desktop">

        {/* Activity Timeline */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="var(--primary)" /> This Week's Activity
            </h2>
            <Link to="#" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500 }}>View full log →</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {activityTimeline.map(day => (
              <div key={day.day} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{day.day}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--border-color)' }}>
                  {day.events.map((event, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: event.highlight ? 'var(--primary-light)' : 'transparent',
                      border: event.highlight ? '1px solid var(--primary)' : 'none',
                    }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: event.highlight ? 'var(--primary)' : 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <event.icon size={16} color={event.highlight ? 'white' : 'var(--text-muted)'} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{event.time}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '0.1rem' }}>{event.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} color="var(--primary)" /> Upcoming Events
            </h2>
            <Link to="/organizer/events" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500 }}>View all 12 →</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {upcomingEvents.map(event => (
              <div key={event.id} style={{
                display: 'flex',
                gap: '1rem',
                padding: '1rem',
                borderRadius: 'var(--radius-lg)',
                border: event.status === 'live' ? '2px solid var(--danger)' : '1px solid var(--border-color)',
                backgroundColor: 'var(--surface-color)',
              }}>
                <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '1rem', margin: 0, flex: 1 }}>{event.title}</h3>
                    {event.status === 'live' && (
                      <span style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--danger)', color: 'white', fontSize: '0.65rem', fontWeight: 700 }}>LIVE</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {event.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {event.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Users size={14} /> {event.interested || event.registered} {event.status === 'live' ? 'registered' : 'interested' }</span>
                    {event.spotsLeft && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--warning)' }}><Info size={14} /> {event.spotsLeft} spots left</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {event.actions.map(action => (
                      <button key={action} className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}>
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {quickActions.map(action => (
            <Link
              key={action.label}
              to={action.label === 'Create Formal Event' ? '/organizer/events?action=create' : action.label === 'View Reports' ? '/organizer/reports' : '#'}
              className={action.primary ? 'btn btn-primary' : 'btn btn-outline'}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <action.icon size={18} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={18} color="var(--warning)" /> Recent Alerts & Notifications
          </h2>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-ghost" style={{ fontSize: '0.85rem' }}>Mark all read</button>
            <Link to="#" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500 }}>View all →</Link>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {alerts.map((alert, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: alert.type === 'warning' ? 'var(--warning-bg)' : alert.type === 'success' ? 'var(--success-bg)' : 'var(--primary-light)',
              borderLeft: alert.type === 'warning' ? '3px solid var(--warning)' : alert.type === 'success' ? '3px solid var(--success)' : '3px solid var(--primary)',
            }}>
              <alert.icon size={18} color={alert.type === 'warning' ? 'var(--warning)' : alert.type === 'success' ? 'var(--success)' : 'var(--primary)'} />
              <span style={{ flex: 1, fontSize: '0.9rem', color: 'var(--text-main)' }}>{alert.title}</span>
              <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
