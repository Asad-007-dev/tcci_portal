import React from 'react';
import { ServiceItem } from '../types';
import { X, CheckCircle, ArrowRight, FileText, Users, Award, ShieldAlert, Clock } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestService
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8 p-6 sm:p-8 space-y-6 shadow-2xl relative text-neutral-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded font-semibold">
            {service.category} · {service.estimatedTurnaround}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-neutral-950">
            {service.name}
          </h2>
          <p className="text-sm text-neutral-600">
            {service.shortDescription}
          </p>
        </div>

        {/* The 7 criteria as specified in the PDF:
            Purpose | Audience | Eligibility | Benefits | Process steps | Required documents | Call to action
        */}
        <div className="space-y-5 divide-y divide-neutral-100 max-h-[60vh] overflow-y-auto pr-2">
          
          {/* 1. Purpose */}
          <div className="pt-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1">
              1. Purpose
            </h4>
            <p className="text-sm text-neutral-800 leading-relaxed">
              {service.purpose}
            </p>
          </div>

          {/* 2. Audience */}
          <div className="pt-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
              2. Target Audience
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.audience.map((aud) => (
                <span key={aud} className="text-xs font-semibold bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full border border-neutral-200">
                  {aud}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Eligibility */}
          <div className="pt-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1">
              3. Eligibility Criteria
            </h4>
            <p className="text-sm text-neutral-800 leading-relaxed">
              {service.eligibility}
            </p>
          </div>

          {/* 4. Benefits */}
          <div className="pt-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
              4. Benefits & Deliverables
            </h4>
            <ul className="space-y-1.5 text-sm text-neutral-800">
              {service.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Process Steps */}
          <div className="pt-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
              5. Process Steps
            </h4>
            <ol className="space-y-2 text-sm text-neutral-800">
              {service.processSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs font-bold bg-neutral-900 text-white w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 6. Required Documents */}
          <div className="pt-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
              6. Required Documents
            </h4>
            <ul className="space-y-1.5 text-sm text-neutral-800 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              {service.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs">
                  <FileText className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 7. Call to Action */}
        <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-neutral-500 font-mono">
            Standard processing: {service.estimatedTurnaround}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-full border border-neutral-300 text-neutral-700 text-xs font-semibold hover:bg-neutral-100 transition-colors w-full sm:w-auto text-center"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestService(service.id);
              }}
              className="px-6 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>Request this service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
