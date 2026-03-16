import React, { useState } from 'react';
import { Megaphone, Calendar, Clock, Users, MessageSquare, Eye, Edit, Trash2, TrendingUp, Zap, Music, Camera, Coffee, Info, Star, Search, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuickPosts() {
  const [activeTab, setActiveTab] = useState('active');

  const postTemplates = [
    { id: 'cast-reveal', label: 'Cast Reveal', icon: Music, color: 'var(--warning)' },
    { id: 'meetup', label: 'Meetup', icon: Coffee, color: 'var(--primary)' },
    { id: 'announcement', label: 'Announcement', icon: Info, color: 'var(--success)' },
    { id: 'launch', label: 'Launch', icon: Zap, color: 'var(--primary)' },
    { id: 'reminder', label: 'Reminder', icon: Clock, color: 'var(--warning)' },
    { id: 'performance', label: 'Performance', icon: Music, color: 'var(--danger)' },
    { id: 'photoshoot', label: 'Photoshoot', icon: Camera, color: 'var(--primary)' },
    { id: 'party', label: 'Party', icon: PartyIcon, color: 'var(--success)' },
  ];

  const activePosts = [
    {
      id: 1,
      type: 'Cast Reveal',
      title: 'Cast Reveal - AARUUSH 2024',
      postedAt: 'Today, 2:00 PM',
      eventTime: 'Today, 6:00 PM',
      location: 'TP Auditorium',
      status: 'active',
      views: 1234,
      interested: 456,
      comments: 67,
      going: 234,
      maybe: 89,
      cantGo: 45,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
      recentActivity: [
        { time: '2 min ago', text: 'Priya commented "Can\'t wait!"' },
        { time: '5 min ago', text: '12 new "Going" responses' },
        { time: '15 min ago', text: 'Shared by Rahul to 3 friends' },
      ],
    },
    {
      id: 2,
      type: 'Meetup',
      title: 'Core Team Coffee Chat',
      postedAt: 'Yesterday, 3:00 PM',
      eventTime: 'Tomorrow, 4:00 PM',
      location: 'Java Green',
      status: 'active',
      interested: 23,
      going: 12,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80',
    },
  ];

  const scheduledPosts = [
    { id: 1, title: 'Volunteer recruitment', scheduledFor: 'March 20, 9:00 AM', type: 'Announcement' },
    { id: 2, title: 'Post-hackathon party', scheduledFor: 'March 17, 6:00 PM', type: 'Party' },
  ];

  const pastPosts = [
    { id: 1, title: 'Teaser Launch', views: 156, comments: 45, date: 'March 5, 2024' },
    { id: 2, title: 'Photoshoot Announcement', views: 89, comments: 12, date: 'March 1, 2024' },
    { id: 3, title: 'Team Formation Drive', views: 234, comments: 78, date: 'February 28, 2024' },
    { id: 4, title: 'Workshop Reminder', views: 178, comments: 23, date: 'February 25, 2024' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Megaphone size={24} color="var(--primary)" /> Quick Posts
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>
            Low-friction announcements: Cast reveals, meetups, reminders, social gatherings
          </p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Create Quick Post
        </button>
      </div>

      {/* Template Selector */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Create Quick Post (One-click templates)</h2>
          <Link to="#" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500 }}>Learn more →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {postTemplates.map(template => (
            <button
              key={template.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--surface-color)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = template.color;
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--border-color)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: `${template.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <template.icon size={24} color={template.color} />
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{template.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        {[
          { id: 'active', label: 'Active Posts', count: 2 },
          { id: 'scheduled', label: 'Scheduled', count: 2 },
          { id: 'past', label: 'Past', count: 45 },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: activeTab === tab.id ? 'var(--primary-light)' : 'transparent',
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: activeTab === tab.id ? 600 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all var(--transition-fast)',
            }}
          >
            {tab.label}
            <span style={{
              padding: '0.1rem 0.4rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--bg-color)',
              color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Active Posts */}
      {activeTab === 'active' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {activePosts.map(post => (
            <div key={post.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Post Header */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: post.type === 'Cast Reveal' ? 'var(--warning)' : 'var(--primary)',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}>
                        {post.type}
                      </span>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--success)',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                    }}>
                      Active
                    </span>
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{post.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>Posted: {post.postedAt}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} /> {post.eventTime}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Users size={14} /> {post.location}</span>
                  </div>
                </div>
              </div>

              {/* Engagement Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: 'var(--radius-md)',
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Views</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>{post.views}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Interested</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--warning)' }}>{post.interested}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Going</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>{post.going}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Comments</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{post.comments}</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Edit size={18} /> Edit
                </button>
                <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={18} /> Bump
                </button>
                <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Megaphone size={18} /> Reminder
                </button>
                <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BarChart3 size={18} /> Stats
                </button>
                <div style={{ flex: 1 }} />
                <button className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)' }}>
                  <Trash2 size={18} /> End
                </button>
              </div>

              {/* Recent Activity */}
              {post.recentActivity && (
                <div style={{ padding: '1rem', backgroundColor: 'var(--primary-subtle)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '0.75rem' }}>Recent Activity</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {post.recentActivity.map((activity, idx) => (
                      <div key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: '70px' }}>{activity.time}</span>
                        <span>{activity.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Scheduled Posts */}
      {activeTab === 'scheduled' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {scheduledPosts.map(post => (
            <div key={post.id} className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--warning-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Clock size={20} color="var(--warning)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{post.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {post.type} • Scheduled for {post.scheduledFor}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-outline" style={{ fontSize: '0.85rem' }}>Edit</button>
                <button className="btn btn-outline" style={{ fontSize: '0.85rem' }}>Post now</button>
                <button className="btn btn-ghost" style={{ fontSize: '0.85rem', color: 'var(--danger)' }}>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Past Posts */}
      {activeTab === 'past' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search past posts..."
                  style={{
                    paddingLeft: '2.25rem',
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
                <Filter size={16} /> Filter by month
              </button>
            </div>
            <Link to="#" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500 }}>View all 45 past posts →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {pastPosts.map(post => (
              <div key={post.id} className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{post.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.date}</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Eye size={14} /> {post.views}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MessageSquare size={14} /> {post.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

// Helper component
function BarChart3({ size, style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M3 3v18h18"/>
      <path d="M18 17V9"/>
      <path d="M13 17V5"/>
      <path d="M8 17v-3"/>
    </svg>
  );
}
