import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, Zap, BookOpen, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="flex flex-col bg-bg-deep overflow-hidden">
      {/* Hero Section - 96px Top Padding, 56px H1 */}
      <section className="relative pt-[96px] pb-[80px] text-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="label text-primary font-black mb-[8px]">
              Empowering the Electorate
            </div>
            <h1 className="mb-[24px] max-w-[800px] mx-auto text-white">
              Master the Election Process <br/> with Expert Precision
            </h1>
            <p className="text-body text-text-secondary max-w-[640px] mx-auto mb-[32px]">
              Demystify every step of democracy with our interactive modules and D3-powered timelines.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-[16px] mt-[32px]">
              <Link to="/register" className="btn btn-primary h-[48px] px-[40px]">
                START LEARNING NOW
              </Link>
              <Link to="/timeline" className="btn btn-secondary h-[48px] px-[40px] text-white">
                EXPLORE TIMELINE
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid - 80px Top Margin, 16px Base Gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] mt-[80px]">
            {[
              { label: 'Learning Modules', value: '12+', icon: <BookOpen size={24} /> },
              { label: 'Interactive Events', value: '500+', icon: <Zap size={24} /> },
              { label: 'Practice Quizzes', value: '25', icon: <CheckCircle size={24} /> },
              { label: 'Active Learners', value: '10k+', icon: <Globe size={24} /> },
            ].map((stat, i) => (
              <div key={i} className="card flex flex-col items-center text-center p-[32px]">
                <div className="icon-container mb-[24px]">
                   {stat.icon}
                </div>
                <div className="text-[40px] font-black text-white mb-[8px] tracking-tighter leading-none">
                  {stat.value}
                </div>
                <div className="label mb-0">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - 48px Gap */}
      <div className="py-[48px] border-y border-border bg-bg-surface">
        <div className="container flex flex-wrap justify-between items-center gap-[40px] opacity-40 grayscale">
          <span className="font-heading font-black text-[20px]">CECIL</span>
          <span className="font-heading font-black text-[20px]">DEMOCRACY.OS</span>
          <span className="font-heading font-black text-[20px]">VOTER.IO</span>
          <span className="font-heading font-black text-[20px]">GOV.LEARN</span>
          <span className="font-heading font-black text-[20px]">LIBERTY TECH</span>
        </div>
      </div>

      {/* Modules Showcase - 96px Vertical Spacing */}
      <section className="py-[96px]">
        <div className="container">
          <div className="text-center mb-[48px]">
            <h2 className="text-white">A Structured Path to Political Literacy</h2>
            <p className="text-body text-text-muted max-w-[600px] mx-auto">
              Our curriculum is designed by election experts to take you from a curious observer to an informed participant.
            </p>
          </div>
          
          {/* Grid - 24px Gap, Left Aligned Body Text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
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
              <div key={i} className="card text-left flex flex-col items-start p-[32px]">
                <div className="icon-container mb-[24px]">
                   {feature.icon}
                </div>
                <h3 className="text-white mb-[16px]">{feature.title}</h3>
                <p className="text-body text-text-muted mb-[32px]">
                  {feature.desc}
                </p>
                <Link to="/register" className="mt-auto flex items-center gap-[8px] text-[12px] font-black uppercase text-primary hover:gap-[12px] transition-all">
                  GET STARTED <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - 80px Spacing */}
      <section className="pb-[96px]">
        <div className="container">
          <div className="card p-[48px] md:p-[80px] text-center border-primary/20 shadow-2xl relative overflow-hidden bg-bg-surface">
            <h2 className="text-white mb-[32px]">Ready to make an impact?</h2>
            <p className="text-body text-text-muted max-w-[600px] mx-auto mb-[48px]">
              Join thousands of citizens who have already completed our interactive courses.
            </p>
            <Link to="/register" className="btn btn-primary h-[48px] px-[48px] font-black">
              CREATE FREE ACCOUNT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
