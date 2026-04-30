import { useAuthStore } from '../../store/authStore';
import { useProgressStore } from '../../store/progressStore';
import { useThemeStore } from '../../store/themeStore';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu, X, LayoutDashboard, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { fetchStats } = useProgressStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated, fetchStats]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="glass sticky top-0 z-50 h-[80px] flex items-center bg-bg-surface/80 backdrop-blur-lg">
      <div className="container flex items-center justify-between h-full">
        <NavLink to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-6 transition-all shadow-lg shadow-primary/20">
            <span className="text-white font-black text-xl">EL</span>
          </div>
          <span className="text-2xl font-black tracking-tight font-heading hidden sm:block">
            Election<span className="text-primary">Learn</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <NavLink to="/timeline" className={({isActive}) => `text-sm font-bold tracking-wide uppercase hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-text-muted'}`}>
            Timeline
          </NavLink>
          <NavLink to="/modules" className={({isActive}) => `text-sm font-bold tracking-wide uppercase hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-text-muted'}`}>
            Modules
          </NavLink>
          <NavLink to="/faq" className={({isActive}) => `text-sm font-bold tracking-wide uppercase hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-text-muted'}`}>
            Help Center
          </NavLink>
        </div>

        <div className="flex items-center gap-3 lg:gap-6">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-secondary text-text-muted hover:text-primary hover:border-primary border border-transparent transition-all"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <NavLink to="/dashboard" className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white hover:brightness-110 transition-all font-bold text-sm shadow-lg shadow-primary/20">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>
              
              <div className="relative group">
                <button className="w-11 h-11 rounded-full bg-secondary border border-border flex items-center justify-center text-primary group-hover:border-primary transition-all shadow-sm">
                  {user?.username?.[0].toUpperCase() || <User size={20} />}
                </button>
                <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="glass-card p-2 min-w-[220px]">
                    <div className="px-4 py-4 border-b border-border">
                      <p className="font-black text-sm text-text-main mb-0.5">{user?.username}</p>
                      <p className="text-xs text-text-muted truncate">{user?.email}</p>
                    </div>
                    <div className="p-1.5 space-y-1">
                      <NavLink to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-bg-surface rounded-lg transition-colors text-sm font-bold">
                        <User size={16} /> Profile
                      </NavLink>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors text-sm font-bold">
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <NavLink to="/login" className="px-5 py-2 text-sm font-bold text-text-muted hover:text-primary transition-colors">
                Log in
              </NavLink>
              <NavLink to="/register" className="btn-primary py-2.5 px-7 text-sm font-bold shadow-md">
                Join Now
              </NavLink>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2.5 text-text-muted hover:text-primary transition-all bg-secondary rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[80px] bg-bg-deep z-[60] p-8 flex flex-col gap-8 animate-fade-in transition-colors">
          <div className="flex flex-col gap-6">
            <NavLink to="/timeline" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black py-2 hover:text-primary">Timeline</NavLink>
            <NavLink to="/modules" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black py-2 hover:text-primary">Modules</NavLink>
            <NavLink to="/faq" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black py-2 hover:text-primary">Help Center</NavLink>
          </div>
          <div className="mt-auto flex flex-col gap-4">
            {!isAuthenticated && (
              <>
                <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="btn-secondary w-full justify-center py-4">Log in</NavLink>
                <NavLink to="/register" onClick={() => setIsMenuOpen(false)} className="btn-primary w-full justify-center py-4">Get Started</NavLink>
              </>
            )}
            {isAuthenticated && (
               <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)} className="btn-primary w-full justify-center py-4">Dashboard</NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
