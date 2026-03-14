import { Plus, Search, Settings2, Bookmark, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <div
      className="responsive-padding"
      style={{ maxWidth: '1400px', margin: '0 auto', paddingTop: '2rem' }}
    >
      {/* Sub Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '2rem',
          overflowX: 'auto',
        }}
      >
        <button
          style={{
            padding: '1rem 0',
            fontWeight: 600,
            color: 'var(--primary)',
            borderBottom: '2px solid var(--primary)',
            background: 'none',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Discover
        </button>
        <button
          style={{
            padding: '1rem 0',
            fontWeight: 500,
            color: 'var(--text-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          My Projects
        </button>
        <button
          style={{
            padding: '1rem 0',
            fontWeight: 500,
            color: 'var(--text-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Collabs
        </button>
      </div>

      {/* Header + Tagline */}
      <div
        className="mobile-stack"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '2rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              fontSize: '0.7rem',
              fontWeight: 800,
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
            }}
          >
            Project Hub • Build Together
          </div>
          <h1
            style={{
              fontSize: '2.25rem',
              marginBottom: '0.4rem',
              letterSpacing: '-0.03em',
            }}
          >
            Have an idea? Need skills?
          </h1>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '1rem',
              maxWidth: '560px',
              lineHeight: 1.5,
            }}
          >
            Discover student projects, find collaborators, and post what you&apos;re
            building with the SRM community.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignItems: 'flex-end',
          }}
        >
          <button
            className="btn btn-primary"
            style={{
              padding: '0.6rem 1.5rem',
              fontSize: '0.95rem',
              borderRadius: 'var(--radius-full)',
            }}
          >
            <Plus size={18} /> Post New Project
          </button>
          <button
            className="btn-ghost"
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
            }}
          >
            View My Projects
          </button>
        </div>
      </div>

      {/* Board Toolbar: Search / Filters / Actions */}
      <div
        className="card"
        style={{
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: '230px',
              position: 'relative',
            }}
          >
            <input
              type="text"
              placeholder="Search projects..."
              className="input"
              style={{
                width: '100%',
                paddingLeft: '2.4rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-color)',
                border: 'none',
              }}
            />
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '0.9rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
          </div>

          <button
            className="btn btn-outline"
            style={{
              borderRadius: 'var(--radius-full)',
              padding: '0.45rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              whiteSpace: 'nowrap',
            }}
          >
            <Settings2 size={16} /> Filters
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            alignItems: 'center',
            fontSize: '0.8rem',
          }}
        >
          <span
            style={{
              color: 'var(--text-muted)',
              marginRight: '0.25rem',
            }}
          >
            Quick filters:
          </span>
          {[
            'Idea Stage',
            'In Progress',
            'MVP Ready',
            'Completed',
            'App Dev',
            'AI/ML',
            '< 5 hrs/week',
          ].map((chip) => (
            <button
              key={chip}
              style={{
                padding: '0.25rem 0.7rem',
                borderRadius: '999px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'white',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Project Discovery Board */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
          paddingBottom: '3rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '1.25rem',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Flame size={18} color="var(--primary)" /> Project Discovery Board
          </h2>
          <button className="btn-ghost" style={{ fontSize: '0.85rem' }}>
            View saved projects
          </button>
        </div>

        <div className="responsive-grid">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="card"
              style={{
                padding: '1.25rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '1.2rem',
                      letterSpacing: '-0.01em',
                      wordBreak: 'break-word',
                    }}
                  >
                    {proj.title}
                  </h3>
                  <p
                    style={{
                      margin: '0.2rem 0 0.4rem 0',
                      color: 'var(--text-muted)',
                      fontSize: '0.85rem',
                      wordBreak: 'break-word',
                    }}
                  >
                    Needs: {proj.needs}
                  </p>
                </div>
                <div
                  style={{
                    textAlign: 'right',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    whiteSpace: 'normal',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      padding: '0.3rem 0.6rem',
                      borderRadius: '999px',
                      border: '1px solid var(--border-light)',
                      backgroundColor: 'var(--bg-color)',
                      maxWidth: '100%',
                      wordBreak: 'break-word',
                    }}
                  >
                    {proj.postedAt} • {proj.views} views • {proj.interested} interested
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '0.75rem',
                  gap: '0.75rem',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '0.75rem',
                }}
              >
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Posted by <strong>{proj.postedBy}</strong>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <Link to={`/projects/${proj.id}`}>
                    <button
                      className="btn btn-outline"
                      style={{
                        padding: '0.4rem 0.9rem',
                        fontSize: '0.85rem',
                      }}
                    >
                      View Details
                    </button>
                  </Link>
                  <button
                    className="btn btn-outline"
                    style={{
                      padding: '0.4rem 0.7rem',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <Bookmark size={14} /> Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
