
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OccupationsChart = () => {
  const occupations = [
    { occupation: "Unknown", count: 600, percentage: 100 },
    { occupation: "Home Duties", count: 150, percentage: 25 },
    { occupation: "Clerk", count: 50, percentage: 8 },
    { occupation: "Driver", count: 30, percentage: 5 },
    { occupation: "Manager", count: 25, percentage: 4 },
    { occupation: "Teacher", count: 20, percentage: 3 },
    { occupation: "Labourer", count: 15, percentage: 2 },
    { occupation: "Contractor", count: 10, percentage: 1 },
    { occupation: "Student", count: 8, percentage: 1 },
    { occupation: "Miner", count: 5, percentage: 1 },
  ];

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Top 10 Occupations of Migrants</CardTitle>
        <p className="text-slate-400 text-sm">The most common occupations among Italian migrants</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {occupations.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-slate-300 text-sm">{item.occupation}</span>
              <div className="flex items-center gap-3 flex-1 max-w-xs">
                <div className="flex-1 bg-slate-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-red-500" 
                    style={{ width: `${(item.percentage / 100) * 100}%` }}
                  ></div>
                </div>
                <span className="text-slate-400 text-xs w-8">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupationsChart;
