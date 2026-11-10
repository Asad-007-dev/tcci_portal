import React, { useState } from 'react';
import { Search, ArrowRight, CheckCircle2, ChevronRight, FileCheck, Send, ShieldCheck, Sparkles, Compass, Check } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  onRequestClick: () => void;
  onTrackClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onRequestClick,
  onTrackClick
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const requestFlowSteps = [
    { title: 'Choose a service', desc: 'Select from certified offerings', badge: 'Step 1' },
    { title: 'Describe your need', desc: 'Specify scope & deadlines', badge: 'Step 2' },
    { title: 'Add attachments', desc: 'Upload documents & disclosures', badge: 'Step 3' },
    { title: 'Submit', desc: 'Instant intake validation', badge: 'Step 4' },
    { title: 'Tracking number', desc: 'Unique immutable case ID', badge: 'Step 5' },
    { title: 'Status timeline', desc: 'Live multi-stage progress', badge: 'Step 6' }
  ];

  return (
    <section id="hero" className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-16 pb-20 border-b border-slate-800/80 relative overflow-hidden">
      
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-[500px] h-[400px] bg-teal-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, subhead, search bar, and primary CTAs */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Tagline Badge from PDF */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="tracking-widest uppercase font-mono text-[11px]">SERVICE CATALOGUE AND REQUEST PORTAL</span>
            </div>

            {/* Main Headline from PDF */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-white leading-[1.12]">
              Request a service and <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
                follow it step by step
              </span>
            </h1>

            {/* Subtext from PDF */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Understand a service, send a request and follow its progress with a tracking number. Complete institutional transparency for researchers, ORICs, and industry.
            </p>

            {/* Search Box - Elevated modern styling */}
            <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl">
              <div className="flex flex-col sm:flex-row gap-2.5 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-700/80 shadow-xl shadow-black/40 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      onSearch(e.target.value);
                    }}
                    placeholder="Search services (e.g. patent filing, licensing, testing)..."
                    className="w-full bg-transparent text-white placeholder:text-slate-400 px-3 py-2.5 text-sm font-medium focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Action Buttons from PDF: [Request a service] and [Track my request] */}
            <div className="pt-1 flex flex-col sm:flex-row gap-3.5 max-w-xl">
              <button
                onClick={onRequestClick}
                className="flex-1 py-3.5 px-6 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-white/10 text-center flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Request a service</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onTrackClick}
                className="flex-1 py-3.5 px-6 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800 text-white font-semibold text-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Track my request</span>
              </button>
            </div>

            {/* Quick Demo Tracker hints */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="text-slate-500">Live Sample Track IDs:</span>
              <button 
                onClick={() => onSearch('TCCI-2026-0814')}
                className="font-mono text-blue-400 hover:text-blue-300 underline underline-offset-2 decoration-blue-500/50"
              >
                TCCI-2026-0814
              </button>
              <span>·</span>
              <button 
                onClick={() => onSearch('TCCI-2026-0792')}
                className="font-mono text-blue-400 hover:text-blue-300 underline underline-offset-2 decoration-blue-500/50"
              >
                TCCI-2026-0792
              </button>
            </div>

          </div>

          {/* Right Column: REQUEST FLOW card from PDF, now with vivid gradient line & modern cards */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 rounded-3xl p-7 shadow-2xl backdrop-blur-xl relative ring-1 ring-white/5">
            <div className="flex items-center justify-between pb-5 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200">
                  REQUEST FLOW
                </span>
              </div>
              <span className="text-[11px] text-teal-400 bg-teal-950/60 border border-teal-800/40 px-2 py-0.5 rounded-full font-mono">
                Standard Turnaround
              </span>
            </div>

            <div className="mt-5 space-y-3.5">
              {requestFlowSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3.5 group">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-300 group-hover:border-blue-500 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-all shadow-sm">
                      {index + 1}
                    </div>
                    {index < requestFlowSteps.length - 1 && (
                      <div className="w-0.5 h-6 bg-gradient-to-b from-slate-700 to-slate-800 mt-1" />
                    )}
                  </div>
                  <div className="pt-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {step.title}
                      </p>
                      <span className="text-[10px] font-mono text-slate-500">{step.badge}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Guaranteed 3-5 business day intake
              </span>
              <button
                onClick={onRequestClick}
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 group"
              >
                <span>Begin Flow</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
