import { useState, useEffect } from 'react';
import { modulesApi } from '../lib/api';
import type { Module, ModuleType } from '../types';
import ModuleCard from '../components/ui/ModuleCard';
import { Search, SlidersHorizontal, BookOpen, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ModulesPage = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<ModuleType | 'all'>('all');

  useEffect(() => {
    modulesApi.list().then(data => {
      setModules(data);
      setLoading(false);
    });
  }, []);

  const filteredModules = modules.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || 
                         m.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || m.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="container py-12 md:py-24 animate-fade-in">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-10">
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 text-primary font-black text-xs uppercase tracking-[0.3em] mb-4">
            <Sparkles size={16} /> 
            Curriculum
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">
            Module <span className="text-primary italic">Library</span>
          </h1>
          <p className="text-text-muted text-lg max-w-xl leading-relaxed">
            Every step of the democratic process, simplified and visualized for deep understanding.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-grow lg:min-w-[400px]">
             <input 
              type="text" 
              placeholder="Search concepts, modules, or laws..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 w-full"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={20} />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-dim hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="relative">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="appearance-none bg-slate-900 border border-white/10 rounded-xl px-12 py-3.5 text-sm font-bold text-white w-full cursor-pointer hover:border-primary/50 transition-all"
            >
              <option value="all">All Categories</option>
              <option value="voter_education">Voter Education</option>
              <option value="mechanics">Mechanics</option>
              <option value="history">History</option>
              <option value="policy">Policy</option>
            </select>
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" size={18} />
          </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredModules.map((module) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={module.id}
            >
              <ModuleCard module={module} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {!loading && filteredModules.length === 0 && (
        <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-3xl">
          <BookOpen size={48} className="mx-auto mb-6 text-text-dim" />
          <h3 className="text-2xl font-black text-white mb-2">No modules found</h3>
          <p className="text-text-muted">Try adjusting your search or filters to find what you're looking for.</p>
          <button 
            onClick={() => { setSearch(''); setTypeFilter('all'); }}
            className="mt-8 text-primary font-bold uppercase tracking-widest text-xs hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ModulesPage;
