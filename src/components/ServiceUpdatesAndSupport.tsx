import React, { useState } from 'react';
import { SERVICE_UPDATES, SUPPORT_EVENTS } from '../data/mockData';
import { UpdateItem, SupportEvent } from '../types';
import { Newspaper, CalendarDays, ArrowUpRight, Clock, MapPin, X, Bell } from 'lucide-react';

interface ServiceUpdatesAndSupportProps {
  onOpenContactModal: () => void;
}

export const ServiceUpdatesAndSupport: React.FC<ServiceUpdatesAndSupportProps> = ({
  onOpenContactModal
}) => {
  const [selectedUpdate, setSelectedUpdate] = useState<UpdateItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<SupportEvent | null>(null);

  return (
    <section id="support" className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-column layout from PDF with elevated styling */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Column 1: Service updates */}
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
                  Gazette & Disclosures
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-blue-600" />
                  Service updates
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Policy revisions, fast-track windows, and operational announcements.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {SERVICE_UPDATES.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedUpdate(item)}
                  className="p-4 rounded-2xl border border-slate-200/90 hover:border-blue-500 bg-slate-50/60 hover:bg-white transition-all cursor-pointer group flex items-start justify-between gap-4 shadow-2xs"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {item.content}
                    </p>
                  </div>

                  <span className="text-xs font-mono text-slate-400 whitespace-nowrap pt-1">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Support */}
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
                  Advisory Desk
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-teal-600" />
                  Support
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Clinics, office hours, and technical commercialization workshops.
                </p>
              </div>

              <button
                onClick={onOpenContactModal}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Help Desk →
              </button>
            </div>

            <div className="space-y-3">
              {SUPPORT_EVENTS.map((event) => (
                <div 
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="p-4 rounded-2xl border border-slate-200/90 hover:border-teal-500 bg-slate-50/60 hover:bg-white transition-all cursor-pointer group flex items-start justify-between gap-4 shadow-2xs"
                >
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 text-teal-700 font-medium">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                      <span>·</span>
                      <span className="truncate max-w-[200px]">{event.location}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-400 whitespace-nowrap pt-1">
                    {event.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Modal for Update details */}
      {selectedUpdate && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-7 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedUpdate(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full font-semibold">
              {selectedUpdate.category} · {selectedUpdate.date}
            </span>

            <h3 className="text-xl font-bold font-serif text-slate-950">
              {selectedUpdate.title}
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedUpdate.content}
            </p>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedUpdate(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Event details */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-7 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-900 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full font-semibold">
              Support Clinic · {selectedEvent.date}
            </span>

            <h3 className="text-xl font-bold font-serif text-slate-950">
              {selectedEvent.title}
            </h3>

            <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>{selectedEvent.time}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>{selectedEvent.location}</span>
              </p>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedEvent.description}
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onOpenContactModal}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Register for Attendance
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
