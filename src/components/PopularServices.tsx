import React from 'react';
import { ServiceItem } from '../types';
import { ArrowRight, ShieldCheck, Users, Clock, Award, Star } from 'lucide-react';

interface PopularServicesProps {
  services: ServiceItem[];
  onRequestService: (serviceId: string) => void;
  onOpenServiceDetail: (service: ServiceItem) => void;
}

export const PopularServices: React.FC<PopularServicesProps> = ({
  services,
  onRequestService,
  onOpenServiceDetail
}) => {
  const popularList = services.filter((s) => s.isPopular).slice(0, 3);

  return (
    <section className="py-20 bg-slate-900/30 text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header from PDF */}
        <div className="border-b border-slate-200 pb-6 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              Highest Demand
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-slate-950">
              Popular services
            </h2>
            <p className="text-base text-slate-600 mt-1">
              Most requested services across universities and national research clusters.
            </p>
          </div>
        </div>

        {/* 3 Elevated Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {popularList.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group"
            >
              {/* Image banner area */}
              <div className="relative h-52 bg-slate-100 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                
                <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border border-white/10">
                  {service.category}
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[11px] font-mono text-teal-300 font-semibold">
                    Turnaround: {service.estimatedTurnaround}
                  </span>
                </div>
              </div>

              {/* Content body */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 
                    onClick={() => onOpenServiceDetail(service)}
                    className="text-xl font-bold font-serif text-slate-950 hover:text-blue-600 cursor-pointer transition-colors leading-snug"
                  >
                    {service.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Pills from PDF: Audience, Eligibility, Process */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => onOpenServiceDetail(service)}
                      className="px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors"
                    >
                      Audience
                    </button>
                    <button
                      onClick={() => onOpenServiceDetail(service)}
                      className="px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors"
                    >
                      Eligibility
                    </button>
                    <button
                      onClick={() => onOpenServiceDetail(service)}
                      className="px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors"
                    >
                      Process Steps
                    </button>
                  </div>
                </div>

                {/* Call to action button from PDF: [Request service] */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onRequestService(service.id)}
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wider uppercase transition-all text-center cursor-pointer shadow-md shadow-blue-600/20"
                  >
                    Request service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
