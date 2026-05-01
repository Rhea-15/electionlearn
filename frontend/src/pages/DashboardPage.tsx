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
    <div className="container py-[80px] animate-fade-in">
      <header className="mb-[64px] flex flex-col md:flex-row md:items-end justify-between gap-[32px]">
        <div className="text-left">
          <div className="label text-primary flex items-center gap-[6px] mb-[16px]">
            <Sparkles size={16} /> 
            MISSION CONTROL
          </div>
          <h1 className="mb-[16px] text-white">
            Greetings, <span className="text-primary italic">{user?.username}</span>
          </h1>
          <p className="text-body text-text-muted max-w-xl">
            Your journey toward complete political literacy is <span className="text-white font-black">{stats.overallProgress.toFixed(0)}%</span> complete.
          </p>
        </div>
        <div className="flex gap-[16px]">
          <Link to="/modules" className="btn btn-primary h-[48px] px-[32px] uppercase font-black">
            CONTINUE MODULES
          </Link>
        </div>
      </header>

      {/* Stats Summary - 24px Gaps, 32px Internal Card Padding */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-[80px]">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[48px]">
        {/* Main Content: Recommendations - 48px Header Bottom Margin */}
        <div className="lg:col-span-2 space-y-[48px]">
          <div className="flex items-center justify-between">
            <h2 className="mb-0 text-white">Recommended for You</h2>
            <Link to="/modules" className="text-[12px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-[8px] hover:gap-[12px] transition-all">
              VIEW ALL <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {recommendations.map(module => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>

        {/* Sidebar: Bookmarks & Activity */}
        <div className="space-y-[48px]">
          <div className="card p-[32px] bg-bg-surface border-border">
            <h3 className="text-[20px] font-black text-white mb-[32px] flex items-center gap-[12px]">
              <BookmarkIcon size={24} className="text-primary" /> BOOKMARKED
            </h3>
            {bookmarks.length > 0 ? (
              <div className="space-y-[16px]">
                {bookmarks.map(module => (
                  <Link 
                    key={module.id} 
                    to={`/modules/${module.slug}`}
                    className="flex items-center gap-[16px] p-[16px] rounded-[12px] bg-bg-deep border border-transparent hover:border-primary/30 transition-all group"
                  >
                    <div className="w-[48px] h-[48px] bg-primary/10 rounded-[8px] flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <BookOpen size={20} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-[14px] font-bold text-white truncate">{module.title}</div>
                      <div className="text-label mb-0">{module.type}</div>
                    </div>
                    <ArrowRight size={16} className="text-text-dim group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-[48px] px-[24px] border-2 border-dashed border-border rounded-[16px]">
                <p className="text-[14px] text-text-dim font-bold italic">No active bookmarks.</p>
              </div>
            )}
          </div>

          <div className="card p-[32px] border-primary/20 bg-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[64px] h-[64px] bg-primary/10 rounded-bl-[64px]"></div>
            <h3 className="text-[18px] font-black text-white mb-[16px]">PRO TIP</h3>
            <p className="text-body text-text-muted mb-[24px]">
              Complete the <span className="text-white font-bold">Campaign Finance</span> module to unlock rare badges!
            </p>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-colors">
              LEARN MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
