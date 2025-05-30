
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalytics } from "@/hooks/useAnalytics";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardHeader from "@/components/admin/DashboardHeader";
import StatsCards from "@/components/admin/StatsCards";
import ChartsSection from "@/components/admin/ChartsSection";
import OccupationsChart from "@/components/admin/OccupationsChart";

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

  return (
    <div className="flex h-screen bg-slate-900">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto p-6 bg-slate-900">
          {!analyticsLoading && analytics && (
            <>
              <StatsCards analytics={analytics} />
              <ChartsSection analytics={analytics} />

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

                <OccupationsChart />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
