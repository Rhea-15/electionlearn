import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { timelineApi } from '../lib/api';
import type { TimelineEvent } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ZoomIn, ZoomOut, Info, Sparkles, X } from 'lucide-react';
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

    const margin = { top: 96, right: 48, bottom: 64, left: 48 };
    const width = containerRef.current.clientWidth - margin.left - margin.right;
    const height = 480 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    svg.selectAll('*').remove();

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

    const xAxis = d3.axisBottom(x)
      .ticks(width > 600 ? 10 : 5)
      .tickSize(-height)
      .tickPadding(32);

    const xGroup = g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    xGroup.selectAll('.tick line').attr('stroke', '#1e293b');
    xGroup.selectAll('.tick text')
      .attr('fill', '#64748b')
      .attr('font-size', '10px')
      .attr('font-weight', '900')
      .attr('text-transform', 'uppercase')
      .attr('letter-spacing', '0.2em');
    
    xGroup.select('.domain').attr('stroke', '#1e293b');

    g.append('line')
      .attr('x1', 0).attr('y1', height).attr('x2', width).attr('y2', height)
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 4);

    const points = g.selectAll('.event-point')
      .data(filteredEvents)
      .enter()
      .append('g')
      .attr('class', 'event-point')
      .attr('transform', d => `translate(${x(parseDate(d.eventDate))},${height})`)
      .style('cursor', 'pointer')
      .on('mouseenter', function() {
        d3.select(this).select('circle').transition().duration(200).attr('r', 12).attr('fill', '#fff');
      })
      .on('mouseleave', function() {
        d3.select(this).select('circle').transition().duration(200).attr('r', 8).attr('fill', '#10b981');
      })
      .on('click', (_event, d) => setSelectedEvent(d));

    points.append('circle')
      .attr('r', 8).attr('fill', '#10b981')
      .style('filter', 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 20])
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
    <div className="container py-[80px]">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-[64px] gap-[32px]">
        <div className="text-center lg:text-left">
          <div className="label text-primary flex items-center justify-center lg:justify-start gap-[8px] mb-[16px]">
            <Sparkles size={16} /> 
            PERSPECTIVE TOOL
          </div>
          <h1 className="text-white mb-[16px]">
            Historical Timeline
          </h1>
          <p className="text-body text-text-muted max-w-xl">
            Scroll to zoom and drag to traverse the chronological landscape of the democratic process.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-[12px] bg-bg-card p-[16px] rounded-[16px] border border-border">
          {eventTypes.map(type => (
            <button 
              key={type.id}
              onClick={() => setFilter(type.id)}
              className={`px-[24px] py-[12px] rounded-[12px] text-[10px] font-black uppercase tracking-widest transition-colors ${filter === type.id ? 'bg-primary text-white' : 'text-text-muted hover:text-white'}`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card p-[48px] mb-[48px] relative overflow-hidden" ref={containerRef}>
        <div className="absolute top-[24px] right-[24px] flex gap-[12px] z-10">
          <div className="glass px-[20px] py-[10px] rounded-[12px] text-[10px] font-black text-text-muted uppercase tracking-widest flex items-center gap-[8px]">
            <ZoomIn size={14} className="text-primary" /> <ZoomOut size={14} className="text-primary" /> 
            MOUSE WHEEL TO ZOOM
          </div>
        </div>
        <svg ref={svgRef} className="w-full relative z-0"></svg>
      </div>

      <AnimatePresence>
        {selectedEvent ? (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            className="card p-[48px] border-l-[8px] border-l-primary"
          >
            <div className="flex flex-col md:flex-row items-start justify-between mb-[32px] gap-[32px]">
              <div className="text-left">
                <div className="label text-primary flex items-center gap-[8px] mb-[16px]">
                  <Calendar size={18} /> {format(new Date(selectedEvent.eventDate), 'MMMM dd, yyyy')}
                </div>
                <h2 className="text-white mb-0">{selectedEvent.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="btn btn-secondary w-[48px] h-[48px] p-0 flex items-center justify-center text-text-muted hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <p className="text-body text-text-secondary leading-relaxed mb-[48px] max-w-4xl text-left font-medium">
              {selectedEvent.description}
            </p>

            <div className="flex flex-wrap gap-[16px]">
              <span className="badge">
                CATEGORY: {selectedEvent.eventType}
              </span>
              <span className="badge bg-bg-deep border border-border text-text-muted">
                SIGNIFICANCE: {selectedEvent.importanceLevel}/5
              </span>
            </div>
          </motion.div>
        ) : (
          !loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="text-center py-[96px] border-2 border-dashed border-border rounded-[16px]"
            >
              <Info size={48} className="mx-auto mb-[24px] text-text-dim" />
              <p className="label mb-0 text-text-dim">SELECT AN EVENT TO INVESTIGATE</p>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimelinePage;
