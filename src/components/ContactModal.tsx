import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry / Support',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-neutral-900">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
            TCCI SERVICE COUNTER
          </span>
          <h2 className="text-2xl font-bold font-serif text-neutral-950">
            Contact TCCI
          </h2>
          <p className="text-xs text-neutral-600">
            Reach our service desk officers for inquiries, priority clearances, or technical partnerships.
          </p>
        </div>

        {/* Contact info snippets */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
          <div>
            <span className="text-[10px] font-mono text-neutral-400 block uppercase">Email Support</span>
            <span className="font-semibold text-neutral-900">desk@tcci.services</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-neutral-400 block uppercase">Helpline</span>
            <span className="font-semibold text-neutral-900">+92 (51) 9085-TCCI</span>
          </div>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1 font-mono">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. / Engr. / Mr. / Ms."
                className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1 font-mono">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@institution.edu"
                className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1 font-mono">
                Subject
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
              >
                <option>General Inquiry / Support</option>
                <option>Urgent Request Tracking Follow-up</option>
                <option>ORIC Institutional Partnership</option>
                <option>Laboratory Testing Appointment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1 font-mono">
                Message / Query
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can our service officers help you today?"
                className="w-full bg-white border border-neutral-300 rounded-lg p-3 text-sm focus:outline-none focus:border-neutral-900 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-neutral-950 text-white font-semibold text-xs tracking-wider uppercase hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Send Message
            </button>
          </form>
        ) : (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-neutral-950 text-base">Message Sent Successfully</h3>
            <p className="text-xs text-neutral-600">
              A service desk officer will reply to your registered email within 24 hours.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
