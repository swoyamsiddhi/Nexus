import React from 'react';

const HomeFeed: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 md:px-10 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl">hub</span>
              <h2 className="text-xl font-bold leading-tight tracking-tight">SRM Connect</h2>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-primary font-semibold border-b-2 border-primary pb-1" href="#">Home</a>
              <a className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Events</a>
              <a className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Teams</a>
              <a className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Projects</a>
              <a className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Skills</a>
            </nav>
          </div>
          <div className="flex flex-1 justify-end gap-4 items-center">
            <label className="hidden lg:flex items-center bg-primary/5 dark:bg-primary/10 rounded-lg px-3 py-1.5 w-64 border border-primary/10 focus-within:border-primary/40 transition-all">
              <span className="material-symbols-outlined text-primary/60 mr-2">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none placeholder:text-slate-400" placeholder="Search projects or skills..." />
            </label>
            <div className="flex gap-2">
              <button className="flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined">chat_bubble</span>
              </button>
            </div>
            <div className="size-9 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
              <img className="w-full h-full object-cover" data-alt="User profile avatar portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwlDpVk9hHvMdz7JdWcVbd76XcJ0zFhAapiHjsnOtrEzZ9_mDu982ikQbur-nsOMPeoR2lSyPtslYECV1dzpygq2xloVg6qsB0-W_B-iskw45iSHTmhI9GLb42Ru2ugCUHP6vHL0Cx7Ef7xhqiyxzGVt-nX0teg98drZ5dWKgZ48cX0kaiDn5ldauBUXN7J0_GFR5o7Ikmgs2KRvW_nM5f8NjzkIu-0_DMdpo-QqEh1jP0rXRaJUuog6V0w2tt4Ot3G54501NyZE0" />
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar (Mini navigation & Quick Filters) */}
        <aside className="hidden lg:flex lg:col-span-2 flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">home</span>
              <span className="text-sm font-semibold">Home Feed</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 transition-colors group">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-primary">calendar_month</span>
              <span className="text-sm font-medium">My Schedule</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 transition-colors group">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-primary">groups</span>
              <span className="text-sm font-medium">Joined Teams</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 transition-colors group">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-primary">bookmark</span>
              <span className="text-sm font-medium">Saved Items</span>
            </div>
          </div>
          <div className="pt-6 border-t border-primary/10">
            <p className="text-xs font-bold text-slate-400 flex items-center justify-between uppercase tracking-widest px-3 mb-3">Your Clubs</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 px-3 group cursor-pointer">
                <div className="size-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">ACM</div>
                <span className="text-sm font-medium group-hover:text-primary">ACM Chapter</span>
              </div>
              <div className="flex items-center gap-3 px-3 group cursor-pointer">
                <div className="size-8 rounded-lg bg-teal-500 flex items-center justify-center text-white text-[10px] font-bold">WEB</div>
                <span className="text-sm font-medium group-hover:text-primary">WebDev Hub</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          {/* Feed Header & Filter */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Student Feed</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">What's happening in SRM today</p>
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all text-sm">
                <span className="material-symbols-outlined text-lg">add</span>
                Post Update
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/10 text-primary border border-primary/20 px-4 text-sm font-semibold">
                All
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 px-4 text-sm font-medium hover:border-primary/40">
                <span className="material-symbols-outlined text-lg">event</span>
                Events
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 px-4 text-sm font-medium hover:border-primary/40">
                <span className="material-symbols-outlined text-lg">rocket_launch</span>
                Projects
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 px-4 text-sm font-medium hover:border-primary/40">
                <span className="material-symbols-outlined text-lg">campaign</span>
                Announcements
              </button>
            </div>
          </div>

          {/* Feed Content */}
          <div className="flex flex-col gap-6">
            {/* Announcement Card */}
            <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                  <span className="material-symbols-outlined">campaign</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Admin Office</p>
                  <p className="text-xs text-slate-500">2 hours ago • Announcement</p>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Final Semester Schedule Released</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                The end-term examination schedule for all undergraduate programs is now available on the official portal. Please check for any overlaps and report by Friday.
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex -space-x-2">
                  <div className="size-7 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvAeI3XDirxOrZniwaM6-BU6jumoJzbQ2FpKN5B18jnpKzNIV3tzKP7tMukt5tu8eK8qY4e-ZCZRce-dUJt7wZNnOgi8HF81itzwe7NWyo38M4b1_EcvzeOTMI_v8bSIkvKHSnR7XbZpgUQU2uJk_mXMVowPLcYSNSPLmMnIyWRNoQ87Au1_fZhmMbBRgLGf11HyC5nYMDUZaL30tz-7A4wiqLQXnBQKk2cg3tBq99mXslo3nsQQW_xplFenNSN9rZKUipc1R5JL4")'}}></div>
                  <div className="size-7 rounded-full border-2 border-white dark:border-slate-900 bg-slate-300 bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBR274E_4TwAU7IcWbqR21lrUNOE-i75r-M8mAnEcJ9t9WRQUXprgGirkbDp_VXJXtwpmGZ9isoC4_sRP50Za3n9t512D_adeBGfDMIjXFZe8Q68l41S0UoArndtyUCfV2RdqSIW93O5JjKsdb_4dghBYd2inuXl6VPoEW4dBE3SevFIwRxbBsBksciLMtvU4MtaMOncU7g4rJ0eCKaPyzJtOLa5QxwWr_Thmk1sHPU-LsrD7PScBC5ebf3TOW454Y34fdv23gRt_s")'}}></div>
                  <div className="flex items-center justify-center size-7 rounded-full border-2 border-white dark:border-slate-900 bg-primary/10 text-[10px] text-primary font-bold">+1.2k</div>
                </div>
                <button className="text-primary text-sm font-semibold flex items-center gap-1">View Details <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
              </div>
            </div>

            {/* Event Highlight Card */}
            <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group">
              <div className="relative h-48 bg-slate-200">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img className="absolute inset-0 w-full h-full object-cover z-0" data-alt="Tech hackathon event banner poster" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmH8WMY-Hz36HCMu6o4r2QpgmjT6XjZSZ1Ne8lmISOQZPw0bY1Jwlj2Lp0mqLvBsrSzzFEJzTP2BhJmrYPAm8IuVvwXQbt4IIh1y4re0Bt92kWMf7zT-JnAvuJj91awJR0T3xt8WzTFAjwwawv5Qbx9fh18TBXut_caq5mj5bAaXfpD-HA-IIlaO2ob8SPPis6JJO2UIyufr-tgfRGSsRFOIY89NVwLWbe-d8SMApbUkFrq_sCJ1Af-ju7qwRLSkNVwdGg0A5aGQ8" />
                <div className="absolute bottom-4 left-4 text-white z-20">
                  <span className="bg-teal-500 text-[10px] font-bold uppercase px-2 py-1 rounded mb-2 inline-block">Registration Open</span>
                  <h3 className="text-xl font-bold">HackSRM: 24h Build-a-thon</h3>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-6 mb-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-lg">event</span>
                    Oct 12, 2023
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                    Main Auditorium
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
                  Join over 500 developers to build innovative solutions for local community problems. Mentors from top tech companies will be present.
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 bg-primary text-white py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-all">Join Event</button>
                  <button className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                    <span className="material-symbols-outlined text-slate-500">share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Project Highlight Card */}
            <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                    <img className="w-full h-full object-cover" data-alt="Project lead profile photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzBkTIVOtBwLB3FMNsRfon83BJIp6AB0MNMEozj22Cjw3_uVN_N3eTfCg2pFhL_KN757u1Nb8Js5suy75bLrP0Xi_7jRc4oVPD3gHvRhfO_fi1yO-z6dPvv0oN0Iu5SXoSr-8pCIFOoeb_sq9lFuwjnNlzsBhd1xGETv84b5OGm02Bymci3bG7rWl-3-toXgCgKL8oCesbnXEFoWVotgkbhXaaKkxvLQd0i_cbcxWCFs556UWGQxw-O5Fbzl1x4htCzloliArcAMY" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Alex Rivera</p>
                    <p className="text-xs text-slate-500">4 hours ago • Project Update</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">Robotics</span>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Automated Campus Delivery Drone</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  We've successfully tested the obstacle avoidance algorithm! Currently looking for a <b>UI/UX designer</b> to help build the control dashboard and <b>Flutter developer</b> for the mobile app.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <img className="rounded-lg object-cover h-32 w-full" data-alt="Drone prototype in lab setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXIfjVgpNeSU0mw5v_xS63xXA25j2CN6BHlXfRpGPqw0d7AVEAjQ2xRMyC82foiq5-HbeWEiALbl5P-TiV5FVwjxsDfR9zAhuCGdbfRXGCrgy6UFD_B4STYUsYOzY16KeaOBzW3EeCswlW8mMM2QOszvoLiQxUvBkLtyu96B1YJ8ZOc7jjM7zbPeG_NxrBxwk_T74B57nquaJxjJZmsqoMAJCh2tYYqOQZuF2uhGDdJYwAvoE53DkdUy7M_ad9wKcwkzNxHa0aiK8" />
                <img className="rounded-lg object-cover h-32 w-full" data-alt="Mobile app dashboard wireframe" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqQ-r9jmWf8aEbDJqropt-sVtX4KR4NqVSzu_X8y7sXzLDrSx2eYLhHsTz2irh_FUnNx4kvGpAJULgOrjnC8UZz651XU-h8cupqAGKFCzrrXjHDXrWaEA3K1J5dG8SZvmTvLPuNaNgeIi7gTGZ3xxlcPQtgbLrzlUrFrT6F_yRlD_VruRLLqeDLOIMLMo--yhj0jWi7x-RxhZUgilJj8L2VIw6AVn0YTqL66y1JyksLKdWYX92QDKCHPtM9C9q54Wly9VZH6VS-vE" />
              </div>
              <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-xs">
                <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
                  <span className="material-symbols-outlined text-lg">favorite</span>
                  42 Likes
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
                  <span className="material-symbols-outlined text-lg">chat_bubble</span>
                  12 Comments
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-primary ml-auto">
                  <span className="material-symbols-outlined text-lg">group_add</span>
                  Request to Join
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Sidebar (Upcoming & Trending) */}
        <aside className="hidden xl:flex lg:col-span-3 flex-col gap-6">
          {/* Upcoming For You */}
          <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Upcoming for You</h4>
              <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-start border-l-4 border-primary pl-3 py-1">
                <div>
                  <p className="text-[10px] font-bold text-primary uppercase">Tomorrow • 10:00 AM</p>
                  <h5 className="text-sm font-bold">Algorithms Workshop</h5>
                  <p className="text-xs text-slate-500">Hall B-102</p>
                </div>
              </div>
              <div className="flex gap-3 items-start border-l-4 border-teal-500 pl-3 py-1">
                <div>
                  <p className="text-[10px] font-bold text-teal-500 uppercase">Fri, 15 Oct • 4:00 PM</p>
                  <h5 className="text-sm font-bold">Team Sync: Delivery Drone</h5>
                  <p className="text-xs text-slate-500">MakerSpace</p>
                </div>
              </div>
              <div className="flex gap-3 items-start border-l-4 border-slate-300 dark:border-slate-700 pl-3 py-1">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Mon, 18 Oct • 2:00 PM</p>
                  <h5 className="text-sm font-bold">Industry Guest Lecture</h5>
                  <p className="text-xs text-slate-500">Main Hall</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-2 text-primary text-sm font-bold hover:bg-primary/5 rounded-lg transition-colors">See Full Schedule</button>
          </div>

          {/* Trending Skills */}
          <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Trending Skills</h4>
              <span className="material-symbols-outlined text-teal-500 text-xl">trending_up</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer hover:bg-primary/20">#reactjs</span>
              <span className="bg-teal-500/10 text-teal-600 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer hover:bg-teal-500/20">#machinelearning</span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer hover:bg-slate-200">#uiux</span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer hover:bg-slate-200">#flutter</span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer hover:bg-slate-200">#python</span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer hover:bg-slate-200">#blockchain</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 italic">Based on latest project requests</p>
          </div>

          {/* Active Teams */}
          <div className="bg-gradient-to-br from-primary to-indigo-700 rounded-xl p-5 text-white shadow-xl">
            <h4 className="font-bold mb-1">Exchange Skills?</h4>
            <p className="text-xs text-white/80 mb-4 leading-relaxed">Teach what you know, learn what you need from fellow students.</p>
            <button className="w-full py-2.5 bg-white text-primary rounded-lg font-bold text-sm shadow-sm hover:bg-slate-50 transition-all">Visit Skill Hub</button>
          </div>
        </aside>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
        <button className="flex flex-col items-center text-primary">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] mt-1 font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center text-slate-400">
          <span className="material-symbols-outlined">calendar_month</span>
          <span className="text-[10px] mt-1">Events</span>
        </button>
        <button className="bg-primary size-12 -mt-10 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-background-light dark:border-background-dark">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
        <button className="flex flex-col items-center text-slate-400">
          <span className="material-symbols-outlined">rocket_launch</span>
          <span className="text-[10px] mt-1">Projects</span>
        </button>
        <button className="flex flex-col items-center text-slate-400">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default HomeFeed;
