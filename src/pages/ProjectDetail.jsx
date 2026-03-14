import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Clock, Bookmark } from 'lucide-react';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => String(p.id) === String(id));

  if (!project) {
    return (
      <div className="responsive-padding" style={{ paddingTop: '2rem' }}>
        <button
          className="btn btn-ghost"
          onClick={() => navigate(-1)}
          style={{ marginBottom: '1rem' }}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <p style={{ color: 'var(--text-muted)' }}>Project not found.</p>
      </div>
    );
  }

  return (
    <div className="responsive-padding" style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '2rem' }}>
      <button
        className="btn btn-ghost"
        onClick={() => navigate(-1)}
        style={{ marginBottom: '1rem' }}
      >
        <ArrowLeft size={16} /> Back to projects
      </button>

      <div className="card" style={{ padding: '1.75rem 2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
                🚀 {project.status}
              </span>
              <span className="badge" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-muted)' }}>
                {project.domain}
              </span>
            </div>
            <h1 style={{ fontSize: '1.75rem', margin: 0, letterSpacing: '-0.02em' }}>
              {project.title}
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem', fontSize: '0.95rem' }}>
              {project.pitch}
            </p>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div style={{ marginBottom: '0.35rem' }}>{project.postedAt}</div>
            <div>{project.views} views • {project.interested} interested</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1.1fr)', gap: '1.5rem', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Details</h3>
            <p style={{ color: 'var(--text-main)', lineHeight: 1.6 }}>
              {/* Placeholder long description until wired to real data */}
              This is a concept project posted by {project.postedBy}. Use this space to
              describe the problem, target users, and current progress in more depth.
            </p>

            <div style={{ marginTop: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>🛠️ Tech stack</div>
              <div>{project.techStack}</div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>✅ Has</div>
              <div>{project.has}</div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>🔍 Needs</div>
              <div>{project.needs}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div className="card" style={{ padding: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem', margin: '0 0 0.5rem 0' }}>Team & Commitment</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div>
                  <Users size={14} style={{ marginRight: '0.35rem' }} />
                  Posted by <strong>{project.postedBy}</strong>
                </div>
                <div>
                  <Clock size={14} style={{ marginRight: '0.35rem' }} />
                  {project.timeCommitment} • {project.duration}
                </div>
                <div>
                  🎯 Goal: <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{project.goal}</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '0.95rem', margin: 0 }}>Collaborate</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                Express interest to join the team or save this project to watch its progress.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}>
                  Apply to Collaborate
                </button>
                <button className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Bookmark size={14} /> Save Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

