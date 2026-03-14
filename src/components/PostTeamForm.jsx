import React, { useState } from 'react';
import { Search, Plus, X, Users, Compass, ChevronRight, Check } from 'lucide-react';

const MOCK_EVENTS = [
  { id: 1, title: 'CodeSprint 2024 (Hackathon)', date: 'March 15-16', desc: '24-hour hackathon' },
  { id: 2, title: 'Ideathon 2024', date: 'March 20', desc: '8-hour ideation challenge' }
];

const PostTeamForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    eventId: null,
    intent: 'create', // 'create' or 'join'
    teamName: '',
    description: '',
    size: '2-4 members',
    skillsHave: ['Machine Learning', 'Python'],
    skillsNeed: ['Frontend Developer', 'UI Design'],
    urgency: 'Need before event',
    experience: 'Any level',
    idea: '',
    visibility: 'Public'
  });

  const [searchQuery, setSearchQuery] = useState('');

  const updateField = (field, value) => setFormData({ ...formData, [field]: value });

  const addSkill = (type, skill) => {
    if (!skill) return;
    const field = type === 'have' ? 'skillsHave' : 'skillsNeed';
    if (!formData[field].includes(skill)) {
      updateField(field, [...formData[field], skill]);
    }
  };

  const removeSkill = (type, skill) => {
    const field = type === 'have' ? 'skillsHave' : 'skillsNeed';
    updateField(field, formData[field].filter(s => s !== skill));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Scrollable Form Content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }} className="custom-scrollbar">
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* SECTION: SELECT EVENT */}
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Compass size={18} /> Select Event *
            </h3>
            
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" className="input" placeholder="Search events..." 
                style={{ paddingLeft: '2.5rem' }}
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {MOCK_EVENTS.map(event => (
                <div 
                  key={event.id}
                  onClick={() => updateField('eventId', event.id)}
                  style={{ 
                    padding: '1rem', borderRadius: 'var(--radius-md)', 
                    border: formData.eventId === event.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    backgroundColor: formData.eventId === event.id ? 'var(--primary-subtle)' : 'var(--bg-color)',
                    cursor: 'pointer', transition: 'all var(--transition-fast)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}
                  className="hover-lift"
                >
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: formData.eventId === event.id ? 'var(--primary)' : 'var(--text-main)' }}>🏆 {event.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{event.date} • {event.desc}</p>
                  </div>
                  {formData.eventId === event.id && (
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={14} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button className="btn btn-ghost" style={{ marginTop: '0.5rem', color: 'var(--primary)', padding: '0.5rem 0' }}>
              Can't find your event? Add external event →
            </button>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />

          {/* SECTION: TEAM INFO */}
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} /> Team Information
            </h3>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="intent" checked={formData.intent === 'join'} onChange={() => updateField('intent', 'join')} />
                Looking to join a team
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="intent" checked={formData.intent === 'create'} onChange={() => updateField('intent', 'create')} />
                Creating a new team
              </label>
            </div>

            {formData.intent === 'create' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                <div className="form-group">
                  <label>Team Name *</label>
                  <input type="text" className="input" placeholder="e.g. BinaryBeasts" value={formData.teamName} onChange={e => updateField('teamName', e.target.value)} />
                </div>
                
                <div className="form-group">
                  <label>Team Description</label>
                  <textarea className="input" placeholder="We're a group of ML enthusiasts building..." rows={3} value={formData.description} onChange={e => updateField('description', e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Team Size</label>
                  <select className="input" value={formData.size} onChange={e => updateField('size', e.target.value)}>
                    <option>2-4 members</option>
                    <option>4-6 members</option>
                    <option>6+ members</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />

          {/* SECTION: SKILLS */}
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Skills & Requirements</h3>
            
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Skills We Have</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {formData.skillsHave.map(skill => (
                  <span key={skill} style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    {skill} <X size={12} cursor="pointer" onClick={() => removeSkill('have', skill)} />
                  </span>
                ))}
              </div>
              <input type="text" className="input" placeholder="Type a skill and press Enter" onKeyDown={e => {
                if (e.key === 'Enter') { addSkill('have', e.target.value); e.target.value = ''; }
              }} />
            </div>

            <div className="form-group">
              <label>Skills We Need *</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {formData.skillsNeed.map(skill => (
                  <span key={skill} style={{ backgroundColor: 'var(--warning-light)', color: '#d97706', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    {skill} <X size={12} cursor="pointer" onClick={() => removeSkill('need', skill)} />
                  </span>
                ))}
              </div>
              <input type="text" className="input" placeholder="Type a skill and press Enter" onKeyDown={e => {
                if (e.key === 'Enter') { addSkill('need', e.target.value); e.target.value = ''; }
              }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="form-group">
                <label>Urgency</label>
                <select className="input" value={formData.urgency} onChange={e => updateField('urgency', e.target.value)}>
                  <option>Flexible</option>
                  <option>Need before event</option>
                  <option>ASAP</option>
                </select>
              </div>
              <div className="form-group">
                <label>Experience Needed</label>
                <select className="input" value={formData.experience} onChange={e => updateField('experience', e.target.value)}>
                  <option>Any level</option>
                  <option>Intermediate+</option>
                  <option>Expert</option>
                </select>
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />

          {/* SECTION: IDEA & VISIBILITY */}
          <div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Project Idea (Optional)</label>
              <textarea className="input" rows={3} placeholder="Have an idea? Share to attract relevant teammates..." value={formData.idea} onChange={e => updateField('idea', e.target.value)} />
            </div>

            <div className="form-group">
              <label>Visibility</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="visibility" checked={formData.visibility === 'Public'} onChange={() => updateField('visibility', 'Public')} /> Public
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="visibility" checked={formData.visibility === 'Invite Only'} onChange={() => updateField('visibility', 'Invite Only')} /> Invite Only
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer / Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', marginTop: '1rem' }}>
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Preview
          </button>
          <button className="btn btn-primary" onClick={() => { alert('Team Request Posted!'); onCancel(); }} style={{ backgroundColor: 'var(--primary)', border: 'none' }}>
            Post Team Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostTeamForm;
