
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-terra-beige via-terra-beige/50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239B2335" fill-opacity="0.4"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] repeat"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h2 className="font-playfair text-4xl lg:text-6xl font-bold text-terra-navy leading-tight">
                Discover the Stories of
                <span className="text-terra-red block">Italian Pioneers</span>
              </h2>
              <p className="text-lg lg:text-xl text-terra-navy/80 leading-relaxed max-w-lg">
                Explore the rich heritage of Italian migrants who made the Northern Territory their home. 
                Search through historical records, personal stories, and family connections.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-terra-red hover:bg-terra-red/90 text-white px-8 py-3 text-lg font-semibold group transition-all"
              >
                <Search className="w-5 h-5 mr-2" />
                Start Searching
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-terra-green text-terra-green hover:bg-terra-green hover:text-white px-8 py-3 text-lg font-semibold transition-all"
              >
                Learn More
              </Button>
            </div>
            
            {/* Statistics */}
            <div className="flex gap-8 pt-8 border-t border-terra-beige">
              <div className="text-center">
                <div className="font-playfair text-3xl font-bold text-terra-red">1,200+</div>
                <div className="text-sm text-terra-navy/70 font-medium">Records</div>
              </div>
              <div className="text-center">
                <div className="font-playfair text-3xl font-bold text-terra-green">50+</div>
                <div className="text-sm text-terra-navy/70 font-medium">Regions</div>
              </div>
              <div className="text-center">
                <div className="font-playfair text-3xl font-bold text-terra-yellow">100+</div>
                <div className="text-sm text-terra-navy/70 font-medium">Years</div>
              </div>
            </div>
          </div>
          
          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-terra-beige to-terra-beige/50 rounded-2xl shadow-2xl overflow-hidden">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')] bg-cover bg-center opacity-60">
                <div className="w-full h-full bg-gradient-to-br from-terra-red/20 to-terra-green/20"></div>
              </div>
              
              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-end p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
                  <p className="text-sm font-medium text-terra-navy/80">
                    Historical photograph placeholder - Italian migrants arriving in Northern Territory, circa 1950s
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-terra-yellow/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-terra-green/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
