import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Search, Clock, FileText, CheckCircle2, Shield, Sparkles, Building2 } from 'lucide-react';

interface NavbarProps {
  onOpenRequestModal: (serviceId?: string) => void;
  onOpenTrackModal: (trackingId?: string) => void;
  onOpenContactModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRequestModal,
  onOpenTrackModal,
  onOpenContactModal,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 text-white shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Modern Tech Crest */}
          <div className="flex items-center gap-3.5">
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-500 text-white font-black flex items-center justify-center text-xl font-serif shadow-md shadow-blue-500/25 ring-1 ring-white/20 group-hover:scale-105 transition-all">
                  T
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-white font-serif group-hover:text-blue-300 transition-colors">
                    TCCI
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 hidden sm:inline">
                    Portal
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 tracking-wide font-sans">
                  The Service Counter of TCCI
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium text-slate-300">
            <button 
              onClick={() => handleNavClick('services')}
              className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-slate-900/80 transition-all cursor-pointer"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavClick('how-it-works')}
              className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-slate-900/80 transition-all cursor-pointer"
            >
              How it works
            </button>
            <button 
              onClick={() => onOpenRequestModal()}
              className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-slate-900/80 transition-all cursor-pointer text-blue-400 font-semibold"
            >
              Request a service
            </button>
            <button 
              onClick={() => onOpenTrackModal()}
              className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-slate-900/80 transition-all cursor-pointer"
            >
              Track request
            </button>
            <button 
              onClick={() => handleNavClick('support')}
              className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-slate-900/80 transition-all cursor-pointer"
            >
              Support & Events
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenTrackModal()}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white transition-all flex items-center gap-2 shadow-sm"
            >
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Track Docket</span>
            </button>
            <button
              onClick={onOpenContactModal}
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all shadow-md shadow-blue-600/25 flex items-center gap-1.5"
            >
              <span>Contact TCCI</span>
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenTrackModal()}
              className="px-3 py-1.5 text-xs font-medium bg-slate-900 border border-slate-800 rounded-lg text-blue-400"
            >
              Track
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-1 text-sm font-medium text-slate-200">
            <button
              onClick={() => handleNavClick('services')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-900"
            >
              Services Catalogue
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-900"
            >
              How it works
            </button>
            <button
              onClick={() => { onOpenRequestModal(); setMobileMenuOpen(false); }}
              className="text-left py-2.5 px-3 rounded-lg bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20"
            >
              Request a Service
            </button>
            <button
              onClick={() => { onOpenTrackModal(); setMobileMenuOpen(false); }}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-900"
            >
              Track my Request
            </button>
            <button
              onClick={() => handleNavClick('support')}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-900"
            >
              Support & Events
            </button>
            <button
              onClick={() => { onOpenContactModal(); setMobileMenuOpen(false); }}
              className="text-left py-2.5 px-3 rounded-lg hover:bg-slate-900"
            >
              Contact TCCI Desk
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => { onOpenRequestModal(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-md"
            >
              New Service Request
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
