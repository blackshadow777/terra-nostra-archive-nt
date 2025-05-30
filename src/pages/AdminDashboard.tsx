
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut, 
  Camera,
  Edit,
  Trash2,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [adminProfile, setAdminProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    profilePicture: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

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

  // Mock data for the dashboard
  const stats = [
    { title: "Total Migrants", value: "1,247", icon: Users, color: "text-terra-red" },
    { title: "Records Added", value: "23", icon: FileText, color: "text-terra-green" },
    { title: "This Month", value: "156", icon: Calendar, color: "text-terra-yellow" },
    { title: "Pending Review", value: "8", icon: Settings, color: "text-terra-navy" }
  ];

  const recentMigrants = [
    { id: 1, name: "Giuseppe Rossi", region: "Veneto", date: "2024-01-15" },
    { id: 2, name: "Maria Benedetti", region: "Sicily", date: "2024-01-14" },
    { id: 3, name: "Antonio Lombardi", region: "Calabria", date: "2024-01-13" },
    { id: 4, name: "Elena Martini", region: "Tuscany", date: "2024-01-12" }
  ];

  return (
    <div className="min-h-screen bg-terra-beige/10">
      {/* Header */}
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
              {/* Profile Section */}
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
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-terra-navy/70">{stat.title}</p>
                    <p className="text-2xl font-bold text-terra-navy">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-terra-navy">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-terra-red hover:bg-terra-red/90 text-white justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Add New Migrant
              </Button>
              <Button variant="outline" className="w-full border-terra-green text-terra-green hover:bg-terra-green hover:text-white justify-start">
                <Search className="w-4 h-4 mr-2" />
                Search Records
              </Button>
              <Button variant="outline" className="w-full border-terra-navy text-terra-navy hover:bg-terra-navy hover:text-white justify-start">
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </Button>
            </CardContent>
          </Card>

          {/* Recent Records */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-terra-navy">Recent Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMigrants.map((migrant)=> (
                  <div key={migrant.id} className="flex items-center justify-between border-b border-terra-beige pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-terra-beige text-terra-navy">
                          {migrant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-terra-navy">{migrant.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-terra-green text-terra-green text-xs">
                            {migrant.region}
                          </Badge>
                          <span className="text-xs text-terra-navy/60">Added: {migrant.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-terra-navy hover:text-terra-green">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-terra-navy hover:text-terra-red">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
