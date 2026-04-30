import { useState, useEffect } from 'react';
import { contentApi } from '../lib/api';
import type { FaqItem, GlossaryTerm } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Book, HelpCircle, MessageSquare } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const FaqPage = () => {
  const [tab, setTab] = useState<'faq' | 'glossary'>('faq');
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      contentApi.faq(),
      contentApi.glossary()
    ]).then(([f, g]) => {
      setFaqs(f);
      setTerms(g);
      setLoading(false);
    });
  }, []);

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) || 
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTerms = terms.filter(t => 
    t.term.toLowerCase().includes(search.toLowerCase()) || 
    t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-5xl font-black mb-6">Knowledge <span className="text-primary italic">Base</span></h1>
        <p className="text-text-muted text-lg mb-10">
          Everything you need to know about elections, distilled into clear answers and precise definitions.
        </p>

        <div className="relative">
          <input 
            type="text" 
            placeholder={`Search ${tab === 'faq' ? 'questions' : 'terms'}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-14 py-5 text-lg glass-card border-primary/20"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={24} />
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        <button 
          onClick={() => { setTab('faq'); setSearch(''); }}
          className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-3 ${tab === 'faq' ? 'bg-primary text-secondary' : 'bg-secondary/50 text-text-muted border border-border'}`}
        >
          <HelpCircle size={18} /> Frequently Asked
        </button>
        <button 
          onClick={() => { setTab('glossary'); setSearch(''); }}
          className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-3 ${tab === 'glossary' ? 'bg-primary text-secondary' : 'bg-secondary/50 text-text-muted border border-border'}`}
        >
          <Book size={18} /> Election Glossary
        </button>
      </div>

      {loading ? (
        <LoadingSpinner size="large" />
      ) : (
        <div className="max-w-4xl mx-auto">
          {tab === 'faq' ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="glass-card overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between group"
                  >
                    <span className="text-lg font-bold group-hover:text-primary transition-colors">{faq.question}</span>
                    <ChevronDown size={20} className={`text-text-muted transition-transform ${openFaq === faq.id ? 'rotate-180 text-primary' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === faq.id && (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-text-muted leading-relaxed border-t border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              {filteredFaqs.length === 0 && <p className="text-center py-20 text-text-muted">No results found for your search.</p>}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredTerms.map((term) => (
                <div key={term.id} className="glass-card p-8 hover:bg-primary/5 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black group-hover:text-primary transition-colors">{term.term}</h3>
                    <span className="text-[10px] bg-secondary px-2 py-0.5 rounded uppercase tracking-widest text-text-muted">{term.category || 'General'}</span>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">
                    {term.definition}
                  </p>
                  {term.example && (
                    <div className="p-3 bg-white/5 rounded italic text-xs text-primary/60">
                      " {term.example} "
                    </div>
                  )}
                </div>
              ))}
              {filteredTerms.length === 0 && <div className="col-span-2 text-center py-20 text-text-muted">No results found for your search.</div>}
            </div>
          )}
        </div>
      )}

      {/* CTA Footer */}
      <div className="mt-24 glass-card p-12 text-center bg-[radial-gradient(circle_at_top_right,_var(--primary)_0%,_transparent_40%)]">
        <MessageSquare size={48} className="mx-auto text-primary mb-6" />
        <h2 className="text-3xl font-black mb-4">Still have questions?</h2>
        <p className="text-text-muted mb-10 max-w-lg mx-auto">Our community of educators and civic experts are ready to help you navigate the nuances of democracy.</p>
        <button className="btn-primary px-10 py-4 text-lg">Contact Advocacy Support</button>
      </div>
    </div>
  );
};

export default FaqPage;
