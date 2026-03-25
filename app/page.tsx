"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./landing.css";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/events?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    // Scroll-reveal animation from script.js
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ══════════════════════════════
           NAVIGATION
      ══════════════════════════════ */}
      <nav className="landing-nav">
        <Link className="logo" href="/">
          <div className="logo-icon">
            <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 2C5.13 2 2 5.13 2 9s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 2.5a2 2 0 110 4 2 2 0 010-4zm0 9.5a4.5 4.5 0 01-3.75-2.02C6.47 11.27 7.7 10.75 9 10.75s2.53.52 3.75 1.23A4.5 4.5 0 019 14z"
                fill="white"
              />
            </svg>
          </div>
          SRM CONNECT
        </Link>

        <ul className="nav-links">
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/clubs">Clubs</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>

        <Link className="btn-outline" href="/auth">
          Sign In
        </Link>
      </nav>

      {/* ══════════════════════════════
           SECTION 1 — HERO
      ══════════════════════════════ */}
      <section id="hero">
        <div className="hero-row">
          {/* LEFT */}
          <div className="hero-left">
            <h1>JOIN OUR COMMUNITY</h1>
            <p>
              Discover events, join clubs, and connect with peers at SRM. Your ultimate campus companion awaits.
            </p>
            <Link className="btn-solid" href="/auth">
              Get Started
            </Link>
          </div>

          {/* CENTER — Phone Mockup */}
          <div className="hero-phone-col">
            <div className="phone-shell">
              <div className="phone-screen">
                <div className="phone-notch"></div>
                <div className="phone-inner">
                  <div className="phone-header">
                    EXPLORE <em>CAMPUS</em>
                  </div>
                  <div className="phone-search text-current">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2.5"
                      className="shrink-0"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input 
                      type="text" 
                      placeholder="Search events..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearch}
                      className="bg-transparent border-none outline-none w-full flex-1 text-[0.85rem] placeholder:text-[#aaa] focus:ring-0 p-0 text-[var(--dark)] font-semibold"
                    />
                  </div>
                  <div className="phone-tags">
                    <span className="phone-tag">Technical</span>
                    <span className="phone-tag">Cultural</span>
                    <span className="phone-tag">Sports</span>
                    <span className="phone-tag">Hackathons</span>
                  </div>
                  <div className="phone-rec">Recommended</div>
                  <div className="phone-card">
                    <div className="phone-card-bg"></div>
                    <div className="phone-card-info">
                      <strong>AARUSH 2026</strong>
                      Upcoming · Next Week / 4 days
                    </div>
                  </div>
                </div>
                <div className="phone-navbar">
                  <span className="active">Home</span>
                  <span>Events</span>
                  <span>Clubs</span>
                  <span>Profile</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right">
            <h2>THE BEST EXPERIENCE IN CAMPUS LIFE</h2>
            <p>Thousands of students have already joined our community. What about you?</p>
            <div className="avatar-row">
              <div className="av av1"></div>
              <div className="av av2"></div>
              <div className="av av3"></div>
              <div className="av av4"></div>
              <div className="av-count">+10K</div>
            </div>
          </div>
        </div>

        {/* Destination Cards (phone overlaps from above) */}
        <div className="dest-strip">
          <div className="dest-card">
            <div className="dest-img bali"></div>
            <div className="dest-body">
              <div className="dest-tag">⚙ Major Event</div>
              <h4>AARUSH Fest</h4>
              <p>Oct 24 / 4 days · 50+ tech events</p>
            </div>
            <div className="dest-foot">
              <Link href="/events" className="btn-xs" style={{ textDecoration: 'none' }}>Explore</Link>
            </div>
          </div>

          <div className="dest-card">
            <div className="dest-img china"></div>
            <div className="dest-body">
              <div className="dest-tag">🎭 Cultural</div>
              <h4>MILAN</h4>
              <p>Mar 15 / 5 days · 100+ performances</p>
            </div>
            <div className="dest-foot">
              <Link href="/events" className="btn-xs" style={{ textDecoration: 'none' }}>Explore</Link>
            </div>
          </div>

          <div className="dest-card">
            <div className="dest-img paris"></div>
            <div className="dest-body">
              <div className="dest-tag">🏅 Athletics</div>
              <h4>SRM Sports Meet</h4>
              <p>Jan 10 / 3 days · 20+ tournaments</p>
            </div>
            <div className="dest-foot">
              <Link href="/events" className="btn-xs" style={{ textDecoration: 'none' }}>Explore</Link>
            </div>
          </div>

          <div className="dest-card">
            <div className="dest-img italy"></div>
            <div className="dest-body">
              <div className="dest-tag">💻 Coding</div>
              <h4>HackSRM</h4>
              <p>Nov 5 / 48 hours · 500+ hackers</p>
            </div>
            <div className="dest-foot">
              <Link href="/events" className="btn-xs" style={{ textDecoration: 'none' }}>Explore</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
           SECTION 2 — WHY CHOOSE US
      ══════════════════════════════ */}
      <section id="why">
        <div className="why-top reveal">
          <h2 className="section-title">WHY STUDENTS CHOOSE US</h2>
          <div className="section-aside">
            <h3>THE OFFICIAL CAMPUS COMPANION</h3>
            <p>Made for students, by students. Your gateway to everything SRM.</p>
          </div>
        </div>

        <div className="features-grid">
          <div className="feat lav reveal">
            <div className="feat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="2" width="14" height="20" rx="3" />
                <line x1="9" y1="7" x2="15" y2="7" />
                <line x1="9" y1="11" x2="15" y2="11" />
              </svg>
            </div>
            <div>
              <h3>FIND EVENTS EFFORTLESSLY</h3>
              <p>Register for any hackathon, fest, or workshop in just two clicks.</p>
            </div>
          </div>

          <div className="feat wht reveal">
            <div className="feat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" />
              </svg>
            </div>
            <div>
              <h3>STAY UPDATED <br/>REAL-TIME</h3>
              <p>Never miss an important announcement from your admin or clubs.</p>
            </div>
          </div>

          <div className="feat sage reveal">
            <div className="feat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="8" r="3" />
                <circle cx="16" cy="16" r="3" />
                <path d="M10.5 10.5L13.5 13.5" />
              </svg>
            </div>
            <div>
              <h3>DISCOVER CLUBS & TEAMS</h3>
              <p>Find the perfect student organization for you to collaborate and grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
           SECTION 3 — STATS + TOURS
      ══════════════════════════════ */}
      <section id="stats">
        <div className="stats-row">
          <div className="stat reveal">
            <div className="stat-n">500+</div>
            <div className="stat-l">YEARLY EVENTS</div>
          </div>
          <div className="stat reveal">
            <div className="stat-n">10K+</div>
            <div className="stat-l">ACTIVE STUDENTS</div>
          </div>
          <div className="stat reveal">
            <div className="stat-n">100+</div>
            <div className="stat-l">STUDENT CLUBS</div>
          </div>
        </div>

        <div className="tours-sec">
          <div className="tours-l reveal">
            <h2>
              VIBRANT CAMPUS LIFE
              <em>WE MAKE IT EASY TO GET INVOLVED</em>
            </h2>
            <p>
              Discover breathtaking talent, fierce competitions, and lifelong friendships. From hidden society meetings to iconic university fests — we have it all.
            </p>
            <Link className="btn-outline" href="/events" style={{ display: "inline-block", marginTop: "32px", textDecoration: 'none' }}>
              View all events
            </Link>
          </div>

          {/* Stacked Phone Mockups */}
          <div className="phones-stack reveal">
            <div className="ph-sm bl">
              <div className="scr">
                <div className="scr-c">
                  <div className="st">Recently Viewed</div>
                  <div className="scr-img"></div>
                  <div className="scr-sub">Event: CODE-A-THON</div>
                  <div className="scr-title">24Hr Coding Challenge</div>
                  <div className="scr-meta">⭐ 4.9 · Open to all</div>
                  <div className="scr-price">
                    FREE <span className="scr-unit">/ Entry</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ph-sm bc">
              <div className="scr">
                <div className="scr-c">
                  <div className="st">Fest: MILAN</div>
                  <div className="scr-img tall"></div>
                  <div className="scr-sub">National Level Cultural Fest</div>
                  <div className="scr-badges">
                    <span className="scr-badge primary">Dance</span>
                    <span className="scr-badge light">Music</span>
                    <span className="scr-badge light">Drama</span>
                  </div>
                  <div className="scr-title">The Grand Night</div>
                  <div className="scr-meta">⭐ 4.9 · Yearly Event</div>
                  <div className="scr-price">Register Now</div>
                </div>
              </div>
            </div>

            <div className="ph-sm br">
              <div className="scr">
                <div className="scr-c">
                  <div className="scr-sub">Hackathon Event</div>
                  <div className="st sm">HackSRM 2026</div>
                  <div className="scr-meta top">👥 4 members max</div>
                  <div className="price-option">
                    <div className="po-price">Rs 0</div>
                    <div className="scr-meta">Online Phase</div>
                  </div>
                  <div className="price-option">
                    <div className="po-price">Rs 500</div>
                    <div className="scr-meta">Campus Finals</div>
                  </div>
                  <div className="enquiry-btn">Join Team</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
           SECTION 4 — CTA
      ══════════════════════════════ */}
      <section id="cta">
        <div className="cta-l reveal">
          <h2>
            GET <em>CONNECTED</em>
          </h2>
          <p>
            Join the largest student network. Quick registrations, team formations, and 24-hour updates right at your fingertips.
          </p>
          <Link className="btn-solid" href="/auth">
            Sign In Now
          </Link>

          <div className="store-row">
            <span>
              The mobile app
              <br />
              is available now
            </span>
            <div className="store-btns">
              {/* Apple icon */}
              <div className="store-btn">
                <svg viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                </svg>
              </div>
              {/* Google Play icon */}
              <div className="store-btn">
                <svg viewBox="0 0 24 24">
                  <path d="M3.18 23.76a2 2 0 001.02-.27l11.44-6.47-2.56-2.56L3.18 23.76zM20.7 9.98a2 2 0 000-3.46L17.12 4.4l-2.8 2.8 2.8 2.8 3.58-2.07zM2.01.38A2 2 0 002 1v22a2 2 0 00.01.62L13.2 12 2.01.38zM14.36 13.14l2.76 2.76-11.44 6.47 8.68-9.23z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Phone Mockup */}
        <div className="cta-r reveal">
          <div className="cta-phone">
            <div className="cta-screen">
              <div className="cta-notch"></div>
              <div className="cta-head">
                <div className="st">My Calendar</div>
                <div className="cta-tabs">
                  <span className="cta-tab on">UPCOMING</span>
                  <span className="cta-tab">SAVED</span>
                  <span className="cta-tab">PAST</span>
                </div>
              </div>
              <div className="cta-body">
                <div className="tip">
                  <div className="tl">Tips for your hackathon</div>
                  <strong>Bring your student ID card</strong>
                  <span className="tip-text">Required for campus entry on weekends.</span>
                </div>
                <div className="trip">
                  <div className="tn">HackSRM Finals</div>
                  <div className="tr">📍 Tech Park Auditorium</div>
                  <div className="tr">Nov 5 – Nov 7</div>
                  <div className="thumb"></div>
                  <div className="tr gap">
                    <span>🗓 Nov 5</span>
                    <span>👥 Team of 4</span>
                  </div>
                </div>
              </div>
              <div className="cta-nav">
                <span>Home</span>
                <span>Events</span>
                <span className="on">Calendar</span>
                <span>Profile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
           FOOTER
      ══════════════════════════════ */}
      <footer className="landing-footer">
        <p>© 2026 SRM Connect V2. All rights reserved.</p>
      </footer>
    </>
  );
}
