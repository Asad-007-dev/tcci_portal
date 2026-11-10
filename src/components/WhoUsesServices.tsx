import React from 'react';
import { AUDIENCE_LIST } from '../data/mockData';
import { AudienceType } from '../types';
import { Users, Building2, School, GraduationCap, Briefcase, Landmark, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface WhoUsesServicesProps {
  selectedAudience: string | null;
  onSelectAudience: (aud: string | null) => void;
  onViewAllClick: () => void;
}

export const WhoUsesServices: React.FC<WhoUsesServicesProps> = ({
  selectedAudience,
  onSelectAudience,
  onViewAllClick
}) => {
  // Matching 8 audience categories with modern visual cards and color highlights
  const audienceDetails: Record<string, { icon: any; desc: string; color: string }> = {
    'Researchers': { 
      icon: GraduationCap, 
      desc: 'Patent novelty & publication IP protection',
      color: 'from-blue-500/10 to-indigo-500/10 text-blue-600 group-hover:border-blue-400' 
    },
    'Universities': { 
      icon: School, 
      desc: 'Institutional commercialization governance',
      color: 'from-indigo-500/10 to-purple-500/10 text-indigo-600 group-hover:border-indigo-400' 
    },
    'ORICs': { 
      icon: Building2, 
      desc: 'University research & tech transfer cells',
      color: 'from-teal-500/10 to-emerald-500/10 text-teal-600 group-hover:border-teal-400' 
    },
    'Startups': { 
      icon: Briefcase, 
      desc: 'Deep-tech seed grants & prototype testing',
      color: 'from-amber-500/10 to-orange-500/10 text-amber-600 group-hover:border-amber-400' 
    },
    'Companies': { 
      icon: Building2, 
      desc: 'Joint industry R&D matching & licensing',
      color: 'from-cyan-500/10 to-blue-500/10 text-cyan-600 group-hover:border-cyan-400' 
    },
    'Investors': { 
      icon: Landmark, 
      desc: 'Verified university spin-offs & dealflow',
      color: 'from-purple-500/10 to-pink-500/10 text-purple-600 group-hover:border-purple-400' 
    },
    'Government': { 
      icon: ShieldCheck, 
      desc: 'Regulatory sandboxes & national standards',
      color: 'from-rose-500/10 to-red-500/10 text-rose-600 group-hover:border-rose-400' 
    },
    'Students': { 
      icon: Users, 
      desc: 'Final year project grants & lab access',
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 group-hover:border-emerald-400' 
    }
  };

  return (
    <section className="py-20 bg-slate-900/30 text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header from PDF */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
              Stakeholder Ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-slate-950">
              Who uses services
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select your institution type to filter customized commercialization protocols.
            </p>
          </div>
        </div>

        {/* 2-row / 4-column modern card grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {AUDIENCE_LIST.map((aud) => {
            const meta = audienceDetails[aud] || { icon: Users, desc: 'General access', color: '' };
            const Icon = meta.icon;
            const isSelected = selectedAudience === aud;

            return (
              <button
                key={aud}
                onClick={() => {
                  if (isSelected) {
                    onSelectAudience(null);
                  } else {
                    onSelectAudience(aud);
                    const el = document.getElementById('services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`p-6 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-3 group cursor-pointer ${
                  isSelected
                    ? 'bg-slate-950 text-white border-slate-950 shadow-xl shadow-slate-950/20 scale-102 ring-2 ring-blue-500'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  isSelected 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-base font-bold font-serif block">
                    {aud}
                  </span>
                  <span className={`text-[11px] leading-tight mt-1 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {meta.desc}
                  </span>
                </div>

                <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full ${
                  isSelected 
                    ? 'bg-blue-900 text-blue-200' 
                    : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-800'
                }`}>
                  {isSelected ? '✓ Filter Active' : 'Filter Services'}
                </span>
              </button>
            );
          })}
        </div>

        {/* [View all services] Button from PDF */}
        <div className="text-center pt-4">
          <button
            onClick={() => {
              onSelectAudience(null);
              onViewAllClick();
            }}
            className="px-8 py-3 rounded-xl border border-slate-300 hover:border-slate-950 bg-white text-slate-900 hover:text-white hover:bg-slate-950 font-bold text-xs tracking-wider uppercase transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>View all services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
