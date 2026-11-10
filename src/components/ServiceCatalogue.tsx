import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { ArrowUpRight, CheckCircle2, ChevronRight, Layers, FileText, Users, Award, ShieldAlert, Sparkles, Filter } from 'lucide-react';

interface ServiceCatalogueProps {
  services: ServiceItem[];
  selectedAudience: string | null;
  onSelectAudience: (audience: string | null) => void;
  onOpenServiceDetail: (service: ServiceItem) => void;
  onRequestService: (serviceId: string) => void;
}

export const ServiceCatalogue: React.FC<ServiceCatalogueProps> = ({
  services,
  selectedAudience,
  onSelectAudience,
  onOpenServiceDetail,
  onRequestService
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPreviewTag, setSelectedPreviewTag] = useState<string>('Purpose');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'Commercialization & IP', label: 'Commercialization & IP' },
    { id: 'Collaborative Research', label: 'Collaborative Research' },
    { id: 'Testing & Standards', label: 'Testing & Standards' },
    { id: 'Funding & Incubation', label: 'Funding & Grants' },
    { id: 'Regulatory & Governance', label: 'Regulatory Advisory' }
  ];

  const filteredServices = services.filter((srv) => {
    const matchesCategory = activeCategory === 'all' || srv.category === activeCategory;
    const matchesAudience = !selectedAudience || srv.audience.includes(selectedAudience as any);
    return matchesCategory && matchesAudience;
  });

  // Exactly as the PDF specifies in "Every service page shows"
  const serviceDetailTags = [
    { 
      label: 'Purpose', 
      desc: 'Clear strategic objective', 
      detail: 'Every TCCI service document starts with a precise legal and commercial objective statement so innovators know exactly what milestone it achieves.' 
    },
    { 
      label: 'Audience', 
      desc: 'Eligible stakeholders', 
      detail: 'Explicit definition of permitted applicants: faculty PIs, university ORIC cells, private tech enterprises, or student entrepreneurs.' 
    },
    { 
      label: 'Eligibility', 
      desc: 'Pre-requisite criteria', 
      detail: 'Transparent Technology Readiness Level (TRL 1-9) requirements, intellectual property ownership status, and statutory prerequisites.' 
    },
    { 
      label: 'Benefits', 
      desc: 'Deliverables & grants', 
      detail: 'Concrete deliverables: accredited laboratory stamps, prior-art novel search reports, subsidised attorney hours, and escrow management.' 
    },
    { 
      label: 'Process steps', 
      desc: 'Standard turnaround stages', 
      detail: 'Every step has a formal Service Level Agreement (SLA) with assigned desk officers and milestone dates.' 
    },
    { 
      label: 'Required documents', 
      desc: 'Mandatory intake files', 
      detail: 'Standardized checklist to prevent delays: invention disclosures, CAD schematics, board endorsements, and test logs.' 
    },
    { 
      label: 'Call to action', 
      desc: 'Instant submission form', 
      detail: 'One-click authenticated application dispatching directly to the TCCI digital counter and generating your immutable tracking ID.' 
    }
  ];

  const currentTagInfo = serviceDetailTags.find((t) => t.label === selectedPreviewTag) || serviceDetailTags[0];

  return (
    <section id="services" className="py-20 bg-slate-900/40 text-slate-900 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
              Certified Offerings
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-slate-950">
              Service catalogue
            </h2>
            <p className="text-base text-slate-600 mt-1">
              Find the service you need across intellectual property, licensing, lab testing, and seed funding.
            </p>
          </div>

          {/* Active Audience filter status */}
          {selectedAudience && (
            <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl text-xs font-semibold text-blue-900 shadow-sm">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>Showing services for: <strong>{selectedAudience}</strong></span>
              <button 
                onClick={() => onSelectAudience(null)}
                className="hover:text-blue-950 font-bold ml-1 text-blue-600 hover:underline"
              >
                ✕ Reset
              </button>
            </div>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-950 text-white shadow-md shadow-slate-950/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onOpenServiceDetail(service)}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all group cursor-pointer relative overflow-hidden"
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-blue-700 font-semibold bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md">
                    {service.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">
                    {service.estimatedTurnaround}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-serif text-slate-950 group-hover:text-blue-600 transition-colors leading-snug">
                  {service.name}
                </h3>

                {/* Purpose, audience, benefits preview line matching the PDF layout */}
                <div className="space-y-2 text-xs text-slate-600 pt-1">
                  <p className="line-clamp-2 leading-relaxed">
                    <strong className="text-slate-900 font-semibold">Purpose: </strong>
                    {service.purpose}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.audience.slice(0, 3).map((aud) => (
                      <span key={aud} className="inline-block text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {aud}
                      </span>
                    ))}
                    {service.audience.length > 3 && (
                      <span className="text-[11px] text-slate-400 pt-0.5 font-medium">+{service.audience.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                  Explore full dossier
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRequestService(service.id);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-blue-600 text-white text-xs font-semibold transition-all shadow-sm"
                >
                  Request
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section from PDF: 
            Every service page shows
            The same clear details each time.
            [Purpose] [Audience] [Eligibility] [Benefits] [Process steps] [Required documents] [Call to action]
        */}
        <div className="mt-20 bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-700 font-semibold bg-blue-100/60 px-3 py-1 rounded-full">
              Standardized Quality Framework
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950">
              Every service page shows
            </h3>
            <p className="text-sm text-slate-600">
              The same clear details each time. Click any criterion below to preview how it is audited:
            </p>
          </div>

          {/* Interactive Badges / Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {serviceDetailTags.map((tag) => {
              const isSelected = selectedPreviewTag === tag.label;
              return (
                <button
                  key={tag.label}
                  onClick={() => setSelectedPreviewTag(tag.label)}
                  className={`rounded-2xl px-3 py-3.5 text-center flex flex-col items-center justify-center transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-102 ring-2 ring-blue-500/30'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs font-bold font-serif">
                    {tag.label}
                  </span>
                  <span className={`text-[10px] mt-0.5 truncate max-w-full ${isSelected ? 'text-blue-300' : 'text-slate-500'}`}>
                    {tag.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Criteria Preview Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 max-w-3xl mx-auto flex items-start gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-serif font-bold text-base">
              ✓
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-950 font-serif">
                  Standard Criteria: {currentTagInfo.label}
                </h4>
                <span className="text-[10px] font-mono text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                  {currentTagInfo.desc}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentTagInfo.detail}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
