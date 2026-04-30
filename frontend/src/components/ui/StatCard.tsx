import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

const StatCard = ({ label, value, icon: Icon, trend, trendUp }: StatCardProps) => {
  return (
    <div className="glass-card p-8 group hover:-translate-y-1 transition-all border-white/5 shadow-xl bg-white/[0.01]">
      <div className="flex items-start justify-between mb-8">
        <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg shadow-primary/10">
          <Icon size={24} strokeWidth={2.5} />
        </div>
        {trend && (
          <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${trendUp ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-amber-400 bg-amber-400/10 border-amber-400/20'}`}>
            {trend}
          </div>
        )}
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-dim mb-2">{label}</h4>
        <div className="text-4xl font-black text-white tracking-tighter">{value}</div>
      </div>
      
      {/* Decorative Line */}
      <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-primary/40 w-1/3 rounded-full group-hover:w-full transition-all duration-1000"></div>
      </div>
    </div>
  );
};

export default StatCard;
