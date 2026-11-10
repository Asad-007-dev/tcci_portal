import React from 'react';
import { 
  CheckCircle, 
  FileCheck, 
  Calendar, 
  Paperclip, 
  Send, 
  QrCode,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface HowItWorksProps {
  onRequestClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onRequestClick }) => {
  // Matching the 6 boxes in PDF with elevated iconography & color accents
  const processCards = [
    {
      step: '01',
      title: 'Choose service',
      subtitle: 'Pick from the catalogue',
      icon: CheckCircle,
      accent: 'from-blue-500 to-indigo-600 text-blue-600 bg-blue-50 border-blue-200',
      detail: 'Browse through our accredited commercialization, joint R&D, patent filing, or testing services.'
    },
    {
      step: '02',
      title: 'Description',
      subtitle: 'Tell us what you need',
      icon: FileCheck,
      accent: 'from-indigo-500 to-purple-600 text-indigo-600 bg-indigo-50 border-indigo-200',
      detail: 'Provide your technical scope, institution details, or research problem statement.'
    },
    {
      step: '03',
      title: 'Required date',
      subtitle: 'When you need it',
      icon: Calendar,
      accent: 'from-teal-500 to-emerald-600 text-teal-600 bg-teal-50 border-teal-200',
      detail: 'Specify project deadlines, patent priority dates, or regulatory submission cutoffs.'
    },
    {
      step: '04',
      title: 'Attachments',
      subtitle: 'Add your files',
      icon: Paperclip,
      accent: 'from-amber-500 to-orange-600 text-amber-600 bg-amber-50 border-amber-200',
      detail: 'Upload invention disclosures, CAD drawings, lab test data, or institutional clearances.'
    },
    {
      step: '05',
      title: 'Submit',
      subtitle: 'Send the request',
      icon: Send,
      accent: 'from-rose-500 to-red-600 text-rose-600 bg-rose-50 border-rose-200',
      detail: 'Our automated intake verifies completeness and assigns a dedicated officer immediately.'
    },
    {
      step: '06',
      title: 'Tracking number',
      subtitle: 'Follow its progress',
      icon: QrCode,
      accent: 'from-emerald-500 to-teal-600 text-emerald-600 bg-emerald-50 border-emerald-200',
      detail: 'Receive your immutable tracking code to monitor audit steps, review notes, and final approval.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="border-b border-slate-200 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
              Step-by-Step Pathway
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-slate-950">
              How a request works
            </h2>
            <p className="text-base text-slate-600 mt-1">
              From choosing to completion — an accountable 6-phase journey.
            </p>
          </div>

          <button
            onClick={onRequestClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <span>Start a request now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Step Cards with modern icons, badge counters, and soft gradients */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processCards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-slate-50/60 rounded-2xl border border-slate-200/90 p-7 flex flex-col justify-between hover:border-slate-400 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-bold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                      PHASE {item.step}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-xs ${item.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-slate-950 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
