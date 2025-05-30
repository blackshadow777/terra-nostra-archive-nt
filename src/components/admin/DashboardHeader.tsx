
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
}

const DashboardHeader = ({ onToggleSidebar }: DashboardHeaderProps) => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
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
  );
};

export default DashboardHeader;
