import React, { useState } from 'react';
import { X, Rocket, Users, Globe, BookOpen, Megaphone, ChevronRight, ArrowLeft, CheckCircle } from 'lucide-react';
import PostProjectForm from './PostProjectForm';
import PostTeamForm from './PostTeamForm';
import PostEventForm from './PostEventForm';
import PostSkillForm from './PostSkillForm';

const CreatePostModal = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setSelectedType(null);
    onClose();
  };

  const renderSelectionMenu = () => (
    <div className="animate-fade-in">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>What would you like to create?</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Share your ideas, find teammates, or post an event for the SRM community.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        {[
          { id: 'project', icon: Rocket, color: 'var(--primary)', bg: 'var(--primary-subtle)', title: 'Start a Project', desc: 'Build something together and find collaborators' },
          { id: 'team', icon: Users, color: 'var(--success)', bg: 'var(--success-bg)', title: 'Find Teammates', desc: 'For hackathons, ideathons, and competitions' },
          { id: 'event', icon: Globe, color: 'var(--warning)', bg: 'rgba(245, 158, 11, 0.1)', title: 'Share External Event', desc: 'Conference, hackathon, or meetup outside campus' },
          { id: 'skill', icon: BookOpen, color: 'var(--info)', bg: 'rgba(59, 130, 246, 0.1)', title: 'Skill Exchange', desc: 'Teach a skill or find a mentor to learn from' },
          { id: 'announcement', icon: Megaphone, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', title: 'Quick Announcement', desc: 'Cast reveal, meetup, or general update (Club Members only)' }
        ].map(option => (
          <button
            key={option.id}
            onClick={() => setSelectedType(option.id)}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem', 
              backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-lg)', cursor: 'pointer', textAlign: 'left',
              transition: 'all var(--transition-fast)'
            }}
            className="hover-lift"
          >
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: option.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: option.color, flexShrink: 0 }}>
              <option.icon size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: 'var(--text-main)' }}>{option.title}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{option.desc}</p>
            </div>
            <div style={{ color: 'var(--text-muted)' }}>
              <ChevronRight size={20} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch(selectedType) {
      case 'project':
        return <PostProjectForm onCancel={() => setSelectedType(null)} />;
      case 'team':
        return <PostTeamForm onCancel={() => setSelectedType(null)} />;
      case 'event':
        return <PostEventForm onCancel={() => setSelectedType(null)} />;
      case 'skill':
        return <PostSkillForm onCancel={() => setSelectedType(null)} />;
      default:
        return renderSelectionMenu();
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem'
    }}>
      <div 
        className="animate-fade-in"
        style={{
          width: '100%', maxWidth: '700px', maxHeight: '90vh',
          backgroundColor: 'white', borderRadius: 'var(--radius-xl)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
          padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-light)',
          backgroundColor: 'var(--bg-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {selectedType && (
              <button 
                onClick={() => setSelectedType(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Create Post</h2>
          </div>
          <button 
            onClick={handleClose}
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', 
              color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1, backgroundColor: 'white' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
