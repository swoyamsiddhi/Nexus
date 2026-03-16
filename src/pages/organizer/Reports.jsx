import React, { useState } from 'react';
import { BarChart3, Download, FileText, Calendar, Users, TrendingUp, Star, Award, PieChart, ArrowUpRight, ArrowDownRight, Printer, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReportsAnalytics() {
  const [reportType, setReportType] = useState('overview');
  const [dateRange, setDateRange] = useState('This Semester');

  const semesterStats = {
    events: 12,
    attendees: 1456,
    satisfaction: 89,
    registrations: 3234,
    newMembers: 156,
    teamsFormed: 45,
  };

  const topEvents = [
    { rank: 1, title: 'CodeSprint 2024', registrations: 234, attendance: 98, icon: '🏆' },
    { rank: 2, title: 'Cast Reveal', interested: 456, turnout: 89, icon: '🎭' },
    { rank: 3, title: 'ML Workshop Series', avgAttendance: 156, icon: '🤖' },
  ];

  const improvementAreas = [
    { title: 'Design workshops', issue: '45% no-show rate', suggestion: 'Investigate timing' },
    { title: 'External events', issue: 'Low coordination', suggestion: 'Improve groups' },
  ];

  const engagementDistribution = [
    { level: 'Highly engaged', count: 23, range: '10+ events', color: 'var(--success)' },
    { level: 'Moderately engaged', count: 34, range: '5-9 events', color: 'var(--primary)' },
    { level: 'Lightly engaged', count: 45, range: '1-4 events', color: 'var(--warning)' },
    { level: 'Inactive', count: 25, range: '0 events', color: 'var(--text-muted)' },
  ];

  const monthlyData = [
    { month: 'January', events: 2, attendees: 234 },
    { month: 'February', events: 3, attendees: 312 },
    { month: 'March', events: 4, attendees: 456 },
    { month: 'April', events: 2, attendees: 289 },
    { month: 'May', events: 1, attendees: 165 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '3rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BarChart3 size={24} color="var(--primary)" /> Club Analytics & Reports
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>
            Understand engagement and improve your events
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} /> Export PDF
          </button>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', overflowX: 'auto' }} className="custom-scrollbar">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'events', label: 'Events' },
          { id: 'members', label: 'Members' },
          { id: 'engagement', label: 'Engagement' },
          { id: 'growth', label: 'Growth' },
          { id: 'custom', label: 'Custom' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setReportType(tab.id)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: reportType === tab.id ? 'var(--primary-light)' : 'transparent',
              color: reportType === tab.id ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: reportType === tab.id ? 600 : 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all var(--transition-fast)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Date Range & Export Controls */}
      <div className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>Date Range:</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--surface-color)',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>This Semester</option>
            <option>Custom</option>
          </select>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Jan 2026 - May 2026</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
            <Printer size={16} /> Print
          </button>
          <button className="btn btn-primary" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={16} /> Generate Report
          </button>
        </div>
      </div>

      {/* Semester Summary Stats */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0, marginBottom: '1.5rem' }}>
          Semester Summary (Jan 2026 - May 2026)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
          <div style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--primary-light)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 700 }}>Events Organized</div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary)' }}>{semesterStats.events}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <TrendingUp size={12} /> +2 vs last semester
            </div>
          </div>
          <div style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--success-bg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--success)', textTransform: 'uppercase', fontWeight: 700 }}>Total Attendees</div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--success)' }}>{semesterStats.attendees}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <TrendingUp size={12} /> +15% vs last semester
            </div>
          </div>
          <div style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--warning-bg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--warning)', textTransform: 'uppercase', fontWeight: 700 }}>Avg Satisfaction</div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--warning)' }}>{semesterStats.satisfaction}%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ArrowUpRight size={12} /> +3% vs last semester
            </div>
          </div>
          <div style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--primary-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 700 }}>Total Registrations</div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary)' }}>{semesterStats.registrations}</div>
          </div>
          <div style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--success-bg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--success)', textTransform: 'uppercase', fontWeight: 700 }}>New Members</div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--success)' }}>{semesterStats.newMembers}</div>
          </div>
          <div style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--warning-bg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--warning)', textTransform: 'uppercase', fontWeight: 700 }}>Teams Formed</div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--warning)' }}>{semesterStats.teamsFormed}</div>
          </div>
        </div>
      </div>

      {/* Event Performance Breakdown */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award size={20} color="var(--primary)" /> Event Performance Breakdown
        </h2>

        {/* Bar Chart Placeholder */}
        <div style={{ padding: '2rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '150px', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            {monthlyData.map((data, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '40px',
                  height: `${(data.attendees / 500) * 120}px`,
                  backgroundColor: 'var(--primary)',
                  borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                  transition: 'height 0.3s',
                }}></div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{data.month.substring(0, 3)}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Monthly attendance trend</p>
        </div>

        {/* Top Performing Events */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} color="var(--success)" /> Top Performing Events
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {topEvents.map(event => (
                <div key={event.rank} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-color)',
                  borderLeft: event.rank === 1 ? '3px solid var(--warning)' : event.rank === 2 ? '3px solid var(--primary)' : '3px solid var(--success)',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: event.rank === 1 ? 'var(--warning)' : event.rank === 2 ? 'var(--primary)' : 'var(--success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}>
                    {event.rank}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{event.icon} {event.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {event.registrations && `${event.registrations} registrations`}
                      {event.interested && `${event.interested} interested`}
                      {event.avgAttendance && `Avg ${event.avgAttendance} attendees`}
                      {event.attendance && ` • ${event.attendance}% attendance`}
                      {event.turnout && ` • ${event.turnout}% turnout`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement Areas */}
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowDownRight size={18} color="var(--warning)" /> Improvement Areas
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {improvementAreas.map((area, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--warning-bg)',
                  borderLeft: '3px solid var(--warning)',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--warning)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0,
                  }}>
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>{area.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{area.issue}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--warning)', fontWeight: 600 }}>💡 {area.suggestion}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Member Growth & Retention */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={20} color="var(--primary)" /> Member Growth & Retention
        </h2>

        {/* Funnel Chart Placeholder */}
        <div style={{ padding: '2rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '1rem', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-md)', textAlign: 'center', fontWeight: 600 }}>All Members: {semesterStats.newMembers}</div>
            <div style={{ width: '80%', maxWidth: '320px', padding: '1rem', backgroundColor: 'var(--success-bg)', borderRadius: 'var(--radius-md)', textAlign: 'center', fontWeight: 600 }}>Active: {semesterStats.newMembers * 0.7}</div>
            <div style={{ width: '60%', maxWidth: '240px', padding: '1rem', backgroundColor: 'var(--warning-bg)', borderRadius: 'var(--radius-md)', textAlign: 'center', fontWeight: 600 }}>Core Team: {semesterStats.newMembers * 0.3}</div>
            <div style={{ width: '40%', maxWidth: '160px', padding: '1rem', backgroundColor: 'var(--primary-subtle)', borderRadius: 'var(--radius-md)', textAlign: 'center', fontWeight: 600 }}>Leaders: {semesterStats.newMembers * 0.1}</div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'center' }}>
            New → Active → Core → Leader pipeline
          </p>
        </div>

        {/* Engagement Distribution */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {engagementDistribution.map((item, idx) => (
            <div key={idx} style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-color)',
              borderLeft: `3px solid ${item.color}`,
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{item.level}</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>{item.count}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{item.range}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link to="#" style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 500 }}>View retention strategies →</Link>
        </div>
      </div>

      {/* Generate Report Section */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0, marginBottom: '1.5rem' }}>Generate Report</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div className="form-group">
            <label>Report For</label>
            <select className="input">
              <option>Fest Committee</option>
              <option>Department Head</option>
              <option>University Administration</option>
              <option>Sponsor Report</option>
            </select>
          </div>
          <div className="form-group">
            <label>Include</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} /> Events
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} /> Finances
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} /> Member list
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} /> Feedback
              </label>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} /> Generate PDF Report
          </button>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} /> Schedule Monthly Report
          </button>
        </div>
      </div>

    </div>
  );
}

// Helper icon
function AlertTriangle({ size, style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <path d="M12 9v4"/>
      <path d="M12 16h.01"/>
    </svg>
  );
}
