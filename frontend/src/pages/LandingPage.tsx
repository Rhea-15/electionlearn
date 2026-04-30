import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Globe, Shield, Zap, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col bg-bg-deep overflow-hidden">
      {/* Hero Section - Balanced Spacing */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--primary-glow)_0%,_transparent_50%)]">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-8">
              <Sparkles size={12} /> Empowering the Electorate
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-text-main max-w-4xl mx-auto">
              Master the Election Process <br/> with <span className="text-primary italic">Expert Precision</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Demystify every step of democracy with our interactive modules and D3-powered timelines.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="btn-primary px-10 py-4 group">
                Start Learning Now
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/timeline" className="btn-secondary px-10 py-4">
                Explore Timeline
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats Grid - Consistent Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-20">
            {[
              { label: 'Learning Modules', value: '12+', icon: <BookOpen className="text-primary" /> },
              { label: 'Interactive Events', value: '500+', icon: <Zap className="text-primary" /> },
              { label: 'Practice Quizzes', value: '25', icon: <CheckCircle className="text-primary" /> },
              { label: 'Active Learners', value: '10k+', icon: <Globe className="text-primary" /> },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 flex flex-col items-center text-center bg-bg-surface border-border transition-transform hover:-translate-y-2"
              >
                <div className="mb-5 p-3 bg-primary/10 rounded-xl">{stat.icon}</div>
                <div className="text-3xl font-black text-text-main mb-1 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] text-text-dim font-black uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bar - Compact and Clean */}
      <div className="py-12 border-y border-border bg-bg-surface/50">
        <div className="container flex flex-wrap justify-between items-center gap-10 opacity-30 grayscale contrast-125">
          <span className="font-heading font-black text-xl tracking-tighter">CECIL</span>
          <span className="font-heading font-black text-xl tracking-tighter">DEMOCRACY.OS</span>
          <span className="font-heading font-black text-xl tracking-tighter">VOTER.IO</span>
          <span className="font-heading font-black text-xl tracking-tighter">GOV.LEARN</span>
          <span className="font-heading font-black text-xl tracking-tighter">LIBERTY TECH</span>
        </div>
      </div>

      {/* Modules Showcase - Even Vertical Spacing */}
      <section className="py-24 relative overflow-hidden">
        <div className="container">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-text-main leading-tight tracking-tight">A Structured Path to Political Literacy</h2>
            <p className="text-text-muted text-lg font-medium leading-relaxed">
              Our curriculum is designed by election experts to take you from a curious observer to an informed participant.
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { 
                title: 'Voter Registration', 
                desc: 'Learn about identification requirements, deadlines, and online versus mail-in options.',
                icon: <Shield size={32} />
              },
              { 
                title: 'The Electoral College', 
                desc: 'A deep dive into how votes are translated from popular will to executive selection.',
                icon: <Zap size={32} />
              },
              { 
                title: 'Campaign Finance', 
                desc: 'Follow the money. Understand PACs, Super PACs, and individual donation limits.',
                icon: <Globe size={32} />
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="glass-card p-10 group transition-all flex flex-col h-full bg-bg-surface border-border">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black mb-3 text-text-main">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-8 flex-grow font-medium">
                  {feature.desc}
                </p>
                <Link to="/register" className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                  Get Started <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action - Balanced Spacing */}
      <section className="py-24 bg-[radial-gradient(circle_at_bottom_left,_var(--primary-glow)_0%,_transparent_50%)]">
        <div className="container">
          <div className="glass-card p-12 md:p-20 text-center border-primary/20 border shadow-2xl relative overflow-hidden bg-bg-surface">
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-text-main tracking-tighter">Ready to make an impact?</h2>
            <p className="text-text-muted text-lg md:text-xl max-w-xl mx-auto mb-10 font-medium">
              Join thousands of citizens who have already completed our interactive courses.
            </p>
            <Link to="/register" className="btn-primary px-12 py-5 text-lg uppercase font-black">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
