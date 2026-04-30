import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import StatCard from '../components/ui/StatCard';
import { BookOpen, CheckCircle, Clock, Trophy, Flame, Bookmark as BookmarkIcon, ArrowRight, Sparkles } from 'lucide-react';

import { Link } from 'react-router-dom';
import ModuleCard from '../components/ui/ModuleCard';
import { modulesApi } from '../lib/api';
import type { Module } from '../types';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { stats, fetchStats, bookmarks, fetchBookmarks, fetchProgress } = useProgressStore();
  const [recommendations, setRecommendations] = useState<Module[]>([]);

  useEffect(() => {
    fetchStats();
    fetchBookmarks();
    fetchProgress();
    
    modulesApi.list().then(data => {
      setRecommendations(data.slice(0, 2));
    });
  }, [fetchStats, fetchBookmarks, fetchProgress]);

  if (!stats) return null;

  return (
    <div className="container py-12 md:py-20 animate-fade-in">
      <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.3em] mb-4">
            <Sparkles size={16} /> 
            Mission Control
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
            Greetings, <span className="text-primary italic">{user?.username}</span>
          </h1>
          <p className="text-text-muted text-lg mt-4 max-w-xl leading-relaxed">
            Your journey toward complete political literacy is <span className="text-white font-bold">{stats.overallProgress.toFixed(0)}%</span> complete. Keep pushing!
          </p>
        </div>
        <div className="flex gap-4">
          <Link to="/modules" className="btn-primary py-4 px-8 text-sm uppercase tracking-widest font-black">
            Continue Lessons
          </Link>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        <StatCard 
          label="Modules Completed" 
          value={stats.modulesCompleted || 0} 
          icon={CheckCircle} 
          trend="+2 this week"
          trendUp={true}
        />
        <StatCard 
          label="Knowledge Streak" 
          value={`${stats.streakDays || 0} Days`} 
          icon={Flame} 
          trend="Top 5%"
          trendUp={true}
        />
        <StatCard 
          label="Study Time" 
          value={`${Math.floor((stats.totalTimeMinutes || 0) / 60)}h ${ (stats.totalTimeMinutes || 0) % 60}m`} 
          icon={Clock} 
        />
        <StatCard 
          label="Certificates" 
          value={stats.quizzesPassed || 0} 
          icon={Trophy} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content: Recommendations */}
        <div className="lg:col-span-2 space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-white">Recommended for You</h2>
            <Link to="/modules" className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendations.map(module => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>

        {/* Sidebar: Bookmarks & Activity */}
        <div className="space-y-12">
          <div className="glass-card p-8 border-white/5 bg-white/[0.01]">
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
              <BookmarkIcon size={20} className="text-primary" /> Bookmarked
            </h3>
            {bookmarks.length > 0 ? (
              <div className="space-y-4">
                {bookmarks.map(module => (
                  <Link 
                    key={module.id} 
                    to={`/modules/${module.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <BookOpen size={20} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-sm font-bold text-white truncate">{module.title}</div>
                      <div className="text-[10px] text-text-muted uppercase tracking-widest">{module.type}</div>
                    </div>
                    <ArrowRight size={14} className="text-text-dim group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 px-6 border-2 border-dashed border-white/5 rounded-2xl">
                <p className="text-sm text-text-dim font-medium italic">Your bookmarks will appear here for quick access.</p>
              </div>
            )}
          </div>

          <div className="glass-card p-8 border-primary/20 bg-primary/5">
            <h3 className="text-xl font-black text-white mb-4">Pro Tip</h3>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Complete the <span className="text-white font-bold">Campaign Finance</span> module to unlock the "Transparency Master" badge!
            </p>
            <button className="text-xs font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-colors">
              Claim Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
