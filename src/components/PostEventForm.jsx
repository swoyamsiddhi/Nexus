import React, { useState } from 'react';
import { Calendar, MapPin, Link2, Info, Users, CheckCircle } from 'lucide-react';

const PostEventForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: '', url: '', organizer: '',
    locationType: 'In Person', venue: '', city: 'Chennai',
    date: '', time: '', duration: 'Full Day',
    type: 'Conference', category: 'Technical',
    cost: 'Free', costAmount: '',
    requiresReg: true, regLink: '',
    reason: '',
    createGroup: true, rideshare: false, accommodation: false
  });

  const updateField = (field, value) => setFormData({ ...formData, [field]: value });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }} className="custom-scrollbar">
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* SECTION: DETAILS */}
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Event Details *</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="form-group">
                <label>Event Name *</label>
                <input type="text" className="input" placeholder="e.g. DevFest Chennai 2024" value={formData.name} onChange={e => updateField('name', e.target.value)} />
              </div>

              <div className="form-group">
                <label>Official Website/Link *</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input type="url" className="input" style={{ flex: 1 }} placeholder="https://" value={formData.url} onChange={e => updateField('url', e.target.value)} />
                  <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem' }}>
                    <Link2 size={16} /> Validate
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Organizer *</label>
                <input type="text" className="input" placeholder="e.g. GDG Chennai" value={formData.organizer} onChange={e => updateField('organizer', e.target.value)} />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />

          {/* SECTION: LOCATION & DATE */}
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Location & Date *</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="form-group">
                <label>Location Type</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['In Person', 'Online', 'Hybrid'].map(type => (
                    <button 
                      key={type} onClick={() => updateField('locationType', type)}
                      style={{
                        flex: 1, padding: '0.75rem', borderRadius: 'var(--radius-md)',
                        backgroundColor: formData.locationType === type ? 'var(--primary-light)' : 'var(--bg-secondary)',
                        border: formData.locationType === type ? '1px solid var(--primary)' : '1px solid transparent',
                        color: formData.locationType === type ? 'var(--primary)' : 'var(--text-main)',
                        fontWeight: formData.locationType === type ? 600 : 500, transition: 'all 0.2s'
                      }}
                    >
                      {type === 'In Person' ? '📍' : type === 'Online' ? '🌐' : '📍+🌐'} {type}
                    </button>
                  ))}
                </div>
              </div>

              {(formData.locationType === 'In Person' || formData.locationType === 'Hybrid') && (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Venue</label>
                    <input type="text" className="input" placeholder="Chennai Trade Center, Nandanam" value={formData.venue} onChange={e => updateField('venue', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <select className="input" value={formData.city} onChange={e => updateField('city', e.target.value)}>
                      <option>Chennai</option>
                      <option>Bangalore</option>
                      <option>Hyderabad</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" className="input" value={formData.date} onChange={e => updateField('date', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input type="time" className="input" value={formData.time} onChange={e => updateField('time', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <select className="input" value={formData.duration} onChange={e => updateField('duration', e.target.value)}>
                    <option>Full Day</option>
                    <option>Half Day</option>
                    <option>Multi-day</option>
                    <option>1-2 Hours</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />

          {/* SECTION: EVENT TYPE */}
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Event Type & Cost</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="form-group">
                <label>Event Type</label>
                <select className="input" value={formData.type} onChange={e => updateField('type', e.target.value)}>
                  <option>Conference</option>
                  <option>Hackathon</option>
                  <option>Workshop</option>
                  <option>Meetup</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select className="input" value={formData.category} onChange={e => updateField('category', e.target.value)}>
                  <option>Technical</option>
                  <option>Design</option>
                  <option>Business</option>
                  <option>General</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="form-group">
                <label>Cost</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <select className="input" value={formData.cost} onChange={e => updateField('cost', e.target.value)} style={{ width: '40%' }}>
                    <option>Free</option>
                    <option>Paid</option>
                  </select>
                  {formData.cost === 'Paid' && (
                    <input type="number" className="input" placeholder="₹ Amount" value={formData.costAmount} onChange={e => updateField('costAmount', e.target.value)} style={{ flex: 1 }} />
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Registration</label>
                <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="radio" checked={formData.requiresReg} onChange={() => updateField('requiresReg', true)} /> Required
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="radio" checked={!formData.requiresReg} onChange={() => updateField('requiresReg', false)} /> Not Required
                  </label>
                </div>
              </div>
            </div>
            
            {formData.requiresReg && (
              <div className="form-group">
                <input type="url" className="input" placeholder="Registration Link (if different from Website)" value={formData.regLink} onChange={e => updateField('regLink', e.target.value)} />
              </div>
            )}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />

          {/* SECTION: WHY SRM & ORG */}
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Community Impact</h3>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Why should SRM students go? *</label>
              <textarea 
                className="input" rows={4} 
                placeholder="Great networking opportunity, free swag, etc."
                value={formData.reason} onChange={e => updateField('reason', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>SRM Group Coordination</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 500 }}>
                  <input type="checkbox" checked={formData.createGroup} onChange={e => updateField('createGroup', e.target.checked)} />
                  <Users size={16} color="var(--primary)" /> Automatically create SRM Group for this event
                </label>
                <p style={{ margin: '0 0 0 1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Allows students to mark interest and coordinate travel together.</p>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                  <input type="checkbox" checked={formData.rideshare} onChange={e => updateField('rideshare', e.target.checked)} />
                  I can offer a ride from campus
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.accommodation} onChange={e => updateField('accommodation', e.target.checked)} />
                  Looking for an accommodation buddy
                </label>
              </div>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'var(--info-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '1rem', alignItems: 'flex-start', color: 'var(--info)' }}>
            <Info size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ margin: 0, fontSize: '0.85rem' }}>
              <strong>Note:</strong> External events are reviewed before publishing to prevent spam. Usually approved within 2 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', marginTop: '1rem' }}>
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline">Preview</button>
          <button className="btn btn-primary" onClick={() => { alert('Event Submitted for Review!'); onCancel(); }} style={{ backgroundColor: 'var(--primary)', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={16} /> Submit for Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEventForm;
