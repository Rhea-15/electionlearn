import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';

const AppLayout = () => {
  const { checkAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
    document.documentElement.setAttribute('data-theme', theme);
  }, [checkAuth, theme]);

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep text-text-main transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-surface)',
            color: 'var(--text-main)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
          },
        }}
      />
      <footer className="py-20 border-t border-border bg-bg-surface/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-white font-black text-lg">EL</span>
                </div>
                <span className="font-heading font-black text-2xl tracking-tighter">ElectionLearn</span>
              </div>
              <p className="text-text-muted text-base max-w-sm leading-relaxed">
                Empowering the world through data-driven civic education. Demystifying the democratic process for everyone.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-black text-sm uppercase tracking-widest text-text-main">Platform</h4>
              <nav className="flex flex-col gap-2">
                <a href="/timeline" className="footer-link">Timeline</a>
                <a href="/modules" className="footer-link">Modules</a>
                <a href="/quiz" className="footer-link">Quizzes</a>
              </nav>
            </div>

            <div className="space-y-6">
              <h4 className="font-black text-sm uppercase tracking-widest text-text-main">Company</h4>
              <nav className="flex flex-col gap-2">
                <a href="/about" className="footer-link">About Us</a>
                <a href="/privacy" className="footer-link">Privacy</a>
                <a href="/contact" className="footer-link">Contact</a>
              </nav>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-text-dim font-bold">
              &copy; {new Date().getFullYear()} ElectionLearn. All rights reserved.
            </p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-text-dim">
              <span>System: Operational</span>
              <span>v2.1.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
