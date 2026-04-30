import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { timelineApi } from '../lib/api';
import type { TimelineEvent } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ZoomIn, ZoomOut, Info, Sparkles, Layout } from 'lucide-react';
import { format } from 'date-fns';

const TimelinePage = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    timelineApi.list().then(data => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading || events.length === 0 || !svgRef.current || !containerRef.current) return;

    const margin = { top: 100, right: 80, bottom: 80, left: 80 };
    const width = containerRef.current.clientWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    svg.selectAll('*').remove();

    // Defs for gradients
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '0%');
    
    gradient.append('stop').attr('offset', '0%').attr('stop-color', 'rgba(16, 185, 129, 0)');
    gradient.append('stop').attr('offset', '50%').attr('stop-color', '#10b981');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(16, 185, 129, 0)');

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const filteredEvents = filter === 'all' 
      ? events 
      : events.filter(e => e.eventType === filter);

    const parseDate = (d: string) => new Date(d);
    
    const x = d3.scaleTime()
      .domain(d3.extent(events, d => parseDate(d.eventDate)) as [Date, Date])
      .range([0, width]);

    // Axis with better styling
    const xAxis = d3.axisBottom(x)
      .ticks(width > 600 ? 10 : 5)
      .tickSize(-height)
      .tickPadding(25);

    const xGroup = g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    xGroup.selectAll('.tick line').attr('stroke', 'rgba(255,255,255,0.03)');
    xGroup.selectAll('.tick text')
      .attr('fill', '#94a3b8')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('font-family', 'var(--font-sans)');
    
    xGroup.select('.domain').attr('stroke', 'rgba(255,255,255,0.05)');

    // Main Timeline Line - Gradient
    g.append('line')
      .attr('x1', 0)
      .attr('y1', height)
      .attr('x2', width)
      .attr('y2', height)
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 4);

    // Grid Glow
    g.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'url(#line-gradient)')
      .attr('opacity', 0.02);

    // Points
    const points = g.selectAll('.event-point')
      .data(filteredEvents)
      .enter()
      .append('g')
      .attr('class', 'event-point')
      .attr('transform', d => `translate(${x(parseDate(d.eventDate))},${height})`)
      .style('cursor', 'pointer')
      .on('mouseenter', function(_event, _d) {
        d3.select(this).select('circle')
          .transition().duration(300)
          .attr('r', 12)
          .attr('fill', '#fff')
          .attr('stroke-width', 4)
          .attr('stroke', '#10b981');
        
        d3.select(this).select('line')
          .transition().duration(300)
          .attr('stroke-opacity', 0.4)
          .attr('y2', -height + 20);
      })
      .on('mouseleave', function() {
        d3.select(this).select('circle')
          .transition().duration(300)
          .attr('r', 8)
          .attr('fill', '#10b981')
          .attr('stroke-width', 0);
          
        d3.select(this).select('line')
          .transition().duration(300)
          .attr('stroke-opacity', 0.1)
          .attr('y2', -40);
      })
      .on('click', (_event, d) => setSelectedEvent(d));

    points.append('line')
      .attr('x1', 0).attr('y1', 0)
      .attr('x2', 0).attr('y2', -40)
      .attr('stroke', '#10b981')
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', 0.1)
      .attr('stroke-dasharray', '4,4');

    points.append('circle')
      .attr('r', 8)
      .attr('fill', '#10b981')
      .style('filter', 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))');

    // Zoom functionality
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 20])
      .extent([[0, 0], [width, height]])
      .on('zoom', (event) => {
        const newX = event.transform.rescaleX(x);
        xGroup.call(xAxis.scale(newX));
        points.attr('transform', d => `translate(${newX(parseDate(d.eventDate))},${height})`);
      });

    svg.call(zoom);

  }, [events, loading, filter]);

  const eventTypes = [
    { id: 'all', label: 'All Milestones' },
    { id: 'registration', label: 'Registration' },
    { id: 'campaign', label: 'Campaign' },
    { id: 'voting', label: 'Voting' },
    { id: 'counting', label: 'Tabulation' },
  ];

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-10">
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 text-primary font-black text-xs uppercase tracking-[0.3em] mb-4">
            <Sparkles size={16} /> 
            Perspective Tool
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tight leading-none">
            Historical <span className="text-primary italic">Timeline</span>
          </h1>
          <p className="text-text-muted text-lg max-w-xl leading-relaxed">
            Scroll to zoom and drag to traverse the chronological landscape of the democratic process.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 glass">
          {eventTypes.map(type => (
            <button 
              key={type.id}
              onClick={() => setFilter(type.id)}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === type.id ? 'bg-primary text-slate-900 shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card p-10 mb-16 relative overflow-hidden group shadow-2xl border-white/5" ref={containerRef}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary-glow)_0%,_transparent_80%)] opacity-20"></div>
        <div className="absolute top-6 right-8 flex gap-4 z-10">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-[10px] font-black text-text-dim uppercase tracking-widest backdrop-blur-md">
            <ZoomIn size={14} className="text-primary" /> <ZoomOut size={14} className="text-primary" /> 
            Mouse Wheel to Zoom
          </div>
        </div>
        <svg ref={svgRef} className="w-full relative z-0"></svg>
      </div>

      <AnimatePresence>
        {selectedEvent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 30 }}
            className="glass-card p-10 md:p-16 border-l-8 border-l-primary relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -mr-48 -mt-48"></div>
            
            <div className="flex flex-col md:flex-row items-start justify-between mb-10 gap-8 relative z-10">
              <div>
                <div className="flex items-center gap-4 text-primary font-black text-sm uppercase tracking-[0.2em] mb-4">
                  <Calendar size={18} /> {format(new Date(selectedEvent.eventDate), 'MMMM dd, yyyy')}
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">{selectedEvent.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="group p-4 rounded-2xl bg-white/5 border border-white/10 text-text-muted hover:text-white hover:border-primary transition-all"
              >
                <Layout size={24} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>
            
            <p className="text-xl text-text-muted leading-relaxed mb-12 max-w-4xl relative z-10 font-medium">
              {selectedEvent.description}
            </p>

            <div className="flex flex-wrap gap-4 relative z-10">
              <span className="px-6 py-2.5 rounded-xl bg-primary text-slate-900 text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                CATEGORY: {selectedEvent.eventType}
              </span>
              <span className="px-6 py-2.5 rounded-xl bg-white/5 text-white text-xs font-black uppercase tracking-widest border border-white/10">
                SIGNIFICANCE: {selectedEvent.importanceLevel}/5
              </span>
            </div>
          </motion.div>
        ) : (
          !loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="text-center py-24 border-2 border-dashed border-white/5 rounded-3xl"
            >
              <Info size={64} className="mx-auto mb-6 text-primary/40" />
              <p className="text-2xl font-black text-text-dim uppercase tracking-[0.2em]">Select an event to investigate</p>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimelinePage;
