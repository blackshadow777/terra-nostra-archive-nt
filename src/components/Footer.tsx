
import { MapPin, Mail, Calendar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-terra-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-playfair text-2xl font-bold text-terra-yellow">
              Terra Nostra Archive
            </h4>
            <p className="text-white/80 leading-relaxed max-w-md">
              Preserving the stories and heritage of Italian migrants to the Northern Territory. 
              A digital archive dedicated to honoring their contributions to Australian history.
            </p>
            <div className="flex items-center gap-2 text-terra-beige">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Established 2024</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="font-semibold text-terra-yellow">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/80 hover:text-terra-yellow transition-colors">
                  Search Archive
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-terra-yellow transition-colors">
                  About the Project
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-terra-yellow transition-colors">
                  How to Contribute
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-terra-yellow transition-colors">
                  Research Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h5 className="font-semibold text-terra-yellow">Contact</h5>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-terra-beige" />
                <div className="text-white/80">
                  <p>Northern Territory</p>
                  <p>Historical Society</p>
                  <p>Darwin, NT, Australia</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-terra-beige" />
                <a 
                  href="mailto:info@terranostra.nt.gov.au" 
                  className="text-white/80 hover:text-terra-yellow transition-colors"
                >
                  info@terranostra.nt.gov.au
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>
            © 2024 Terra Nostra Archive. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-terra-yellow transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-terra-yellow transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-terra-yellow transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
