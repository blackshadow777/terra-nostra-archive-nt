
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut, 
  Camera,
  Search,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { useAnalytics } from "@/hooks/useAnalytics";
import AdminForm from "@/components/admin/AdminForm";
import AnalyticsChart from "@/components/analytics/AnalyticsChart";

const AdminDashboard = () => {
  const [adminProfile, setAdminProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    profilePicture: ""
  });
  const [activeView, setActiveView] = useState<"dashboard" | "management">("dashboard");
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { admins, loadAdmins, createAdmin } = useAdmin();
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
    loadAdmins();
  }, [navigate, loadAdmins]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin/login");
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAdminProfile(prev => ({
          ...prev,
          profilePicture: e.target?.result as string
        }));
        toast({
          title: "Profile Picture Updated",
          description: "Your profile picture has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateAdmin = async (adminData: any) => {
    try {
      await createAdmin(adminData);
      setIsAddingAdmin(false);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const stats = analytics ? [
    { title: "Total Migrants", value: analytics.totalMigrants.toString(), icon: Users, color: "text-terra-red", trend: "+12%" },
    { title: "Records Added", value: analytics.recordsAdded.toString(), icon: FileText, color: "text-terra-green", trend: "+5%" },
    { title: "This Month", value: analytics.recordsThisMonth.toString(), icon: Calendar, color: "text-terra-yellow", trend: "+18%" },
    { title: "Active Admins", value: analytics.totalAdmins.toString(), icon: Settings, color: "text-terra-navy", trend: "+2%" }
  ] : [];

  return (
    <div className="min-h-screen bg-terra-beige/10">
      <header className="bg-white shadow-sm border-b border-terra-beige/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-2xl font-bold text-terra-red">
                Terra Nostra Admin
              </h1>
              <p className="text-terra-navy/70">Archive Management System</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={adminProfile.profilePicture} />
                    <AvatarFallback className="bg-terra-red text-white">
                      {adminProfile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <label className="absolute -bottom-1 -right-1 bg-terra-green text-white rounded-full p-1 cursor-pointer hover:bg-terra-green/90 transition-colors">
                    <Camera className="w-3 h-3" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <p className="font-medium text-terra-navy">{adminProfile.name}</p>
                  <p className="text-sm text-terra-navy/70">{adminProfile.email}</p>
                </div>
              </div>
              
              <Button 
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-terra-red text-terra-red hover:bg-terra-red hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeView === "dashboard" ? "default" : "outline"}
            onClick={() => setActiveView("dashboard")}
            className={activeView === "dashboard" ? "bg-terra-red text-white" : "border-terra-navy text-terra-navy"}
          >
            Dashboard
          </Button>
          <Button
            variant={activeView === "management" ? "default" : "outline"}
            onClick={() => setActiveView("management")}
            className={activeView === "management" ? "bg-terra-red text-white" : "border-terra-navy text-terra-navy"}
          >
            Management
          </Button>
        </div>

        {activeView === "dashboard" && !analyticsLoading && analytics && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-terra-navy/70">{stat.title}</p>
                        <p className="text-2xl font-bold text-terra-navy">{stat.value}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <TrendingUp className="w-3 h-3 text-terra-green" />
                          <span className="text-xs text-terra-green font-medium">{stat.trend}</span>
                        </div>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <AnalyticsChart
                title="Migrants by Region"
                data={analytics.migrantsByRegion}
                type="pie"
              />
              <AnalyticsChart
                title="Migrants by Settlement"
                data={analytics.migrantsBySettlement}
                type="bar"
              />
            </div>

            <AnalyticsChart
              title="Arrivals by Decade"
              data={analytics.migrantsByYear}
              type="bar"
              dataKey="count"
              nameKey="year"
            />
          </>
        )}

        {activeView === "management" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-terra-navy">Admin Management</CardTitle>
              <Dialog open={isAddingAdmin} onOpenChange={setIsAddingAdmin}>
                <DialogTrigger asChild>
                  <Button className="bg-terra-green hover:bg-terra-green/90 text-white">
                    Add Admin
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Admin</DialogTitle>
                  </DialogHeader>
                  <AdminForm
                    onSubmit={handleCreateAdmin}
                    onCancel={() => setIsAddingAdmin(false)}
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {admins.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-terra-navy">{admin.name}</h4>
                      <p className="text-sm text-terra-navy/70">{admin.email}</p>
                      <p className="text-xs text-terra-navy/50">Role: {admin.role}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        admin.status === 'Active' ? 'bg-terra-green text-white' : 'bg-terra-yellow text-white'
                      }`}>
                        {admin.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
