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
    <div className="min-h-screen flex flex-col bg-bg-deep transition-colors duration-200">
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
      
      {/* 80px Top / 40px Bottom Footer Padding */}
      <footer className="pt-[80px] pb-[40px] border-t border-border bg-bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[48px] mb-[64px]">
            <div className="md:col-span-2 space-y-[24px]">
              <div className="flex items-center gap-[12px]">
                <img src="/logo-icon.svg" alt="ElectionLearn" className="h-[32px] w-auto" />
                <span className="font-heading font-black text-[24px] uppercase tracking-tighter">ElectionLearn</span>
              </div>
              <p className="text-text-muted text-[16px] max-w-[360px]">
                Empowering the world through data-driven civic education. Demystifying the democratic process for everyone.
              </p>
            </div>
            
            <div className="space-y-[24px]">
              <h4 className="label mb-0 text-white">Platform</h4>
              <nav className="flex flex-col gap-[16px]">
                <a href="/timeline" className="text-[14px] font-bold text-text-muted hover:text-primary transition-colors">Timeline</a>
                <a href="/modules" className="text-[14px] font-bold text-text-muted hover:text-primary transition-colors">Modules</a>
                <a href="/quiz" className="text-[14px] font-bold text-text-muted hover:text-primary transition-colors">Quizzes</a>
              </nav>
            </div>

            <div className="space-y-[24px]">
              <h4 className="label mb-0 text-white">Company</h4>
              <nav className="flex flex-col gap-[16px]">
                <a href="/about" className="text-[14px] font-bold text-text-muted hover:text-primary transition-colors">About Us</a>
                <a href="/privacy" className="text-[14px] font-bold text-text-muted hover:text-primary transition-colors">Privacy Policy</a>
                <a href="/contact" className="text-[14px] font-bold text-text-muted hover:text-primary transition-colors">Contact</a>
              </nav>
            </div>
          </div>
          
          {/* 16px Top Padding, 8px Bottom Padding as per specification */}
          <div className="pt-[24px] border-t border-border flex flex-col md:flex-row justify-between items-center gap-[24px]">
            <p className="text-[12px] text-text-dim font-bold uppercase tracking-widest">
              &copy; {new Date().getFullYear()} ElectionLearn Platform
            </p>
            <div className="flex gap-[32px] text-[10px] font-black uppercase tracking-[0.2em] text-text-dim">
              <span>Status: Operational</span>
              <span>v3.0.0 (Honest Edition)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
