import { useAuthStore } from '../../store/authStore';
import { useProgressStore } from '../../store/progressStore';
import { useThemeStore } from '../../store/themeStore';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu, X, LayoutDashboard, Moon, Sun, Home, Layers, Calendar, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { fetchStats } = useProgressStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuthenticated, fetchStats]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-300 ${scrolled ? 'pt-4' : 'pt-6'}`}>
      <nav className={`mx-auto container max-w-[1200px] h-[72px] flex items-center justify-between px-[32px] rounded-[24px] border border-border shadow-2xl transition-all duration-300 ${scrolled ? 'bg-bg-surface/90 backdrop-blur-md' : 'bg-bg-surface'}`}>
        {/* Brand Area */}
        <NavLink to="/" className="flex items-center gap-[12px] group shrink-0">
          <div className="w-[40px] h-[40px] bg-primary rounded-[12px] flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
             <span className="text-white font-black text-[18px]">EL</span>
          </div>
          <span className="font-heading font-black text-[22px] tracking-tight text-white hidden lg:block">
            Election<span className="text-primary italic">Learn</span>
          </span>
        </NavLink>

        {/* Floating Center Nav - Multi-multiple of 16px Gaps */}
        <div className="hidden md:flex items-center gap-[16px] bg-bg-deep/50 p-[8px] rounded-[16px] border border-border/50">
          <NavLink to="/" className={({isActive}) => `flex items-center gap-2 px-[16px] py-[8px] rounded-[12px] text-[12px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white hover:bg-white/5'}`}>
            <Home size={16} /> <span className="hidden lg:inline">Home</span>
          </NavLink>
          <NavLink to="/timeline" className={({isActive}) => `flex items-center gap-2 px-[16px] py-[8px] rounded-[12px] text-[12px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white hover:bg-white/5'}`}>
            <Calendar size={16} /> <span className="hidden lg:inline">Timeline</span>
          </NavLink>
          <NavLink to="/modules" className={({isActive}) => `flex items-center gap-2 px-[16px] py-[8px] rounded-[12px] text-[12px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white hover:bg-white/5'}`}>
            <Layers size={16} /> <span className="hidden lg:inline">Modules</span>
          </NavLink>
          <NavLink to="/faq" className={({isActive}) => `flex items-center gap-2 px-[16px] py-[8px] rounded-[12px] text-[12px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white hover:bg-white/5'}`}>
            <HelpCircle size={16} /> <span className="hidden lg:inline">FAQ</span>
          </NavLink>
        </div>

        {/* Right Action Stack */}
        <div className="flex items-center gap-[16px]">
          {/* Theme Toggle - Minimalist Circular */}
          <button 
            onClick={toggleTheme}
            className="w-[44px] h-[44px] flex items-center justify-center rounded-full bg-bg-card border border-border text-text-muted hover:text-primary transition-all hover:border-primary"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-[12px]">
              <NavLink to="/dashboard" className="hidden sm:flex btn btn-primary h-[44px] px-[20px] text-[12px] rounded-[14px]">
                <LayoutDashboard size={18} className="mr-2" />
                DASHBOARD
              </NavLink>
              
              <div className="relative group">
                <button className="w-[44px] h-[44px] rounded-[14px] bg-bg-card border border-border flex items-center justify-center text-primary group-hover:border-primary transition-all overflow-hidden shadow-lg">
                  {user?.username?.[0].toUpperCase() || <User size={20} />}
                </button>
                <div className="absolute right-0 top-full pt-[16px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="card p-[16px] min-w-[240px] shadow-2xl bg-bg-surface border-border">
                    <div className="pb-[16px] mb-[16px] border-b border-border">
                      <p className="font-black text-[14px] text-white uppercase tracking-wider">{user?.username}</p>
                      <p className="text-[12px] text-text-muted truncate">{user?.email}</p>
                    </div>
                    <div className="space-y-[8px]">
                      <NavLink to="/profile" className="flex items-center gap-3 px-[16px] py-[12px] hover:bg-bg-deep rounded-[12px] transition-colors text-[14px] font-bold">
                        <User size={16} /> Profile Settings
                      </NavLink>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-[16px] py-[12px] hover:bg-red-500/10 text-red-500 rounded-[12px] transition-colors text-[14px] font-bold">
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-[12px]">
              <NavLink to="/login" className="text-[14px] font-bold text-text-muted hover:text-white px-2">Log in</NavLink>
              <NavLink to="/register" className="btn btn-primary h-[44px] px-[24px] rounded-[14px]">GET STARTED</NavLink>
            </div>
          )}

          <button className="md:hidden text-text-muted w-[44px] h-[44px] flex items-center justify-center bg-bg-card rounded-[14px] border border-border" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Stylized Dock Extension */}
      {isMenuOpen && (
        <div className="md:hidden mx-auto container max-w-[1200px] mt-[16px] bg-bg-surface border border-border rounded-[24px] p-[32px] shadow-2xl animate-fade-in flex flex-col gap-[32px]">
          <div className="grid grid-cols-2 gap-[16px]">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center justify-center p-[24px] bg-bg-deep rounded-[20px] border border-border hover:border-primary transition-all">
              <Home size={32} className="text-primary mb-[12px]" />
              <span className="text-label mb-0">Home</span>
            </NavLink>
            <NavLink to="/timeline" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center justify-center p-[24px] bg-bg-deep rounded-[20px] border border-border hover:border-primary transition-all">
              <Calendar size={32} className="text-primary mb-[12px]" />
              <span className="text-label mb-0">Timeline</span>
            </NavLink>
            <NavLink to="/modules" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center justify-center p-[24px] bg-bg-deep rounded-[20px] border border-border hover:border-primary transition-all">
              <Layers size={32} className="text-primary mb-[12px]" />
              <span className="text-label mb-0">Modules</span>
            </NavLink>
            <NavLink to="/faq" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center justify-center p-[24px] bg-bg-deep rounded-[20px] border border-border hover:border-primary transition-all">
              <HelpCircle size={32} className="text-primary mb-[12px]" />
              <span className="text-label mb-0">Help Center</span>
            </NavLink>
          </div>
          <div className="flex flex-col gap-[16px]">
            {!isAuthenticated && (
              <>
                <NavLink to="/login" className="btn btn-secondary w-full h-[48px] rounded-[16px]">Log In</NavLink>
                <NavLink to="/register" className="btn btn-primary w-full h-[48px] rounded-[16px]">Join Platform</NavLink>
              </>
            )}
            {isAuthenticated && (
               <NavLink to="/dashboard" className="btn btn-primary w-full h-[48px] rounded-[16px]">Go to Dashboard</NavLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
