import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      // Error handled by store
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_bottom,_var(--primary-glow)_0%,_transparent_50%)]">
      <div className="w-full max-w-[450px] animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-2 text-text-muted hover:text-white mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to platform
        </Link>

        <div className="glass-card p-10 border-white/5 shadow-2xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black mb-2">Welcome Back</h1>
            <p className="text-text-muted text-sm">Continue your journey to political literacy</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Username</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="Enter username" 
                  required
                  className="pl-12"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Password</label>
                <a href="#" className="text-[10px] font-bold text-primary hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  required
                  className="pl-12"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-3 rounded-lg border border-red-400/20">{error}</p>}

            <button type="submit" disabled={isLoading} className="w-full btn-primary py-4.5 text-lg shadow-lg disabled:opacity-50">
              {isLoading ? 'Signing in...' : 'Sign In'} <ArrowRight size={20} className="ml-2" />
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-sm text-text-muted">
              Don't have an account? {' '}
              <Link to="/register" className="text-primary font-bold hover:underline">Create one free</Link>
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em]">Secured by ElectionLearn Infrastructure</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
