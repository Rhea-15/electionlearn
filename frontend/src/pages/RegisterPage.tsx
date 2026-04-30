import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ArrowLeft, ShieldCheck, GraduationCap, School, Users } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import type { ProfileType } from '../types';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profileType: 'general' as ProfileType
  });

  const { register, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username && formData.email && formData.password.length >= 8) {
      setStep(2);
    } else if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
    }
  };

  const handleRegister = async () => {
    try {
      await register(formData);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      // Error handled by store
    }
  };

  const profileTypes = [
    { id: 'first_time_voter' as ProfileType, label: 'First Time Voter', icon: <GraduationCap />, desc: 'Getting ready for your first ballot' },
    { id: 'student' as ProfileType, label: 'Student', icon: <School />, desc: 'Learning for academic purposes' },
    { id: 'educator' as ProfileType, label: 'Educator', icon: <Users />, desc: 'Leading civic classes' },
    { id: 'general' as ProfileType, label: 'General Learner', icon: <ShieldCheck />, desc: 'Self-education for better citizenship' },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--primary-glow)_0%,_transparent_50%)]">
      <div className="w-full max-w-[500px] animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-2 text-text-muted hover:text-white mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="glass-card p-10 border-white/5 shadow-2xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-black mb-2">Create Account</h1>
            <p className="text-text-muted text-sm px-8">Join the next generation of informed citizens</p>
            
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className={`h-1.5 w-12 rounded-full transition-all ${step >= 1 ? 'bg-primary' : 'bg-white/10'}`}></div>
              <div className={`h-1.5 w-12 rounded-full transition-all ${step >= 2 ? 'bg-primary' : 'bg-white/10'}`}></div>
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-6">
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
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@example.com" 
                    required
                    className="pl-12"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••" 
                    required
                    minLength={8}
                    className="pl-12"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                </div>
              </div>

              <button type="submit" className="w-full btn-primary py-4.5 text-lg shadow-lg">
                Continue <ArrowRight size={20} className="ml-2" />
              </button>
            </form>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                {profileTypes.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setFormData({...formData, profileType: pt.id})}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${formData.profileType === pt.id ? 'border-primary bg-primary/10' : 'border-white/5 hover:border-white/20 hover:bg-white/5'}`}
                  >
                    <div className={`mb-4 w-10 h-10 rounded-xl flex items-center justify-center ${formData.profileType === pt.id ? 'bg-primary text-slate-900' : 'bg-white/5 text-text-muted'}`}>
                      {pt.icon}
                    </div>
                    <div className="font-bold text-sm mb-1">{pt.label}</div>
                    <p className="text-[10px] text-text-muted leading-tight">{pt.desc}</p>
                  </button>
                ))}
              </div>

              {error && <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-3 rounded-lg border border-red-400/20">{error}</p>}

              <div className="space-y-4">
                <button 
                  onClick={handleRegister} 
                  disabled={isLoading}
                  className="w-full btn-primary py-4.5 text-lg disabled:opacity-50"
                >
                  {isLoading ? 'Creating Account...' : 'Complete Registration'}
                </button>
                <button onClick={() => setStep(1)} className="w-full py-2 text-xs font-bold text-text-muted hover:text-white transition-colors">
                  Change Credentials
                </button>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
            <p className="text-sm text-text-muted">
              Already have an account? {' '}
              <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
