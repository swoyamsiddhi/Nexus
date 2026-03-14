import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Image as ImageIcon, Plus, X, UploadCloud, Info, Rocket } from 'lucide-react';

const STEPS = ['Basics', 'Team', 'Details', 'Publish'];

const PostProjectForm = ({ onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    title: '', pitch: '', category: '', stage: 'Prototype built (MVP in progress)',
    description: '', links: { github: '', figma: '', demo: '', other: '' },
    role: 'Frontend Developer', userSkills: ['React', 'UI Design'], skillsNeeded: [],
    duration: '1-3 months', meetingPreference: 'Online', frequency: 'Weekly sync',
    visibility: 'Public', collabType: 'Long-term collaborator (Co-founder)',
    tags: []
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const updateField = (field, value) => setFormData({ ...formData, [field]: value });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', gap: '0.5rem' }}>
        {STEPS.map((step, index) => (
          <React.Fragment key={step}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '24px', height: '24px', borderRadius: '50%', 
                backgroundColor: currentStep >= index ? 'var(--primary)' : 'var(--border-color)',
                color: currentStep >= index ? 'white' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 'bold'
              }}>
                {index + 1}
              </div>
              <span style={{ 
                fontSize: '0.9rem', fontWeight: currentStep === index ? 600 : 500,
                color: currentStep >= index ? 'var(--text-main)' : 'var(--text-muted)'
              }}>
                {step}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div style={{ width: '40px', height: '2px', backgroundColor: currentStep > index ? 'var(--primary-light)' : 'var(--border-light)' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }} className="custom-scrollbar">
        
        {/* Step 1: Basics */}
        {currentStep === 0 && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Project Title *</label>
              <input 
                type="text" className="input" placeholder="e.g. Campus Marketplace App" 
                value={formData.title} onChange={e => updateField('title', e.target.value)}
                maxLength={60}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Info size={12}/> Keep it clear and searchable</span>
                <span>{formData.title.length}/60</span>
              </div>
            </div>

            <div className="form-group">
              <label>One-Line Pitch *</label>
              <input 
                type="text" className="input" placeholder="Buy and sell items within SRM campus safely" 
                value={formData.pitch} onChange={e => updateField('pitch', e.target.value)}
                maxLength={120}
              />
            </div>

            <div className="form-group">
              <label>Project Category *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                {['Mobile App', 'Web App', 'AI/ML', 'IoT/Hardware', 'Design System', 'Other'].map(cat => (
                  <button 
                    key={cat} onClick={() => updateField('category', cat)}
                    style={{
                      padding: '0.75rem', borderRadius: 'var(--radius-md)',
                      backgroundColor: formData.category === cat ? 'var(--primary-light)' : 'transparent',
                      border: formData.category === cat ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                      color: formData.category === cat ? 'var(--primary)' : 'var(--text-main)',
                      fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s ease'
                    }}
                  >{cat}</button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Detailed Description</label>
              <textarea 
                className="input" placeholder="What problem does it solve? Who is it for? etc." 
                style={{ minHeight: '120px', resize: 'vertical' }}
                value={formData.description} onChange={e => updateField('description', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Project Links (Optional)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input type="text" className="input" placeholder="GitHub URL" value={formData.links.github} onChange={e => updateField('links', {...formData.links, github: e.target.value})} />
                <input type="text" className="input" placeholder="Figma URL" value={formData.links.figma} onChange={e => updateField('links', {...formData.links, figma: e.target.value})} />
                <input type="text" className="input" placeholder="Demo/Live URL" value={formData.links.demo} onChange={e => updateField('links', {...formData.links, demo: e.target.value})} />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Team */}
        {currentStep === 1 && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-group">
              <label>Your Role *</label>
              <select className="input" value={formData.role} onChange={e => updateField('role', e.target.value)}>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Fullstack Developer</option>
                <option>UI/UX Designer</option>
                <option>Project Manager</option>
              </select>
            </div>

            <div className="form-group">
              <label>Your Skills</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {formData.userSkills.map(skill => (
                  <span key={skill} style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    {skill} <X size={12} cursor="pointer" onClick={() => updateField('userSkills', formData.userSkills.filter(s => s !== skill))} />
                  </span>
                ))}
              </div>
              <input type="text" className="input" placeholder="Type a skill and press Enter" onKeyDown={e => {
                if (e.key === 'Enter' && e.target.value) {
                  updateField('userSkills', [...formData.userSkills, e.target.value]);
                  e.target.value = '';
                }
              }} />
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />

            <div className="form-group">
              <label>Skills Needed (Open Roles) *</label>
              <div style={{ padding: '1rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)', textAlign: 'center' }}>
                <button className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={16} /> Add Role
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {currentStep === 2 && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Project Duration *</label>
                <select className="input" value={formData.duration} onChange={e => updateField('duration', e.target.value)}>
                  <option>1-3 months</option>
                  <option>3-6 months</option>
                  <option>Ongoing</option>
                </select>
              </div>
              <div className="form-group">
                <label>Time Commitment *</label>
                <select className="input" value={formData.frequency} onChange={e => updateField('frequency', e.target.value)}>
                  <option>Daily standups</option>
                  <option>Weekly sync</option>
                  <option>Flexible</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Visibility Settings *</label>
              <select className="input" value={formData.visibility} onChange={e => updateField('visibility', e.target.value)}>
                <option>Public (All SRM students)</option>
                <option>Department Only (CSE)</option>
                <option>Invite Only</option>
              </select>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Anyone can view and apply</p>
            </div>

            <div className="form-group">
              <label>Project Poster (Optional)</label>
              <div style={{ 
                border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-lg)',
                padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center',
                backgroundColor: 'var(--bg-secondary)', cursor: 'pointer'
              }}>
                <UploadCloud size={32} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>Drag & drop or pull to upload</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Max 5MB • JPG, PNG, GIF</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Publish */}
        {currentStep === 3 && (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ 
              width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--success-bg)',
              color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <Rocket size={32} />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Ready to Launch?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Review your project details. Once published, anyone can view and apply to collaborate!</p>
            
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', textAlign: 'left', marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{formData.title || 'Untitled Project'}</h3>
              <p style={{ color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>{formData.pitch}</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>{formData.category || 'No Category'}</span>
                <span style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem' }}>{formData.duration}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', marginTop: '1rem' }}>
        {currentStep === 0 ? (
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        ) : (
          <button className="btn btn-ghost" onClick={prevStep} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowLeft size={16} /> Back</button>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline">Save Draft</button>
          {currentStep < STEPS.length - 1 ? (
            <button className="btn btn-primary" onClick={nextStep} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Next Step <ChevronRight size={16} />
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => { alert('Project Published Successfully!'); onCancel(); }} style={{ backgroundColor: 'var(--success)', border: 'none' }}>
              Publish Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostProjectForm;
