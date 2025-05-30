
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  growth: string;
  color: string;
  index: number;
}

const StatCard = ({ title, value, growth, color, index }: StatCardProps) => (
  <Card className="bg-slate-800 border-slate-700">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white mb-2">{value}</p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400">Growth Rate</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400 font-medium">{growth}</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center ${color}`}>
          <div className="w-2 h-2 rounded-full bg-current"></div>
        </div>
      </div>
      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full bg-slate-700 rounded-full h-1">
          <div 
            className={`h-1 rounded-full ${
              index === 0 ? 'bg-red-500' : 
              index === 1 ? 'bg-blue-500' : 
              index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
            }`}
            style={{ width: `${Math.random() * 80 + 20}%` }}
          ></div>
        </div>
      </div>
    </CardContent>
  </Card>
);

interface StatsCardsProps {
  analytics: {
    totalMigrants: number;
  };
}

const StatsCards = ({ analytics }: StatsCardsProps) => {
  const stats = [
    { 
      title: "Total Records", 
      value: analytics.totalMigrants.toString(), 
      growth: "+24% YoY",
      color: "text-red-400"
    },
    { 
      title: "Recent Addition", 
      value: "1", 
      growth: "-1.2 years",
      color: "text-blue-400"
    },
    { 
      title: "Peak Migration Year", 
      value: "1975", 
      growth: "120 migrants that year",
      color: "text-yellow-400"
    },
    { 
      title: "Most Common Origin", 
      value: "Montecarlo Lucca", 
      growth: "35%",
      color: "text-purple-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} index={index} />
      ))}
    </div>
  );
};

export default StatsCards;
