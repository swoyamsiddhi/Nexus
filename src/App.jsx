import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import OrganizerLayout from './layouts/OrganizerLayout';
import Home from './pages/Home';
import Events from './pages/Events';
import Projects from './pages/Projects';
import Teams from './pages/Teams';
import Skills from './pages/Skills';
import EventDetail from './pages/EventDetail';
import ProjectDetail from './pages/ProjectDetail';

// Organizer Dashboard Pages
import OrganizerOverview from './pages/organizer/Overview';
import OrganizerEvents from './pages/organizer/Events';
import OrganizerQuickPosts from './pages/organizer/QuickPosts';
import OrganizerMembers from './pages/organizer/Members';
import OrganizerAnnouncements from './pages/organizer/Announcements';
import OrganizerReports from './pages/organizer/Reports';
import OrganizerSettings from './pages/organizer/Settings';

function App() {
  return (
    <Routes>
      {/* Student Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetail />} />
        <Route path="teams" element={<Teams />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="skills" element={<Skills />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Organizer Dashboard Routes */}
      <Route path="/organizer" element={<OrganizerLayout />}>
        <Route index element={<OrganizerOverview />} />
        <Route path="events" element={<OrganizerEvents />} />
        <Route path="quick-posts" element={<OrganizerQuickPosts />} />
        <Route path="members" element={<OrganizerMembers />} />
        <Route path="announcements" element={<OrganizerAnnouncements />} />
        <Route path="reports" element={<OrganizerReports />} />
        <Route path="settings" element={<OrganizerSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
