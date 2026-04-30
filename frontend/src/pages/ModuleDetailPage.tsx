import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { modulesApi } from '../lib/api';
import type { Module } from '../types';
import { useProgressStore } from '../store/progressStore';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Clock, ChevronRight, Play, CheckCircle, Bookmark } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ModuleDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const { updateProgress, isBookmarked, toggleBookmark, getModuleProgress } = useProgressStore();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    modulesApi.get(slug).then(data => {
      setModule(data);
      setLoading(false);
      // Mark as started if not already
      updateProgress(data.id, 5, 0);
    });
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      if (!module) return;
      const h = document.documentElement, 
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
      const percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
      
      if (percent > 90) {
        updateProgress(module.id, 100, 600); // Mock 10m time spent
      } else if (percent > 5) {
        const currentProgress = getModuleProgress(module.id)?.completionPercentage || 0;
        if (Math.round(percent) > currentProgress) {
          updateProgress(module.id, Math.round(percent), 0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [module, updateProgress, getModuleProgress]);

  if (loading) return <div className="h-screen flex items-center justify-center"><LoadingSpinner size="large" /></div>;
  if (!module) return <div className="container py-20 text-center">Module not found</div>;

  const progress = getModuleProgress(module.id)?.completionPercentage || 0;
  const bookmarked = isBookmarked(module.id);

  return (
    <div className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <div className="container py-12">
        <Link to="/modules" className="inline-flex items-center gap-2 text-text-muted hover:text-white mb-12 transition-colors font-bold text-sm">
          <ArrowLeft size={16} /> Back to Library
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded">
                  {module.type}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Clock size={14} /> {module.durationMinutes} min read
                </div>
              </div>
              
              <h1 className="text-5xl font-black mb-8 leading-tight">{module.title}</h1>
              
              <div className="flex items-center gap-6 pb-12 border-b border-border mb-12">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-deep bg-secondary flex items-center justify-center overflow-hidden">
                      <div className="text-[10px] font-black opacity-40 italic">USER</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-text-muted">Join 12,042 citizens learning this today</p>
              </div>

              {/* Dynamic Content Rendering Area (Mock/Simple for now) */}
              <div className="prose prose-invert max-w-none space-y-8">
                {typeof module.content === 'object' && Object.entries(module.content).map(([key, val], idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-white">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                    <p className="text-lg text-text-muted leading-relaxed">
                      {String(val)}
                    </p>
                  </div>
                ))}
                
                {/* Fallback if content is empty or not in expected format */}
                {(!module.content || Object.keys(module.content).length === 0) && (
                  <div className="space-y-6">
                    <p className="text-xl text-text-muted leading-relaxed">
                      {module.description}
                    </p>
                    <div className="p-8 glass-card border-l-4 border-l-primary">
                      <h4 className="text-xl font-bold mb-4">Core Principles</h4>
                      <ul className="space-y-4 text-text-muted">
                        <li className="flex gap-3"><CheckCircle size={18} className="text-primary shrink-0" /> Verified election procedures</li>
                        <li className="flex gap-3"><CheckCircle size={18} className="text-primary shrink-0" /> Non-partisan legal framework</li>
                        <li className="flex gap-3"><CheckCircle size={18} className="text-primary shrink-0" /> Constitutional basis for voting rights</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar / Quick Actions */}
          <div className="space-y-8">
            <div className="glass-card p-8 sticky top-32">
              <h4 className="text-xs font-black text-text-muted uppercase tracking-widest mb-6">Module Progress</h4>
              
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-2xl font-black">{progress}%</span>
                  <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">COMPLETED</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {module.quizzes && module.quizzes.length > 0 ? (
                  <button 
                    onClick={() => navigate(`/quiz/${module.quizzes![0].id}`)}
                    className="w-full btn-primary py-4 flex items-center justify-center gap-3 text-lg"
                  >
                    Take Quiz <Play size={20} fill="currentColor" />
                  </button>
                ) : (
                  <button className="w-full bg-white/5 border border-white/10 text-text-muted py-4 rounded-xl font-bold cursor-not-allowed">
                    No Quiz Available
                  </button>
                )}
                
                <button 
                  onClick={() => toggleBookmark(module.id)}
                  className={`w-full py-4 flex items-center justify-center gap-3 text-sm font-bold rounded-xl border transition-all ${bookmarked ? 'bg-primary/10 border-primary text-primary' : 'bg-transparent border-white/10 text-white hover:border-white/30'}`}
                >
                  <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} /> 
                  {bookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h5 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-4">Related Topics</h5>
                <div className="space-y-2">
                  {module.tags.map(tag => (
                    <a key={tag} href="#" className="flex items-center justify-between p-2 rounded hover:bg-white/5 text-xs font-bold transition-colors group">
                      <span className="capitalize">{tag}</span>
                      <ChevronRight size={14} className="text-text-muted group-hover:text-primary" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailPage;
