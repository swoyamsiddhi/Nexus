import React, { useState } from 'react';
import { Users, Building2, Mail, Download, Plus, Search, Filter, ChevronDown, Edit, Trash2, MessageSquare, Star, Shield, GraduationCap, TrendingUp, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MembersManagement() {
  const [activeView, setActiveView] = useState('directory');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');

  const clubStats = {
    total: 127,
    active: 89,
    coreTeam: 12,
    name: 'ACM Chapter',
    established: '2019',
  };

  const subTeams = [
    {
      id: 1,
      name: 'Technical Team',
      icon: '💻',
      members: 8,
      lead: 'Arjun Kumar',
      focus: 'Workshops, hackathons',
      color: 'var(--primary)',
    },
    {
      id: 2,
      name: 'Design Team',
      icon: '🎨',
      members: 5,
      lead: 'Priya Singh',
      focus: 'Posters, branding, UI',
      color: 'var(--success)',
    },
    {
      id: 3,
      name: 'Marketing Team',
      icon: '📢',
      members: 6,
      lead: 'Rahul Verma',
      focus: 'Social media, outreach',
      color: 'var(--warning)',
    },
  ];

  const members = [
    { id: 1, name: 'Arjun Kumar', dept: 'CSE', year: '3rd', role: 'Lead', events: 12, status: 'active', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Priya Singh', dept: 'CSE', year: '3rd', role: 'Core', events: 8, status: 'active', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Rahul Verma', dept: 'ECE', year: '2nd', role: 'Member', events: 3, status: 'semi', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'Sneha Patel', dept: 'IT', year: '4th', role: 'Alumni', events: 0, status: 'inactive', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: 'Vikram Shah', dept: 'CSE', year: '2nd', role: 'Member', events: 6, status: 'active', avatar: 'https://i.pravatar.cc/150?u=5' },
    { id: 6, name: 'Ananya Reddy', dept: 'ECE', year: '3rd', role: 'Core', events: 10, status: 'active', avatar: 'https://i.pravatar.cc/150?u=6' },
    { id: 7, name: 'Rohan Mehta', dept: 'IT', year: '1st', role: 'Member', events: 2, status: 'semi', avatar: 'https://i.pravatar.cc/150?u=7' },
    { id: 8, name: 'Diya Sharma', dept: 'CSE', year: '4th', role: 'Core', events: 15, status: 'active', avatar: 'https://i.pravatar.cc/150?u=8' },
  ];

  const pendingInvites = [
    { email: 'vikram@srmap.edu.in', sentAt: '2 days ago', status: 'pending' },
    { email: 'ananya@srmap.edu.in', sentAt: '5 days ago', status: 'pending' },
    { email: 'rohan@srmap.edu.in', sentAt: '1 day ago', status: 'pending' },
  ];

  const departments = ['All', 'CSE', 'ECE', 'IT', 'EEE', 'Mech'];
  const years = ['All', '1st', '2nd', '3rd', '4th', 'Alumni'];
  const roles = ['All', 'Lead', 'Core', 'Member', 'Alumni'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '3rem' }}>

      {/* Club Overview */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}>
              <Building2 size={32} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{clubStats.name}</h2>
              <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
                Est. {clubStats.established} • {clubStats.total} total members
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={18} /> Invite Members
            </button>
            <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} /> Email All
            </button>
            <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Download size={18} /> Export Directory
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--primary-light)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 700 }}>Total Members</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{clubStats.total}</div>
          </div>
          <div style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--success-bg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--success)', textTransform: 'uppercase', fontWeight: 700 }}>Active (70%)</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success)' }}>{clubStats.active}</div>
          </div>
          <div style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--warning-bg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--warning)', textTransform: 'uppercase', fontWeight: 700 }}>Core Team</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--warning)' }}>{clubStats.coreTeam}</div>
          </div>
        </div>
      </div>

      {/* Sub-Teams */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={20} color="var(--primary)" /> Sub-Teams / Committees
          </h2>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <Plus size={16} /> Create Sub-team
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {subTeams.map(team => (
            <div key={team.id} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: team.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                }}>
                  {team.icon}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{team.name}</h3>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{team.members} members</p>
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>Lead: {team.lead}</div>
                <div>Focus: {team.focus}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <button className="btn btn-outline" style={{ flex: 1, fontSize: '0.85rem' }}>Manage</button>
                <button className="btn btn-outline" style={{ flex: 1, fontSize: '0.85rem' }}>Message</button>
                <button className="btn btn-outline" style={{ fontSize: '0.85rem' }}>View Events</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Members Directory */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>All Members Directory</h2>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-outline" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} /> Email Filtered
            </button>
            <button className="btn btn-outline" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', minWidth: '200px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search name..."
              style={{
                paddingLeft: '2.25rem',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--surface-color)',
                fontSize: '0.85rem',
                outline: 'none',
                width: '100%',
              }}
            />
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--surface-color)',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {departments.map(d => <option key={d} value={d}>{d === 'All' ? 'Department' : d}</option>)}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--surface-color)',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {years.map(y => <option key={y} value={y}>{y === 'All' ? 'Year' : y}</option>)}
          </select>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--surface-color)',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {roles.map(r => <option key={r} value={r}>{r === 'All' ? 'Role' : r}</option>)}
          </select>
        </div>

        {/* Members Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem', width: '40px' }}></th>
                <th style={{ padding: '0.75rem' }}>Name</th>
                <th style={{ padding: '0.75rem' }}>Dept</th>
                <th style={{ padding: '0.75rem' }}>Year</th>
                <th style={{ padding: '0.75rem' }}>Role</th>
                <th style={{ padding: '0.75rem' }}>Events</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: member.status === 'active' ? 'var(--success)' : member.status === 'semi' ? 'var(--warning)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}>
                      {member.name.charAt(0)}
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ fontWeight: 600 }}>{member.name}</div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>{member.dept}</td>
                  <td style={{ padding: '0.75rem' }}>{member.year}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      padding: '0.25rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: member.role === 'Lead' ? 'var(--primary)' : member.role === 'Core' ? 'var(--warning)' : 'var(--bg-color)',
                      color: member.role === 'Lead' || member.role === 'Core' ? 'white' : 'var(--text-main)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}>
                      {member.role}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>{member.events}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: member.status === 'active' ? 'var(--success-bg)' : member.status === 'semi' ? 'var(--warning-bg)' : 'var(--danger-bg)',
                      color: member.status === 'active' ? 'var(--success)' : member.status === 'semi' ? 'var(--warning)' : 'var(--danger)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}>
                      {member.status === 'active' ? 'Active' : member.status === 'semi' ? 'Semi' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button className="btn-ghost" style={{ padding: '0.25rem' }}>
                        <MessageSquare size={16} />
                      </button>
                      <button className="btn-ghost" style={{ padding: '0.25rem' }}>
                        <Edit size={16} />
                      </button>
                      <button className="btn-ghost" style={{ padding: '0.25rem', color: 'var(--danger)' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--success)', display: 'inline-block' }}></span>
            Active (5+ events)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--warning)', display: 'inline-block' }}></span>
            Semi (1-4)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--text-muted)', display: 'inline-block' }}></span>
            Inactive
          </span>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Showing 1-8 of {clubStats.total} members</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-outline" style={{ fontSize: '0.85rem' }}>Previous</button>
            <button className="btn btn-outline" style={{ fontSize: '0.85rem' }}>Next</button>
          </div>
        </div>
      </div>

      {/* Pending Invites */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', margin: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={18} color="var(--warning)" /> Pending Invites
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          {pendingInvites.length} invitations sent, awaiting response
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {pendingInvites.map(invite => (
            <div key={invite.email} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Clock size={16} color="var(--warning)" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{invite.email}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sent {invite.sentAt}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-outline" style={{ fontSize: '0.85rem' }}>Resend</button>
                <button className="btn btn-ghost" style={{ fontSize: '0.85rem', color: 'var(--danger)' }}>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
