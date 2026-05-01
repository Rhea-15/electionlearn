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
    { id: 'first_time_voter' as ProfileType, label: 'First Time Voter', icon: <GraduationCap size={20} />, desc: 'Getting ready for your first ballot' },
    { id: 'student' as ProfileType, label: 'Student', icon: <School size={20} />, desc: 'Learning for academic purposes' },
    { id: 'educator' as ProfileType, label: 'Educator', icon: <Users size={20} />, desc: 'Leading civic classes' },
    { id: 'general' as ProfileType, label: 'General Learner', icon: <ShieldCheck size={20} />, desc: 'Self-education for better citizenship' },
  ];

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-[24px] bg-bg-deep">
      <div className="w-full max-w-[480px] animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-[8px] text-text-muted hover:text-white mb-[32px] transition-colors text-[14px] font-bold">
          <ArrowLeft size={16} /> BACK TO HOME
        </Link>

        {/* Solid Card - 40px Padding */}
        <div className="card p-[40px] shadow-2xl">
          <div className="mb-[32px] text-center">
            <h2 className="mb-[8px] text-white">Create Account</h2>
            <p className="text-body text-text-muted">Join the next generation of informed citizens</p>
            
            <div className="flex items-center justify-center gap-[12px] mt-[32px]">
              <div className={`h-[4px] w-[64px] rounded-full transition-all ${step >= 1 ? 'bg-primary' : 'bg-border'}`}></div>
              <div className={`h-[4px] w-[64px] rounded-full transition-all ${step >= 2 ? 'bg-primary' : 'bg-border'}`}></div>
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-[24px] text-left">
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
                  <User className="absolute left-[16px] top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                </div>
              </div>

              <div>
                <label className="label">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@example.com" 
                    required
                    className="pl-[48px]"
                  />
                  <Mail className="absolute left-[16px] top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                </div>
              </div>

              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••" 
                    required
                    minLength={8}
                    className="pl-[48px]"
                  />
                  <Lock className="absolute left-[16px] top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                </div>
              </div>

              <div className="pt-[8px]">
                <button type="submit" className="w-full btn btn-primary h-[48px] uppercase font-black tracking-widest">
                  CONTINUE TO STEP 2 <ArrowRight size={20} className="ml-2" />
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-[32px] animate-fade-in text-left">
              <div className="grid grid-cols-2 gap-[16px]">
                {profileTypes.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setFormData({...formData, profileType: pt.id})}
                    className={`p-[24px] rounded-[16px] border-2 text-left transition-all ${formData.profileType === pt.id ? 'border-primary bg-primary/5' : 'border-border bg-bg-deep hover:border-primary/50'}`}
                  >
                    <div className={`mb-[16px] w-[40px] h-[40px] rounded-[8px] flex items-center justify-center ${formData.profileType === pt.id ? 'bg-primary text-white' : 'bg-bg-card text-text-dim'}`}>
                      {pt.icon}
                    </div>
                    <div className="font-black text-[12px] uppercase mb-[4px] text-white leading-tight">{pt.label}</div>
                    <p className="text-[10px] text-text-muted leading-tight">{pt.desc}</p>
                  </button>
                ))}
              </div>

              {error && <p className="text-red-400 text-[14px] text-center font-bold bg-red-400/10 py-[16px] rounded-[8px] border border-red-400/20">{error}</p>}

              <div className="space-y-[16px]">
                <button 
                  onClick={handleRegister} 
                  disabled={isLoading}
                  className="w-full btn btn-primary h-[48px] uppercase font-black tracking-widest"
                >
                  {isLoading ? 'INITIATING...' : 'COMPLETE REGISTRATION'}
                </button>
                <button onClick={() => setStep(1)} className="w-full h-[32px] text-[10px] font-black tracking-widest text-text-dim hover:text-white transition-colors">
                  BACK TO CREDENTIALS
                </button>
              </div>
            </div>
          )}

          <div className="text-center mt-[32px] pt-[24px] border-t border-border">
            <p className="text-[14px] text-text-muted">
              Already have an account? {' '}
              <Link to="/login" className="text-primary font-black hover:underline">LOG IN</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
