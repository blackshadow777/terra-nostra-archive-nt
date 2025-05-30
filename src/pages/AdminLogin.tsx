
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - in real app, this would call the Laravel API
    setTimeout(() => {
      if (email === "admin@example.com" && password === "password") {
        localStorage.setItem("adminToken", "mock-token-123");
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!",
        });
        navigate("/admin");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-terra-beige via-terra-beige/50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          onClick={() => navigate("/")} 
          variant="ghost"
          className="mb-6 text-terra-navy hover:text-terra-red"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Main Site
        </Button>

        <Card className="shadow-2xl border-terra-beige/30">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-terra-red rounded-full flex items-center justify-center">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="font-playfair text-2xl text-terra-navy">Admin Login</CardTitle>
              <p className="text-terra-navy/70 mt-2">Access the Terra Nostra Archive administration</p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-terra-navy font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="border-terra-beige focus:border-terra-red"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-terra-navy font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="border-terra-beige focus:border-terra-red"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-terra-red hover:bg-terra-red/90 text-white font-semibold py-3"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-terra-navy/60">
              <p>Demo credentials:</p>
              <p>Email: admin@example.com</p>
              <p>Password: password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
