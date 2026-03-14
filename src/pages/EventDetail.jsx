import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Flame, Share, Bookmark, ArrowLeft, Clock, MessageSquare, Download } from 'lucide-react';

export default function EventDetail() {
  const { id } = useParams();

  // Mock data for the specific event
  const event = {
    id,
    title: 'CodeSprint 2024',
    organizer: 'ACM Chapter',
    description: 'Join us for 24 hours of coding, innovation, and fun! Build solutions for real-world problems. Beginners are welcome, and mentors will be available to help you build your best idea yet.',
    date: 'March 15-16, 2024',
    time: '9:00 AM - 9:00 AM',
    location: 'Tech Park, Block 3, SRM University',
    type: 'Technical',
    status: 'Open',
    registered: 234,
    spotsLeft: 45,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['Hackathon', 'Coding', 'Prizes', 'Team Building'],
    prizes: '₹50,000 pool',
  };

  return (
    <div className="event-detail-page" style={{ paddingBottom: '4rem' }}>
      {/* Navigation Breadcrumb */}
      <div className="responsive-padding" style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', position: 'sticky', top: '70px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/events" className="btn-ghost" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
          <ArrowLeft size={18} />
        </Link>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Events / Technical / <strong style={{ color: 'var(--text-main)' }}>{event.title}</strong></span>
      </div>

      {/* Hero Section */}
      <div style={{ position: 'relative', height: '400px', width: '100%', overflow: 'hidden', backgroundColor: 'var(--bg-color)' }}>
        <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {/* Gradient Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)' }}></div>
        
        {/* Hero Content container */}
        <div className="responsive-padding" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: '3rem', paddingTop: '2rem' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', width: 'fit-content', fontSize: '0.85rem', fontWeight: 600 }}>
              <span>🏷️</span> {event.organizer}
            </div>
            
            <h1 style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: 0, lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              {event.title}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 0 1rem 0' }}>
              24-Hour National Level Hackathon
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={18} color="var(--primary-light)" /> {event.date}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={18} color="var(--primary-light)" /> {event.time}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="var(--primary-light)" /> {event.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={18} color="var(--primary-light)" /> {event.registered} registered
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)' }}>
                <Flame size={18} /> {event.spotsLeft} spots left
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 600 }}>
                📝 Register Now
              </button>
              <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}>
                <Bookmark size={18} /> Save
              </button>
              <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}>
                <Share size={18} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="responsive-padding" style={{ maxWidth: '1400px', margin: '3rem auto 0 auto' }}>
        <div className="mobile-stack" style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
          
          {/* Left Column (Details) */}
          <div style={{ flex: '1 1 0%', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            <section>
              <h2 style={{ fontSize: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>About This Event</h2>
              <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {event.description}
              </p>
              <div style={{ backgroundColor: 'var(--primary-light)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', color: 'var(--primary-dark)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p style={{ margin: 0 }}><strong>🎯 Problem Statements</strong> will be revealed on the day of the event.</p>
                <p style={{ margin: 0 }}><strong>💰 Prizes:</strong> {event.prizes}</p>
                <p style={{ margin: 0 }}><strong>🍕 Food & refreshments</strong> provided throughout the hackathon.</p>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>Schedule</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '1rem' }}>Day 1 - March 15</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)' }}>
                    <li style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--text-main)', width: '80px' }}>09:00 AM</strong> Registration & Setup</li>
                    <li style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--text-main)', width: '80px' }}>10:00 AM</strong> Opening Ceremony</li>
                    <li style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--text-main)', width: '80px' }}>11:00 AM</strong> Coding Begins</li>
                    <li style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--text-main)', width: '80px' }}>08:00 PM</strong> Working Dinner</li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '1rem' }}>Day 2 - March 16</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)' }}>
                    <li style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--text-main)', width: '80px' }}>09:00 AM</strong> Breakfast</li>
                    <li style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--text-main)', width: '80px' }}>11:00 AM</strong> Coding Ends / Submissions</li>
                    <li style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--text-main)', width: '80px' }}>02:00 PM</strong> Judging Round</li>
                    <li style={{ display: 'flex', gap: '1rem' }}><strong style={{ color: 'var(--text-main)', width: '80px' }}>04:00 PM</strong> Results & Closing</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 style={{ fontSize: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>Speakers / Judges</h2>
              <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem' }} className="custom-scrollbar">
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ minWidth: '150px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--border-color)', overflow: 'hidden' }}>
                      <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Judge" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0' }}>Prof. Name {i}</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tech Lead</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column (Registration Card) */}
          <aside style={{ width: '100%', maxWidth: '400px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div className="card" style={{ padding: '1.5rem', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--primary-light)', position: 'sticky', top: '150px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Status</span>
                <span style={{ backgroundColor: 'var(--success)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>🟢 OPEN</span>
              </div>
              
              <div style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Closes on</span>
                  <span style={{ fontWeight: 600 }}>March 14, 11:59 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Team Size</span>
                  <span style={{ fontWeight: 600 }}>2 - 4 Members</span>
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem' }}>
                📝 Register Now
              </button>
              
              <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                By registering, you agree to the <a href="#" style={{ color: 'var(--primary)' }}>Rulebook</a>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '1.5rem 0' }} />

              <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Eligibility</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: 'var(--success)' }}>✓</span> All Branches</li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: 'var(--success)' }}>✓</span> 1st - 4th Year Students</li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><span style={{ color: 'var(--danger)' }}>✗</span> No Solo Participants allowed</li>
              </ul>
            </div>

            <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--surface-color)' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Download size={18} /> Resources
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', padding: '0.5rem', backgroundColor: 'var(--bg-color)' }}>📄 Rulebook PDF</button>
                <button className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', padding: '0.5rem', backgroundColor: 'var(--bg-color)' }}>🔗 Discord Server</button>
                <button className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', padding: '0.5rem', backgroundColor: 'var(--bg-color)' }}>❓ FAQ Document</button>
              </div>
            </div>

          </aside>
        </div>

        {/* Bottom Sections: Q&A and Attendees */}
        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem' }}>
               <h2 style={{ fontSize: '1.5rem', margin: 0 }}>👥 Who's Going ({event.registered})</h2>
               <Link to="#" style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'none' }}>See all</Link>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
               <div style={{ display: 'flex' }}>
                 {[1,2,3,4,5].map(i => (
                   <img key={i} src={`https://i.pravatar.cc/150?img=${i+20}`} alt="Attendee" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white', marginLeft: i > 1 ? '-10px' : '0' }} />
                 ))}
                 <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white', marginLeft: '-10px', backgroundColor: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                   +229
                 </div>
               </div>
               <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                 Friends: Arjun, Priya, and 12 more friends going.
               </div>
               <button className="btn btn-outline" style={{ marginLeft: 'auto' }}>Find Teammates</button>
            </div>
          </section>

          <section>
             <h2 style={{ fontSize: '1.5rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={24} /> Discussion / Q&A
             </h2>
             <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
               <img src="https://i.pravatar.cc/150?img=11" alt="Me" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
               <input type="text" placeholder="Ask a question about this event..." className="input" style={{ flex: 1, borderRadius: 'var(--radius-full)' }} />
             </div>

             <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <img src="https://i.pravatar.cc/150?img=15" alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  <div>
                    <h5 style={{ margin: '0 0 0.25rem 0' }}>Rahul <span>(CSE, 2nd Year)</span></h5>
                    <p style={{ margin: '0 0 1rem 0', color: 'var(--text-main)' }}>Is prior ML experience required for the open problem statement?</p>
                    
                    <div style={{ backgroundColor: 'var(--primary-light)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '1rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: '0.8rem' }}>ORG</div>
                      <div>
                        <h6 style={{ margin: '0 0 0.25rem 0', color: 'var(--primary-dark)' }}>Organizer Response</h6>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--primary-dark)' }}>Not required! We have tracks for beginners and mentors to guide you throughout the 24 hours.</p>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </section>

        </div>
      </div>
    </div>
  );
}
