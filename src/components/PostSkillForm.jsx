import React, { useState } from 'react';
import { BookOpen, GraduationCap, X, Sparkles } from 'lucide-react';

const PostSkillForm = ({ onCancel }) => {
  const [intent, setIntent] = useState('teach'); // 'teach' or 'learn'

  const [teachData, setTeachData] = useState({
    skill: 'React.js', level: 'Intermediate',
    helpWith: ['Code reviews', 'Debugging help', 'Project guidance'],
    time: '2-3 hrs/week', format: 'Online', studentLevel: 'Any level'
  });

  const [learnData, setLearnData] = useState({
    skill: 'Backend Development', topics: ['Node.js', 'Databases', 'APIs'],
    currentLevel: 'Complete beginner', goal: '',
    exchange: 'UI Design help', timeNeeded: '5 hrs/week'
  });

  const updateTeach = (field, value) => setTeachData({ ...teachData, [field]: value });
  const updateLearn = (field, value) => setLearnData({ ...learnData, [field]: value });

  const toggleHelpWith = (item) => {
    if (teachData.helpWith.includes(item)) {
      updateTeach('helpWith', teachData.helpWith.filter(i => i !== item));
    } else {
      updateTeach('helpWith', [...teachData.helpWith, item]);
    }
  };

  const addLearnTopic = (topic) => {
    if (!topic) return;
    if (!learnData.topics.includes(topic)) updateLearn('topics', [...learnData.topics, topic]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }} className="custom-scrollbar">
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* SECTION: INTENT SELECTION */}
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>I want to: *</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button 
                onClick={() => setIntent('teach')}
                style={{ 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
                  padding: '1.5rem', borderRadius: 'var(--radius-lg)',
                  border: intent === 'teach' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  backgroundColor: intent === 'teach' ? 'var(--primary-subtle)' : 'var(--bg-secondary)',
                  cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center'
                }}
              >
                <GraduationCap size={40} color={intent === 'teach' ? 'var(--primary)' : 'var(--text-muted)'} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: intent === 'teach' ? 'var(--primary)' : 'var(--text-main)' }}>TEACH / MENTOR</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>"I know something and want to help others"</p>
                </div>
              </button>

              <button 
                onClick={() => setIntent('learn')}
                style={{ 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
                  padding: '1.5rem', borderRadius: 'var(--radius-lg)',
                  border: intent === 'learn' ? '2px solid var(--info)' : '1px solid var(--border-color)',
                  backgroundColor: intent === 'learn' ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-secondary)',
                  cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center'
                }}
              >
                <BookOpen size={40} color={intent === 'learn' ? 'var(--info)' : 'var(--text-muted)'} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: intent === 'learn' ? 'var(--info)' : 'var(--text-main)' }}>LEARN / FIND MENTOR</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>"I want to learn from someone"</p>
                </div>
              </button>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />

          {/* SECTION: TEACHING FORM */}
          {intent === 'teach' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Skill / Topic *</label>
                  <select className="input" value={teachData.skill} onChange={e => updateTeach('skill', e.target.value)}>
                    <option>React.js</option>
                    <option>Python / AI</option>
                    <option>UI/UX Design</option>
                    <option>Mobile Dev</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Your Level *</label>
                  <select className="input" value={teachData.level} onChange={e => updateTeach('level', e.target.value)}>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>What I can help with:</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  {['Code reviews', 'Debugging help', 'Project guidance', 'Pair programming', 'Concept explanations', 'Career advice'].map(item => (
                    <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="checkbox" checked={teachData.helpWith.includes(item)} onChange={() => toggleHelpWith(item)} />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Time</label>
                  <select className="input" value={teachData.time} onChange={e => updateTeach('time', e.target.value)}>
                    <option>2-3 hrs/week</option>
                    <option>1 hr/week</option>
                    <option>Flexible</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Format</label>
                  <select className="input" value={teachData.format} onChange={e => updateTeach('format', e.target.value)}>
                    <option>Online</option>
                    <option>In-person</option>
                    <option>Both</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Target Student</label>
                  <select className="input" value={teachData.studentLevel} onChange={e => updateTeach('studentLevel', e.target.value)}>
                    <option>Any level</option>
                    <option>Beginners</option>
                    <option>Intermediate</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: LEARNING FORM */}
          {intent === 'learn' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="form-group">
                <label>Skill I want to learn: *</label>
                <select className="input" value={learnData.skill} onChange={e => updateLearn('skill', e.target.value)}>
                  <option>Backend Development</option>
                  <option>Frontend Frameworks</option>
                  <option>Machine Learning</option>
                  <option>App Development</option>
                  <option>System Design</option>
                </select>
              </div>

              <div className="form-group">
                <label>Specific Topics</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  {learnData.topics.map(topic => (
                    <span key={topic} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      {topic} <X size={12} cursor="pointer" onClick={() => updateLearn('topics', learnData.topics.filter(t => t !== topic))} />
                    </span>
                  ))}
                </div>
                <input type="text" className="input" placeholder="Type a specific topic (e.g. JWT Auth) and press Enter" onKeyDown={e => {
                  if (e.key === 'Enter') { addLearnTopic(e.target.value); e.target.value = ''; }
                }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>My Current Level *</label>
                  <select className="input" value={learnData.currentLevel} onChange={e => updateLearn('currentLevel', e.target.value)}>
                    <option>Complete beginner</option>
                    <option>Some basics</option>
                    <option>Intermediate</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Time Needed</label>
                  <select className="input" value={learnData.timeNeeded} onChange={e => updateLearn('timeNeeded', e.target.value)}>
                    <option>5 hrs/week</option>
                    <option>2 hrs/week</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>My Goal *</label>
                <textarea 
                  className="input" rows={3} 
                  placeholder="Want to build my first full-stack app for project portfolio..."
                  value={learnData.goal} onChange={e => updateLearn('goal', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>What I can offer in exchange (Optional)</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                  {['UI Design help', 'Nothing/Just gratitude', 'Coffee', 'Help with your project', 'Other'].map(exch => (
                    <button 
                      key={exch} onClick={() => updateLearn('exchange', exch)}
                      style={{
                        padding: '0.75rem', borderRadius: 'var(--radius-md)',
                        backgroundColor: learnData.exchange === exch ? 'white' : 'transparent',
                        border: learnData.exchange === exch ? '2px solid var(--text-main)' : '1px solid var(--border-color)',
                        color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer'
                      }}
                    >{exch}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', marginTop: '1rem' }}>
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline">Preview</button>
          <button className="btn btn-primary" onClick={() => { alert('Post Published!'); onCancel(); }} style={{ backgroundColor: 'var(--primary)', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={16} /> Post {intent === 'teach' ? 'Offer' : 'Request'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostSkillForm;
