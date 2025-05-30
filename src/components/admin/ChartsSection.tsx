
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnalyticsChart from "@/components/analytics/AnalyticsChart";

interface ChartsSectionProps {
  analytics: {
    migrantsByYear: Array<{ year: number; count: number }>;
    migrantsBySettlement: Array<{ name: string; value: number }>;
  };
}

const ChartsSection = ({ analytics }: ChartsSectionProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Yearly Migration Trends</CardTitle>
          <p className="text-slate-400 text-sm">Number of migrants by year of arrival (1900-1950)</p>
        </CardHeader>
        <CardContent>
          <AnalyticsChart
            title="Italian Migration to Northern Territory (1900-1950)"
            data={analytics.migrantsByYear}
            type="bar"
            dataKey="count"
            nameKey="year"
          />
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Italian Migration: Residence Distribution</CardTitle>
          <p className="text-slate-400 text-sm">Distribution of Italian migrants across different towns or cities</p>
        </CardHeader>
        <CardContent>
          <AnalyticsChart
            title="Migrants by Settlement"
            data={analytics.migrantsBySettlement}
            type="pie"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
