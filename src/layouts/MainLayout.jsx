import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';

export default function MainLayout() {
  return (
    <div className="app-container" style={{ flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* We will insert specific module sidebars inside the individual page components, 
            or use a global sidebar here if needed. According to screenshots, some modules 
            have left sidebars (Home, Events), so we'll leave this structural wrapper flexible. */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
