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
    <div className="container py-[80px] animate-fade-in">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-[64px] gap-[32px]">
        <div className="text-center lg:text-left">
          <div className="label text-primary flex items-center justify-center lg:justify-start gap-[8px] mb-[16px]">
            <Sparkles size={16} /> 
            CURRICULUM
          </div>
          <h1 className="text-white mb-[16px]">
            Module Library
          </h1>
          <p className="text-body text-text-muted max-w-xl">
            Every step of the democratic process, simplified and visualized for deep understanding.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-[16px] w-full lg:w-auto">
          <div className="relative flex-grow lg:min-w-[400px]">
             <input 
              type="text" 
              placeholder="Search concepts, modules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-[48px] w-full"
            />
            <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 text-text-dim" size={20} />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-[16px] top-1/2 -translate-y-1/2 text-text-dim hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="relative">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="pl-[48px]"
            >
              <option value="all">All Categories</option>
              <option value="voter_education">Voter Education</option>
              <option value="mechanics">Mechanics</option>
              <option value="history">History</option>
              <option value="policy">Policy</option>
            </select>
            <SlidersHorizontal className="absolute left-[16px] top-1/2 -translate-y-1/2 text-text-dim pointer-events-none" size={18} />
          </div>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]"
        >
          {filteredModules.map((module) => (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              key={module.id}
              className="h-full"
            >
              <ModuleCard module={module} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {!loading && filteredModules.length === 0 && (
        <div className="text-center py-[96px] border-2 border-dashed border-border rounded-[16px]">
          <BookOpen size={48} className="mx-auto mb-[24px] text-text-dim" />
          <h3 className="text-white mb-[8px]">No modules found</h3>
          <p className="text-text-muted">Try adjusting your search or filters.</p>
          <button 
            onClick={() => { setSearch(''); setTypeFilter('all'); }}
            className="mt-[32px] label text-primary hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ModulesPage;
