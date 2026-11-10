import React from 'react';

interface FooterProps {
  onOpenRequestModal: (serviceId?: string) => void;
  onOpenTrackModal: (trackingId?: string) => void;
  onOpenContactModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRequestModal,
  onOpenTrackModal,
  onOpenContactModal,
  onNavigateSection
}) => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Info from PDF: [T] TCCI, The service counter of TCCI */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black flex items-center justify-center text-lg font-serif shadow-md">
                T
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                TCCI
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-300 max-w-sm">
              The service counter of TCCI.
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Empowering researchers, higher education ORICs, innovative startups, and enterprise partners with transparent commercialization pathways.
            </p>
          </div>

          {/* Column 1: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Service Catalogue
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Service Descriptions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Eligibility
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Benefits
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Requests */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Requests
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onOpenRequestModal()}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Request a Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenTrackModal()}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Track a Request
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('how-it-works')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Required Documents
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenTrackModal()}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Notifications
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigateSection('support')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Support
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenContactModal}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Contact TCCI
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('how-it-works')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Process Steps
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenContactModal}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Help Desk
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Sub-footer line matching PDF */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-2">
          <span className="text-slate-400 font-semibold">tcci.services · TCCI</span>
          <span>Official Service Counter & Commercialization Gateway</span>
        </div>

      </div>
    </footer>
  );
};
