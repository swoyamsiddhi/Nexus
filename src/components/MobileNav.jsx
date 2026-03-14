import React from 'react';
import { Home, Compass, Target, Users, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function MobileNav() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Events', path: '/events', icon: Compass },
    { name: 'Teams', path: '/teams', icon: Users },
    { name: 'Projects', path: '/projects', icon: Target },
    { name: 'Skills', path: '/skills', icon: BookOpen },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map(item => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        return (
          <Link 
            key={item.name} 
            to={item.path}
            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
