
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-terra-beige/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <h1 className="font-playfair text-2xl lg:text-3xl font-bold text-terra-red">
                Terra Nostra Archive
              </h1>
            </Link>
            <div className="hidden lg:block w-px h-8 bg-terra-beige"></div>
            <p className="hidden lg:block text-terra-navy/70 font-medium">
              Italian Migration to Northern Territory
            </p>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-terra-navy hover:text-terra-red transition-colors font-medium"
            >
              Home
            </Link>
            <a 
              href="#search" 
              className="text-terra-navy hover:text-terra-red transition-colors font-medium"
            >
              Search
            </a>
            <a 
              href="#about" 
              className="text-terra-navy hover:text-terra-red transition-colors font-medium"
            >
              About
            </a>
            <Link 
              to="/admin/login" 
              className="text-terra-navy hover:text-terra-red transition-colors font-medium"
            >
              Admin
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              className="border-terra-red text-terra-red hover:bg-terra-red hover:text-white transition-all"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Archive
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
