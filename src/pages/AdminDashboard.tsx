
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Menu, TrendingUp } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AnalyticsChart from "@/components/analytics/AnalyticsChart";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const stats = analytics ? [
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
  ] : [];

  return (
    <div className="flex h-screen bg-slate-900">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-slate-800 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-white hover:bg-slate-700"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400 text-sm">Welcome, Admin</p>
              </div>
            </div>
            <div className="text-slate-400 text-sm">
              Here's an overview of your Italian Migrants Database
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 bg-slate-900">
          {!analyticsLoading && analytics && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-slate-800 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-400 mb-1">{stat.title}</p>
                          <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-slate-400">Growth Rate</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <TrendingUp className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-green-400 font-medium">{stat.growth}</span>
                          </div>
                        </div>
                        <div className={`w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center ${stat.color}`}>
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
                ))}
              </div>

              {/* Charts */}
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

              {/* Additional Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Family Status</CardTitle>
                    <p className="text-slate-400 text-sm">Family composition of Italian migrants</p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-slate-400">
                      Chart placeholder - Family Status data
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Top 10 Occupations of Migrants</CardTitle>
                    <p className="text-slate-400 text-sm">The most common occupations among Italian migrants</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
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
                      ].map((item, index) => (
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
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
