import React, { useState } from 'react';
import { ServiceRequestRecord } from '../types';
import { Search, CheckCircle2, Clock, AlertCircle, Calendar, User, Building, FileText, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';

interface RequestTrackerSectionProps {
  requests: ServiceRequestRecord[];
  onOpenTrackModal: (trackingId?: string) => void;
}

export const RequestTrackerSection: React.FC<RequestTrackerSectionProps> = ({
  requests,
  onOpenTrackModal
}) => {
  const [trackingInput, setTrackingInput] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<ServiceRequestRecord | null>(requests[0] || null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const found = requests.find(
      (r) => r.trackingId.toLowerCase() === trackingInput.trim().toLowerCase()
    );

    if (found) {
      setSelectedRecord(found);
    } else {
      setErrorMessage(`No request found with tracking number "${trackingInput}". Try "TCCI-2026-0814" or "TCCI-2026-0792".`);
    }
  };

  const handleSelectSample = (rec: ServiceRequestRecord) => {
    setTrackingInput(rec.trackingId);
    setSelectedRecord(rec);
    setErrorMessage('');
  };

  return (
    <section id="track" className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Request tracking Stats Row */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
              Transparency Ledger
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-slate-950">
              Request tracking
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Live operational throughput and multi-stage turnaround benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200 rounded-2xl p-6 shadow-xs">
              <span className="text-3xl sm:text-4xl font-bold font-serif text-slate-950">
                1,250+
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 mt-2 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Open requests
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-indigo-50/50 border border-slate-200 rounded-2xl p-6 shadow-xs">
              <span className="text-3xl sm:text-4xl font-bold font-serif text-indigo-950">
                840+
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 mt-2 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                In progress
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-emerald-50/50 border border-slate-200 rounded-2xl p-6 shadow-xs">
              <span className="text-3xl sm:text-4xl font-bold font-serif text-emerald-950">
                3,420+
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 mt-2 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Completed
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-teal-50/50 border border-slate-200 rounded-2xl p-6 shadow-xs">
              <span className="text-3xl sm:text-4xl font-bold font-serif text-teal-950">
                99.4%
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 mt-2 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                Notifications SLA
              </p>
            </div>
          </div>
        </div>

        {/* Status timeline Section */}
        <div className="space-y-6 pt-4">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-slate-950">
              Status timeline
            </h2>
            <p className="text-base text-slate-600 mt-1">
              Every request shows where it stands across review, attorney draft, and formal certificate dispatch.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Tracking Input Box */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xs">
              <h3 className="font-bold text-slate-950 text-base font-serif flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                Lookup Official Docket
              </h3>
              
              <form onSubmit={handleTrackSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 font-mono">
                    Tracking Number
                  </label>
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="Enter ID e.g., TCCI-2026-0814"
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 font-mono shadow-xs"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Track request</span>
                </button>
              </form>

              {/* Sample records to click and preview */}
              <div className="pt-2 border-t border-slate-200 space-y-2.5">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
                  Or select sample tracked records:
                </span>
                <div className="space-y-2">
                  {requests.map((rec) => (
                    <button
                      key={rec.trackingId}
                      onClick={() => handleSelectSample(rec)}
                      className={`w-full text-left p-3.5 rounded-xl text-xs transition-all border flex items-center justify-between cursor-pointer ${
                        selectedRecord?.trackingId === rec.trackingId
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="font-mono font-bold block">{rec.trackingId}</span>
                        <span className={`text-[11px] truncate block ${selectedRecord?.trackingId === rec.trackingId ? 'text-slate-300' : 'text-slate-500'}`}>
                          {rec.serviceName}
                        </span>
                      </div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold shrink-0 ${
                        rec.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        rec.status === 'In progress' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {rec.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Timeline Display */}
            {selectedRecord && (
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-7 shadow-sm">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                      Official Tracking Docket
                    </span>
                    <h3 className="text-2xl font-bold font-serif text-slate-950 mt-1">
                      {selectedRecord.trackingId}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      {selectedRecord.serviceName}
                    </p>
                  </div>

                  {/* Request status badges from PDF */}
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-200 self-start sm:self-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedRecord.status === 'Submitted'
                        ? 'bg-slate-950 text-white shadow-xs'
                        : 'text-slate-500'
                    }`}>
                      Submitted
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedRecord.status === 'In progress'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-500'
                    }`}>
                      In progress
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedRecord.status === 'Completed'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-500'
                    }`}>
                      Completed
                    </span>
                  </div>
                </div>

                {/* Audit details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-600 bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase">Applicant</span>
                    <span className="font-semibold text-slate-900 text-xs">{selectedRecord.applicantName}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase">Organization</span>
                    <span className="font-semibold text-slate-900 truncate block text-xs">{selectedRecord.organization}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase">Assigned Officer</span>
                    <span className="font-semibold text-blue-700 truncate block text-xs">{selectedRecord.assignedOfficer}</span>
                  </div>
                </div>

                {/* Timeline Stepper */}
                <div className="space-y-4 pt-1">
                  <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider block">
                    Execution Milestones & Audit Trail
                  </span>

                  <div className="space-y-4">
                    {selectedRecord.steps.map((st, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-xs ${
                            st.completed 
                              ? 'bg-emerald-600 text-white' 
                              : st.current 
                              ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                              : 'bg-slate-200 text-slate-500'
                          }`}>
                            {st.completed ? '✓' : i + 1}
                          </div>
                          {i < selectedRecord.steps.length - 1 && (
                            <div className={`w-0.5 h-8 ${st.completed ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                          )}
                        </div>

                        <div className="flex-1 pb-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-900">
                              {st.title}
                            </h4>
                            {st.date && (
                              <span className="text-[11px] font-mono text-slate-400">
                                {st.date}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">
                            {st.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest Status Note */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200 rounded-2xl text-xs text-blue-950 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Latest Officer Note: </span>
                    <span>{selectedRecord.statusNote}</span>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
