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
    <div className="card text-left p-[32px] group relative overflow-hidden">
      <div className="flex items-start justify-between mb-[32px]">
        <div className="icon-container">
          <Icon size={24} strokeWidth={2.5} />
        </div>
        {trend && (
          <div className={`badge ${trendUp ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
            {trend}
          </div>
        )}
      </div>
      <div>
        <span className="label mb-[8px]">{label}</span>
        <div className="text-[40px] font-black text-white leading-none tracking-tighter">{value}</div>
      </div>
      
      {/* Subtle Progress Accent */}
      <div className="mt-[24px] h-[4px] w-full bg-border rounded-full overflow-hidden">
        <div className="h-full bg-primary/30 w-1/3 rounded-full"></div>
      </div>
    </div>
  );
};

export default StatCard;
