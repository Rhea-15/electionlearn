import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import DashboardPage from './pages/DashboardPage';
import ModulesPage from './pages/ModulesPage';
import TimelinePage from './pages/TimelinePage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import QuizPage from './pages/QuizPage';
import FaqPage from './pages/FaqPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/faq" element={<FaqPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/modules" element={<ModulesPage />} />
            <Route path="/modules/:slug" element={<ModuleDetailPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
