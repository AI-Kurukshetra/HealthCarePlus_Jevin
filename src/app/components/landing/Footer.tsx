import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Footer() {
  const navigate = useNavigate();

  const footerLinks = {
    services: [
      { name: 'Video Consultation', href: '/consultations' },
      { name: 'Lab Tests', href: '/labs' },
      { name: 'Pharmacy', href: '/pharmacy' },
      { name: 'Emergency Care', href: '/emergency-care' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Press', href: '/press' },
    ],
    support: [
      { name: 'Help Center', href: '/help-center' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  return (
    <footer className="bg-white border-t border-[rgba(0,0,0,0.06)]">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-[#007EFC] rounded-2xl flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded-lg relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-semibold">HealthCare+</span>
            </button>
            <p className="text-[#64748B] mb-4 max-w-sm">
              Making healthcare simple, accessible, and affordable for everyone. Your health is our priority.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-[#64748B]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#007EFC]" />
                <span>1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#007EFC]" />
                <span>support@healthcareplus.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#007EFC]" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold text-[#030213] mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleLinkClick(link.href)}
                    className="text-[#64748B] hover:text-[#007EFC] transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#030213] mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleLinkClick(link.href)}
                    className="text-[#64748B] hover:text-[#007EFC] transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#030213] mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleLinkClick(link.href)}
                    className="text-[#64748B] hover:text-[#007EFC] transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[rgba(0,0,0,0.06)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#64748B]">
            © 2026 HealthCare+. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 bg-[#F8FAFC] hover:bg-[#007EFC] rounded-xl flex items-center justify-center transition-colors group">
              <Facebook className="w-4 h-4 text-[#64748B] group-hover:text-white" />
            </a>
            <a href="#" className="w-9 h-9 bg-[#F8FAFC] hover:bg-[#007EFC] rounded-xl flex items-center justify-center transition-colors group">
              <Twitter className="w-4 h-4 text-[#64748B] group-hover:text-white" />
            </a>
            <a href="#" className="w-9 h-9 bg-[#F8FAFC] hover:bg-[#007EFC] rounded-xl flex items-center justify-center transition-colors group">
              <Instagram className="w-4 h-4 text-[#64748B] group-hover:text-white" />
            </a>
            <a href="#" className="w-9 h-9 bg-[#F8FAFC] hover:bg-[#007EFC] rounded-xl flex items-center justify-center transition-colors group">
              <Linkedin className="w-4 h-4 text-[#64748B] group-hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}