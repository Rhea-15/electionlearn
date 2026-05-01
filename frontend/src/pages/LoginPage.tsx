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
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-[24px] bg-bg-deep">
      <div className="w-full max-w-[480px] animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-[8px] text-text-muted hover:text-white mb-[32px] transition-colors text-[14px] font-bold">
          <ArrowLeft size={16} /> BACK TO PLATFORM
        </Link>

        {/* Solid Card - 40px Padding */}
        <div className="card p-[40px] shadow-2xl">
          <div className="mb-[32px] text-center">
            <h2 className="mb-[8px] text-white">Welcome Back</h2>
            <p className="text-body text-text-muted">Continue your journey to political literacy</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-[24px] text-left">
            <div>
              <label className="label">Username</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="Enter username" 
                  required
                  className="pl-[48px]"
                />
                <Mail className="absolute left-[16px] top-1/2 -translate-y-1/2 text-text-dim" size={18} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-[8px]">
                <label className="label mb-0">Password</label>
                <a href="#" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  required
                  className="pl-[48px]"
                />
                <Lock className="absolute left-[16px] top-1/2 -translate-y-1/2 text-text-dim" size={18} />
              </div>
            </div>

            {error && <p className="text-red-400 text-[14px] text-center font-bold bg-red-400/10 py-[16px] rounded-[8px] border border-red-400/20">{error}</p>}

            <div className="pt-[8px]">
              <button type="submit" disabled={isLoading} className="w-full btn btn-primary h-[48px] uppercase font-black tracking-widest">
                {isLoading ? 'SIGNING IN...' : 'LOG IN TO DASHBOARD'} <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          </form>

          <div className="text-center mt-[32px] pt-[24px] border-t border-border">
            <p className="text-[14px] text-text-muted">
              Don't have an account? {' '}
              <Link to="/register" className="text-primary font-black hover:underline">CREATE ONE FREE</Link>
            </p>
          </div>
        </div>

        <div className="mt-[48px] text-center">
          <p className="text-[10px] font-black text-text-dim uppercase tracking-[0.3em]">Secured by ElectionLearn Infrastructure</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
