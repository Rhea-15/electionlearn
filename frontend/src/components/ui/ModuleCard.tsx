import { Clock, Star, Bookmark, BookOpen, ArrowRight } from 'lucide-react';
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
      className={i < module.difficultyLevel ? 'fill-primary text-primary' : 'text-text-dim'} 
    />
  ));

  return (
    <div className="card group overflow-hidden flex flex-col items-start p-0 h-full border-border">
      {/* Visual Header - 224px Solid Accent */}
      <div className="relative w-full h-[224px] bg-bg-deep border-b border-border flex items-center justify-center p-[32px]">
        <div className="icon-container w-[80px] h-[80px] shadow-2xl">
           <BookOpen size={40} strokeWidth={2.5} />
        </div>
        
        {/* Floating Glass Bookmark */}
        <button 
          onClick={(e) => {
            e.preventDefault(); e.stopPropagation();
            toggleBookmark(module.id);
          }}
          className={`absolute top-[16px] right-[16px] w-[44px] h-[44px] rounded-[12px] glass flex items-center justify-center border border-white/10 hover:border-primary transition-colors ${bookmarked ? 'text-primary' : 'text-text-muted'}`}
        >
          <Bookmark size={20} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>

        {progress > 0 && (
          <div className="absolute bottom-[16px] left-[16px] glass p-[8px] rounded-full border border-white/10">
            <ProgressRing progress={progress} size={40} strokeWidth={4} />
          </div>
        )}
        
        <div className="absolute top-[16px] left-[16px] flex gap-[4px]">
           {difficultyStars}
        </div>
      </div>

      <div className="p-[32px] flex flex-col flex-grow w-full text-left">
        <div className="flex items-center justify-between mb-[16px]">
          <span className="badge">{module.type}</span>
          <div className="flex items-center gap-[6px] text-label text-text-dim mb-0">
            <Clock size={12} className="text-primary" />
            {module.durationMinutes} MIN
          </div>
        </div>

        <h3 className="mb-[16px] text-white line-clamp-1">{module.title}</h3>
        <p className="text-body text-text-muted line-clamp-3 mb-[32px] flex-grow">
          {module.description}
        </p>

        <Link 
          to={`/modules/${module.slug}`}
          className="btn btn-primary w-full h-[48px] uppercase tracking-widest text-[12px]"
        >
          {progress === 100 ? 'REVIEW LESSON' : progress > 0 ? 'RESUME MODULE' : 'START MODULE'}
          <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default ModuleCard;
