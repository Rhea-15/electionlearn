import { Clock, Star, Bookmark, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Module } from '../../types';
import ProgressRing from './ProgressRing';
import { useProgressStore } from '../../store/progressStore';
import { Link } from 'react-router-dom';

interface ModuleCardProps {
  module: Module;
}

const ModuleCard = ({ module }: ModuleCardProps) => {
  const { isBookmarked, toggleBookmark, getModuleProgress } = useProgressStore();
  const progress = getModuleProgress(module.id)?.completionPercentage || 0;
  const bookmarked = isBookmarked(module.id);

  const difficultyStars = Array.from({ length: 3 }).map((_, i) => (
    <Star 
      key={i} 
      size={10} 
      className={i < module.difficultyLevel ? 'fill-primary text-primary' : 'text-white/10'} 
    />
  ));

  return (
    <div className="glass-card group overflow-hidden flex flex-col h-full hover:border-primary/50 transition-all duration-500 bg-white/[0.02] border-white/5 shadow-xl">
      <div className="relative h-56 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-8 overflow-hidden">
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)] transition-opacity duration-700"></div>
        
        <div className="relative transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
           <BookOpen size={72} className="text-primary/20 group-hover:text-primary transition-colors" />
        </div>
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(module.id);
          }}
          className={`absolute top-5 right-5 p-2.5 rounded-xl glass border border-white/10 hover:border-primary/50 transition-all z-10 ${bookmarked ? 'text-primary bg-primary/10' : 'text-white/40'}`}
        >
          <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>

        {progress > 0 && (
          <div className="absolute bottom-5 left-5 glass p-1.5 rounded-full border border-white/10">
            <ProgressRing progress={progress} size={42} strokeWidth={4} />
          </div>
        )}
        
        <div className="absolute top-5 left-5 flex gap-0.5">
           {difficultyStars}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            LEVEL: {module.type}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] font-black text-text-dim uppercase tracking-widest">
            <Clock size={12} className="text-primary" />
            {module.durationMinutes} MIN
          </div>
        </div>

        <h3 className="text-2xl font-black mb-3 text-white line-clamp-1 group-hover:text-primary transition-colors">
          {module.title}
        </h3>
        <p className="text-text-muted text-sm line-clamp-3 mb-8 leading-relaxed font-medium">
          {module.description}
        </p>

        <Link 
          to={`/modules/${module.slug}`}
          className="mt-auto group/btn flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white/5 border border-white/10 font-black text-xs uppercase tracking-[0.15em] hover:bg-primary hover:text-slate-900 transition-all"
        >
          {progress === 100 ? (
            <>
              <CheckCircle2 size={16} />
              Review Content
            </>
          ) : progress > 0 ? (
            <>
              Resume Lesson
              <ArrowRight size={16} />
            </>
          ) : (
            <>
              Initialize Module
              <ArrowRight size={16} />
            </>
          )}
        </Link>
      </div>
    </div>
  );
};

export default ModuleCard;
