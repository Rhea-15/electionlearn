import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { Mail, Shield, Globe, Award, Settings, LogOut, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const { progress, stats } = useProgressStore();

  const achievements = [
    { title: 'Civic Novice', desc: 'Completed first module', icon: <Award className="text-blue-400" />, unlocked: true },
    { title: 'The Registrant', desc: 'Mastered voter registration', icon: <Globe className="text-green-400" />, unlocked: true },
    { title: 'Quiz Whiz', desc: '100% on any quiz', icon: <Award className="text-yellow-400" />, unlocked: stats ? stats.averageScore >= 95 : false },
    { title: 'Democracy Scholar', desc: 'Completed 10 modules', icon: <Award className="text-purple-400" />, unlocked: false },
  ];

  return (
    <div className="container py-12 max-w-6xl">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* User Info & Settings Sidebar */}
        <div className="space-y-8">
          <div className="glass-card p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-primary/20"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full bg-secondary border-4 border-bg-deep mx-auto mb-6 flex items-center justify-center text-primary text-4xl font-black">
                {user?.username?.[0].toUpperCase()}
              </div>
              <h2 className="text-2xl font-black mb-1">{user?.username}</h2>
              <p className="text-text-muted text-sm mb-6">{user?.profileType.replace('_', ' ')}</p>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg text-xs font-bold transition-colors hover:bg-white/10">
                  <Mail size={16} className="text-primary" /> {user?.email}
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg text-xs font-bold transition-colors hover:bg-white/10">
                  <Shield size={16} className="text-primary" /> Member since {new Date(user?.createdAt || '').getFullYear()}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-white/5">
              <h3 className="text-xs font-black text-text-muted uppercase tracking-widest">Settings</h3>
            </div>
            <div className="p-2">
              <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3 font-bold text-sm">
                  <Settings size={18} className="text-text-muted group-hover:text-primary" /> Account Settings
                </div>
                <ChevronRight size={16} className="text-text-muted" />
              </button>
              <button 
                onClick={() => logout()}
                className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-red-500/10 transition-colors group text-red-400"
              >
                <div className="flex items-center gap-3 font-bold text-sm">
                  <LogOut size={18} /> Logout
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Achievement & Progress Area */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
              <Award className="text-primary" /> Achievements
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {achievements.map((ach, i) => (
                <div key={i} className={`glass-card p-6 flex gap-6 items-center border-b-4 transition-all ${ach.unlocked ? 'border-primary' : 'border-white/5 opacity-50 contrast-50'}`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${ach.unlocked ? 'bg-primary/10' : 'bg-white/5'}`}>
                    {ach.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{ach.title}</h4>
                    <p className="text-xs text-text-muted">{ach.desc}</p>
                    {ach.unlocked && <div className="mt-2 text-[10px] font-black uppercase text-primary tracking-widest">Unlocked</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
              <CheckCircle2 className="text-primary" /> Learning Progress
            </h2>
            <div className="space-y-4">
              {progress.length > 0 ? progress.map((p, i) => (
                <div key={i} className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">Module #{p.moduleId.slice(0, 4)}</h4>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${p.completionPercentage === 100 ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'}`}>
                      {p.completionPercentage === 100 ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${p.completionPercentage}%` }}
                      className={`h-full ${p.completionPercentage === 100 ? 'bg-green-500' : 'bg-primary'}`}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-text-muted font-bold uppercase tracking-widest">
                    <span>{p.completionPercentage}% Complete</span>
                    <span>{Math.floor(p.timeSpentSeconds / 60)}m invested</span>
                  </div>
                </div>
              )) : (
                <div className="glass-card p-12 text-center">
                  <p className="text-text-muted mb-4 uppercase tracking-widest font-bold text-xs italic">No history found</p>
                  <Link to="/modules" className="btn-primary py-3 px-8 text-xs">Start Your First Module</Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
