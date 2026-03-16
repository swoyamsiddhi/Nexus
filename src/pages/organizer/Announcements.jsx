import React, { useState } from 'react';
import { Megaphone, Mail, MessageSquare, Bell, Send, FileText, Calendar, Users, Upload, Eye, Save, ChevronDown, CheckCircle, TrendingUp, BarChart3, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Announcements() {
  const [selectedRecipients, setSelectedRecipients] = useState('event');
  const [selectedChannels, setSelectedChannels] = useState(['in-app', 'email']);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const templates = [
    { id: 'reminder', label: 'Event Reminder', icon: Calendar, color: 'var(--primary)' },
    { id: 'venue', label: 'Venue Change', icon: MapPin, color: 'var(--warning)' },
    { id: 'cancellation', label: 'Cancellation', icon: XCircle, color: 'var(--danger)' },
    { id: 'thankyou', label: 'Thank You', icon: Heart, color: 'var(--success)' },
    { id: 'volunteers', label: 'Call for Volunteers', icon: Users, color: 'var(--primary)' },
    { id: 'registration', label: 'Registration Open', icon: CheckCircle, color: 'var(--success)' },
    { id: 'lastchance', label: 'Last Chance', icon: Clock, color: 'var(--warning)' },
  ];

  const broadcastHistory = [
    {
      id: 1,
      title: 'CodeSprint venue change',
      sentAt: 'Today, 10:30 AM',
      recipients: 234,
      status: 'sent',
      opened: 89,
      clicked: 45,
      type: 'venue',
    },
    {
      id: 2,
      title: 'Cast Reveal reminder',
      sentAt: 'Yesterday, 6:00 PM',
      recipients: 456,
      status: 'sent',
      opened: 67,
      rsvpIncrease: 23,
      type: 'reminder',
    },
    {
      id: 3,
      title: 'ML Workshop feedback request',
      sentAt: 'March 10, 2:00 PM',
      recipients: 89,
      status: 'sent',
      opened: 72,
      clicked: 58,
      type: 'thankyou',
    },
  ];

  const handleChannelToggle = (channel) => {
    setSelectedChannels(prev =>
      prev.includes(channel)
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '3rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Megaphone size={24} color="var(--primary)" /> Mass Communication Center
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>
            Send targeted announcements to your club members and event participants
          </p>
        </div>
      </div>

      {/* Create Broadcast */}
      <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Create New Broadcast</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <Mail size={16} /> Email
            </button>
            <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <MessageSquare size={16} /> SMS
            </button>
            <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <Bell size={16} /> Push
            </button>
          </div>
        </div>

        {/* Templates */}
        <div>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Templates</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem' }}>
            {templates.map(template => (
              <button
                key={template.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--surface-color)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = template.color;
                  e.target.style.backgroundColor = `${template.color}10`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'var(--border-color)';
                  e.target.style.backgroundColor = 'var(--surface-color)';
                }}
              >
                <template.icon size={16} color={template.color} />
                {template.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recipients Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Recipients</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
            {[
              { id: 'all', label: 'All club members', count: 127, icon: Users },
              { id: 'event', label: 'Event participants', count: 234, event: 'CodeSprint 2024', icon: Calendar },
              { id: 'team', label: 'Specific team', count: 8, team: 'Technical Team', icon: Users },
              { id: 'custom', label: 'Custom list', subtitle: 'Upload CSV', icon: Upload },
            ].map(option => (
              <label
                key={option.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: selectedRecipients === option.id ? '2px solid var(--primary)' : '1px solid transparent',
                  backgroundColor: selectedRecipients === option.id ? 'var(--primary-light)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <input
                  type="radio"
                  name="recipients"
                  value={option.id}
                  checked={selectedRecipients === option.id}
                  onChange={(e) => setSelectedRecipients(e.target.value)}
                  style={{ accentColor: 'var(--primary)' }}
                />
                <option.icon size={18} color="var(--text-muted)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{option.label}</div>
                  {option.count && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {option.count} {option.count === 1 ? 'member' : 'members'}
                      {option.event && ` • ${option.event}`}
                      {option.team && ` • ${option.team}`}
                    </div>
                  )}
                  {option.subtitle && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{option.subtitle}</div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Channels Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Channels</label>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              { id: 'in-app', label: 'In-app notification', icon: Bell, premium: false },
              { id: 'email', label: 'Email', icon: Mail, premium: false },
              { id: 'sms', label: 'SMS (premium)', icon: MessageSquare, premium: true },
              { id: 'push', label: 'Push notification', icon: Bell, premium: false },
            ].map(channel => (
              <label
                key={channel.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: selectedChannels.includes(channel.id) ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  backgroundColor: selectedChannels.includes(channel.id) ? 'var(--primary-light)' : 'transparent',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: channel.premium ? 'var(--text-muted)' : 'var(--text-main)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedChannels.includes(channel.id)}
                  onChange={() => handleChannelToggle(channel.id)}
                  style={{ accentColor: 'var(--primary)' }}
                />
                <channel.icon size={16} />
                {channel.label}
              </label>
            ))}
          </div>
        </div>

        {/* Message Composition */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Message</label>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input"
            style={{ fontWeight: 600, fontSize: '0.95rem' }}
          />
          <textarea
            placeholder="Write your message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="input"
            style={{ minHeight: '150px', resize: 'vertical', fontFamily: 'var(--font-sans)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-outline" style={{ fontSize: '0.85rem' }}>📎 Add file</button>
              <button className="btn btn-outline" style={{ fontSize: '0.85rem' }}>📅 Add to calendar invite</button>
            </div>
            <span style={{ fontSize: '0.85rem', color: body.length > 400 ? 'var(--danger)' : 'var(--text-muted)' }}>
              {body.length}/500 characters
            </span>
          </div>
        </div>

        {/* Schedule & Send */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye size={16} /> Preview
            </button>
            <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Save size={16} /> Save Draft
            </button>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <select
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--surface-color)',
                fontSize: '0.85rem',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option>Send Now</option>
              <option>Schedule for later</option>
            </select>
            <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Send size={18} /> Send Broadcast
            </button>
          </div>
        </div>
      </div>

      {/* Broadcast History */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={20} color="var(--primary)" /> Broadcast History
          </h2>
          <Link to="#" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500 }}>View all 23 broadcasts →</Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {broadcastHistory.map(broadcast => (
            <div key={broadcast.id} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: broadcast.type === 'venue' ? 'var(--warning-bg)' : broadcast.type === 'reminder' ? 'var(--primary-light)' : 'var(--success-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <CheckCircle size={20} color={broadcast.type === 'venue' ? 'var(--warning)' : broadcast.type === 'reminder' ? 'var(--primary)' : 'var(--success)'} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>{broadcast.title}</h3>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Sent: {broadcast.sentAt} • Recipients: {broadcast.recipients}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-outline" style={{ fontSize: '0.85rem' }}>View Details</button>
                  <button className="btn btn-outline" style={{ fontSize: '0.85rem' }}>Archive</button>
                </div>
              </div>

              {/* Analytics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: 'var(--radius-md)',
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Open Rate</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>{broadcast.opened}%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {Math.round((broadcast.opened / 100) * broadcast.recipients)} opened
                  </div>
                </div>
                {broadcast.clicked && (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Click Rate</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{broadcast.clicked}%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      {Math.round((broadcast.clicked / 100) * broadcast.recipients)} clicked
                    </div>
                  </div>
                )}
                {broadcast.rsvpIncrease && (
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>RSVP Increase</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>+{broadcast.rsvpIncrease}%</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// Helper icons
function MapPin({ size, style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function XCircle({ size, style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <circle cx="12" cy="12" r="10"/>
      <path d="m15 9-6 6"/>
      <path d="m9 9 6 6"/>
    </svg>
  );
}

function Heart({ size, style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}

function Clock({ size, style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
