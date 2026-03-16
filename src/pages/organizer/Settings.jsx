import React, { useState } from 'react';
import { Settings, Building2, Users, Calendar, Bell, Link as LinkIcon, AlertTriangle, Save, Upload, Camera, ExternalLink, Shield, CheckCircle, X, ChevronRight, LogOut, Archive, Trash2 } from 'lucide-react';

export default function ClubSettings() {
  const [activeSection, setActiveSection] = useState('profile');

  const clubProfile = {
    name: 'ACM Student Chapter',
    shortName: 'ACM',
    description: 'Official ACM chapter at SRM University. We organize technical workshops, hackathons, and coding competitions to foster learning and innovation in the student community.',
    established: '2019',
  };

  const socialLinks = {
    website: 'https://acm.srmuniversity.com',
    instagram: '@acm_srm',
    linkedin: 'linkedin.com/company/acm-srm',
    twitter: '@acm_srm',
  };

  const memberRoles = [
    { id: 1, name: 'President', count: 1, color: 'var(--primary)' },
    { id: 2, name: 'Vice-President', count: 1, color: 'var(--primary)' },
    { id: 3, name: 'Secretary', count: 1, color: 'var(--primary)' },
    { id: 4, name: 'Treasurer', count: 1, color: 'var(--primary)' },
    { id: 5, name: 'Technical Lead', count: 2, color: 'var(--success)' },
    { id: 6, name: 'Design Lead', count: 1, color: 'var(--warning)' },
    { id: 7, name: 'Marketing Lead', count: 1, color: 'var(--warning)' },
    { id: 8, name: 'Core Team', count: 6, color: 'var(--primary-light)' },
    { id: 9, name: 'Member', count: 89, color: 'var(--bg-color)' },
    { id: 10, name: 'Alumni', count: 24, color: 'var(--text-muted)' },
  ];

  const integrations = [
    { id: 'calendar', name: 'Google Calendar', description: 'Sync events to Google Calendar', enabled: true, icon: '📅' },
    { id: 'whatsapp', name: 'WhatsApp Business', description: 'Broadcast messages via WhatsApp', enabled: true, icon: '💬' },
    { id: 'discord', name: 'Discord', description: 'Connect to community server', enabled: false, icon: '🎮' },
    { id: 'stripe', name: 'Stripe', description: 'Payment collection for events', enabled: false, icon: '💳' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '3rem' }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Settings size={24} color="var(--primary)" /> Club Settings
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>
          Manage your club profile, membership, and preferences
        </p>
      </div>

      {/* Section Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { id: 'profile', label: 'Club Profile', icon: Building2 },
          { id: 'membership', label: 'Membership', icon: Users },
          { id: 'events', label: 'Event Defaults', icon: Calendar },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'integrations', label: 'Integrations', icon: LinkIcon },
        ].map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: activeSection === section.id ? 'var(--primary-light)' : 'var(--surface-color)',
              color: activeSection === section.id ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: activeSection === section.id ? 600 : 500,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            <section.icon size={18} />
            <span className="hide-on-mobile">{section.label}</span>
          </button>
        ))}
      </div>

      {/* Club Profile Section */}
      {activeSection === 'profile' && (
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building2 size={20} color="var(--primary)" /> Club Profile
          </h2>

          {/* Logo & Cover Upload */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }} className="show-on-desktop">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Club Logo</label>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                margin: '0 auto',
              }}>
                <Building2 size={48} />
              </div>
              <button className="btn btn-outline" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Camera size={16} /> Upload new
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Cover Image</label>
              <div style={{
                height: '120px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-color)',
                border: '2px dashed var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
              }}>
                <Upload size={24} style={{ marginRight: '0.5rem' }} /> Upload cover image
              </div>
            </div>
          </div>

          {/* Club Info Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Club Name</label>
              <input type="text" defaultValue={clubProfile.name} className="input" />
            </div>
            <div className="form-group">
              <label>Short Name</label>
              <input type="text" defaultValue={clubProfile.shortName} className="input" />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea defaultValue={clubProfile.description} className="input" style={{ minHeight: '120px' }} />
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', margin: 0 }}>Social Links</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label>Website</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="text" defaultValue={socialLinks.website} className="input" />
                  <button className="btn btn-outline" style={{ padding: '0.5rem' }}>
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Instagram</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="text" defaultValue={socialLinks.instagram} className="input" />
                  <button className="btn btn-outline" style={{ padding: '0.5rem' }}>
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>LinkedIn</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="text" defaultValue={socialLinks.linkedin} className="input" />
                  <button className="btn btn-outline" style={{ padding: '0.5rem' }}>
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Twitter</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="text" defaultValue={socialLinks.twitter} className="input" />
                  <button className="btn btn-outline" style={{ padding: '0.5rem' }}>
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
            <Save size={18} /> Save Changes
          </button>
        </div>
      )}

      {/* Membership Settings Section */}
      {activeSection === 'membership' && (
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={20} color="var(--primary)" /> Membership Settings
          </h2>

          {/* Join Mode */}
          <div>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>Join Mode</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { id: 'open', label: 'Open', subtitle: 'Anyone can join without approval' },
                { id: 'approval', label: 'Approval required', subtitle: 'New members need admin approval', default: true },
                { id: 'invite', label: 'Invite only', subtitle: 'Only invited members can join' },
              ].map(mode => (
                <label
                  key={mode.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: mode.default ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    backgroundColor: mode.default ? 'var(--primary-light)' : 'var(--surface-color)',
                    cursor: 'pointer',
                  }}
                >
                  <input type="radio" name="joinMode" defaultChecked={mode.default} style={{ accentColor: 'var(--primary)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{mode.label}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{mode.subtitle}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>Eligibility</label>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} /> SRM students only
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} /> All departments
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} /> All years
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', opacity: 0.5 }}>
                <input type="checkbox" disabled style={{ accentColor: 'var(--primary)' }} /> Specific departments (disabled when "All departments" is checked)
              </label>
            </div>
          </div>

          {/* Member Roles */}
          <div>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>Member Roles</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {memberRoles.map(role => (
                <div
                  key={role.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${role.color === 'var(--bg-color)' ? 'var(--border-color)' : role.color}`,
                    backgroundColor: role.color === 'var(--bg-color)' ? 'var(--surface-color)' : `${role.color}10`,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{role.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{role.count} members</div>
                  </div>
                  {role.count > 0 && (
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: role.color,
                      color: role.color === 'var(--bg-color)' || role.color === 'var(--text-muted)' ? 'var(--text-main)' : 'white',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}>
                      {role.count}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <button className="btn btn-outline" style={{ marginTop: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={16} /> Add Custom Role
            </button>
          </div>

          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
            <Save size={18} /> Save Changes
          </button>
        </div>
      )}

      {/* Event Defaults Section */}
      {activeSection === 'events' && (
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} color="var(--primary)" /> Event Defaults
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Registration opens</label>
              <select className="input" defaultValue="7">
                <option value="1">1 day before event</option>
                <option value="3">3 days before event</option>
                <option value="7">7 days before event</option>
                <option value="14">14 days before event</option>
                <option value="30">30 days before event</option>
              </select>
            </div>
            <div className="form-group">
              <label>Registration closes</label>
              <select className="input" defaultValue="1">
                <option value="0">At event start</option>
                <option value="1">1 day before event</option>
                <option value="3">3 days before event</option>
                <option value="7">7 days before event</option>
              </select>
            </div>
            <div className="form-group">
              <label>Max participants</label>
              <select className="input" defaultValue="300">
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
              </select>
            </div>
            <div className="form-group">
              <label>Waitlist</label>
              <select className="input" defaultValue="enable">
                <option value="enable">Enable waitlist</option>
                <option value="disable">Disable waitlist</option>
              </select>
            </div>
          </div>

          {/* Certificate Settings */}
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} /> Auto-generate certificates for formal events
            </label>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem', marginLeft: '1.5rem' }}>
              Certificates will be automatically created and emailed to attendees after event completion
            </p>
          </div>

          {/* Notification Preferences */}
          <div>
            <h3 style={{ fontSize: '1rem', margin: '0 0 1rem 0' }}>Notification Preferences</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
              {[
                { id: 'registration', label: 'New registration', default: true },
                { id: 'cancellation', label: 'Cancellation', default: true },
                { id: 'waitlist', label: 'Waitlist promotion', default: false },
                { id: 'comment', label: 'Comment on event', default: true },
                { id: 'summary', label: 'Daily summary', default: false },
              ].map(pref => (
                <label key={pref.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <input type="checkbox" defaultChecked={pref.default} style={{ accentColor: 'var(--primary)' }} />
                  {pref.label}
                </label>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
            <Save size={18} /> Save Changes
          </button>
        </div>
      )}

      {/* Integrations Section */}
      {activeSection === 'integrations' && (
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LinkIcon size={20} color="var(--primary)" /> Integrations
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {integrations.map(integration => (
              <div
                key={integration.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--surface-color)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: integration.enabled ? 'var(--success-bg)' : 'var(--bg-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}>
                    {integration.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{integration.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{integration.description}</div>
                  </div>
                </div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: integration.enabled ? 'var(--success)' : 'var(--bg-color)',
                  color: integration.enabled ? 'white' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  transition: 'all var(--transition-fast)',
                }}>
                  <input
                    type="checkbox"
                    checked={integration.enabled}
                    onChange={() => {}}
                    style={{ display: 'none' }}
                  />
                  {integration.enabled ? 'Connected' : 'Connect'}
                  <ChevronRight size={14} />
                </label>
              </div>
            ))}
          </div>

          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
            <LinkIcon size={18} /> Connect New Integration
          </button>
        </div>
      )}

      {/* Danger Zone */}
      <div className="card" style={{ padding: '1.5rem', border: '1px solid var(--danger)', backgroundColor: 'var(--danger-bg)' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)' }}>
          <AlertTriangle size={20} /> Danger Zone
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Irreversible actions that affect your club and all its data
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={18} /> Transfer Ownership
          </button>
          <button className="btn btn-outline" style={{ borderColor: 'var(--warning)', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Archive size={18} /> Archive Club
          </button>
          <button className="btn btn-outline" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trash2 size={18} /> Delete Club
          </button>
        </div>
      </div>

    </div>
  );
}

// Helper icon
function Plus({ size, style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
