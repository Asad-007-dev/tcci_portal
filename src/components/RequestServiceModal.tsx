import React, { useState } from 'react';
import { ServiceItem, ServiceRequestRecord, AudienceType } from '../types';
import { AUDIENCE_LIST } from '../data/mockData';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  UploadCloud, 
  Trash2, 
  FileText, 
  Sparkles,
  Check,
  Calendar,
  Building2,
  Mail,
  User
} from 'lucide-react';

interface RequestServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  preselectedServiceId?: string;
  onSuccessSubmit: (newRecord: ServiceRequestRecord) => void;
}

export const RequestServiceModal: React.FC<RequestServiceModalProps> = ({
  isOpen,
  onClose,
  services,
  preselectedServiceId,
  onSuccessSubmit
}) => {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || services[0]?.id || ''
  );
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [audienceType, setAudienceType] = useState<AudienceType>('Researchers');
  const [description, setDescription] = useState('');
  const [requiredDate, setRequiredDate] = useState('');
  const [attachments, setAttachments] = useState<string[]>([
    'project_proposal_summary.pdf',
    'endorsement_letter_draft.docx'
  ]);
  const [newAttachmentInput, setNewAttachmentInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdDocketId, setCreatedDocketId] = useState('');

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];

  const handleAddAttachment = () => {
    if (newAttachmentInput.trim()) {
      setAttachments([...attachments, newAttachmentInput.trim()]);
      setNewAttachmentInput('');
    }
  };

  const handleRemoveAttachment = (idx: number) => {
    setAttachments(attachments.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `TCCI-2026-${randomNum}`;

    const newRecord: ServiceRequestRecord = {
      trackingId,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      applicantName: applicantName || 'Engr. Asadullah Sheikh',
      email: email || 'asadullah@example.com',
      organization: organization || 'TCCI Commercialization Partner',
      audienceType,
      description: description || 'Official institutional service request submitted via web portal.',
      requiredDate: requiredDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      submittedAt: new Date().toLocaleString(),
      status: 'Submitted',
      statusNote: 'Request registered. Assigned to Intake Evaluation Committee.',
      assignedOfficer: 'Officer Pending Allocation',
      steps: [
        { title: 'Choose service', description: selectedService.name, completed: true, date: new Date().toISOString().split('T')[0] },
        { title: 'Describe your need', description: 'Application parameters registered', completed: true, date: new Date().toISOString().split('T')[0] },
        { title: 'Add attachments', description: `${attachments.length} files attached`, completed: true, date: new Date().toISOString().split('T')[0] },
        { title: 'Submit & Verification', description: 'Initial compliance verification in progress', completed: true, current: true, date: new Date().toISOString().split('T')[0] },
        { title: 'In progress', description: 'Technical review and departmental processing', completed: false },
        { title: 'Completed', description: 'Official docket resolution and clearance', completed: false }
      ],
      attachments
    };

    setCreatedDocketId(trackingId);
    setIsSubmitted(true);
    onSuccessSubmit(newRecord);
  };

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

        {!isSubmitted ? (
          <>
            {/* Header with Steps */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                <span>TCCI REQUEST FORM</span>
                <span>•</span>
                <span>Step {currentStep} of 4</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-neutral-950 mt-1">
                {currentStep === 1 && 'Step 1: Choose a service'}
                {currentStep === 2 && 'Step 2: Describe your need'}
                {currentStep === 3 && 'Step 3: Add attachments & deadline'}
                {currentStep === 4 && 'Step 4: Review and submit'}
              </h2>
            </div>

            {/* Stepper Indicator */}
            <div className="grid grid-cols-4 gap-2 border-b border-neutral-100 pb-4">
              {['Service', 'Details', 'Files', 'Review'].map((label, idx) => {
                const stepNum = idx + 1;
                const isPassed = currentStep > stepNum;
                const isCurrent = currentStep === stepNum;
                return (
                  <div key={label} className="space-y-1">
                    <div className={`h-1.5 rounded-full transition-all ${
                      isPassed ? 'bg-emerald-500' : isCurrent ? 'bg-neutral-950' : 'bg-neutral-200'
                    }`} />
                    <span className={`text-[10px] font-mono block ${isCurrent ? 'font-bold text-neutral-950' : 'text-neutral-400'}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Step 1: Choose Service */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 font-mono">
                  Select Certified Service from Catalogue
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                        selectedServiceId === srv.id
                          ? 'border-neutral-950 bg-neutral-50 ring-1 ring-neutral-950'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase bg-neutral-200/70 px-2 py-0.5 rounded">
                          {srv.category}
                        </span>
                        <h4 className="text-sm font-bold text-neutral-950 mt-1">
                          {srv.name}
                        </h4>
                        <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                          {srv.shortDescription}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                        selectedServiceId === srv.id ? 'bg-black border-black text-white' : 'border-neutral-300'
                      }`}>
                        {selectedServiceId === srv.id && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2.5 rounded-full bg-neutral-950 text-white font-semibold text-xs transition-colors flex items-center gap-2"
                  >
                    <span>Next: Describe need</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Describe Need & Contact */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1 font-mono">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g., Dr. Asadullah Sheikh"
                      className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1 font-mono">
                      Official Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., asadullah@university.edu"
                      className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1 font-mono">
                      Institution / Organization
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g., ORIC Department, FAST / NUST / Tech Corp"
                      className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1 font-mono">
                      Applicant Category
                    </label>
                    <select
                      value={audienceType}
                      onChange={(e) => setAudienceType(e.target.value as AudienceType)}
                      className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-neutral-900"
                    >
                      {AUDIENCE_LIST.map((aud) => (
                        <option key={aud} value={aud}>{aud}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1 font-mono">
                    Describe Your Need / Scope of Request
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us what you need, current readiness level, objectives, or questions..."
                    className="w-full bg-white border border-neutral-300 rounded-lg p-3 text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 resize-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 rounded-full border border-neutral-300 text-xs font-semibold hover:bg-neutral-100"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 rounded-full bg-neutral-950 text-white font-semibold text-xs transition-colors flex items-center gap-2"
                  >
                    <span>Next: Files & Deadline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Files & Deadline */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1 font-mono">
                    Required Completion / Submission Date
                  </label>
                  <input
                    type="date"
                    value={requiredDate}
                    onChange={(e) => setRequiredDate(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 font-mono">
                    Add Attachments (Disclosures, CAD, Endorsements)
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAttachmentInput}
                      onChange={(e) => setNewAttachmentInput(e.target.value)}
                      placeholder="Filename e.g., lab_test_certificate.pdf"
                      className="flex-1 bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-neutral-900"
                    />
                    <button
                      type="button"
                      onClick={handleAddAttachment}
                      className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800"
                    >
                      Add File
                    </button>
                  </div>

                  {/* Attached files list */}
                  <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-200 divide-y divide-neutral-200 space-y-1">
                    {attachments.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between py-1.5 text-xs">
                        <div className="flex items-center gap-2 text-neutral-800">
                          <FileText className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{file}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(idx)}
                          className="text-neutral-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2 rounded-full border border-neutral-300 text-xs font-semibold hover:bg-neutral-100"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-2.5 rounded-full bg-neutral-950 text-white font-semibold text-xs transition-colors flex items-center gap-2"
                  >
                    <span>Next: Review & Submit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review and Submit */}
            {currentStep === 4 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500 font-mono">Service:</span>
                    <span className="font-bold text-neutral-950">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500 font-mono">Applicant:</span>
                    <span className="font-semibold text-neutral-950">{applicantName || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500 font-mono">Organization & Category:</span>
                    <span className="font-semibold text-neutral-950">{organization || 'General'} ({audienceType})</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500 font-mono">Target Date:</span>
                    <span className="font-semibold text-neutral-950">{requiredDate || 'Standard turnaround'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 font-mono">Attachments:</span>
                    <span className="font-semibold text-neutral-950">{attachments.length} files included</span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-500 leading-normal">
                  By clicking Submit, your request will be logged in the TCCI national registry. You will instantly receive an authenticated tracking number.
                </p>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2 rounded-full border border-neutral-300 text-xs font-semibold hover:bg-neutral-100"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-lg shadow-emerald-600/20"
                  >
                    Send Request & Get Tracking ID
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          /* Submission Success State */
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold">
                Request Registered Successfully
              </span>
              <h2 className="text-2xl font-bold font-serif text-neutral-950">
                Your TCCI Tracking Docket
              </h2>
            </div>

            {/* Generated Tracking ID Box */}
            <div className="max-w-xs mx-auto p-4 bg-neutral-950 text-white rounded-xl font-mono text-center space-y-1 shadow-md">
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">
                Tracking Number
              </span>
              <span className="text-2xl font-bold tracking-wider text-emerald-400 block">
                {createdDocketId}
              </span>
            </div>

            <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
              We have dispatched confirmation to your inbox. You can follow your multi-stage progress anytime directly in the <strong>Status timeline</strong>.
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(createdDocketId);
                  alert(`Copied ${createdDocketId} to clipboard!`);
                }}
                className="px-4 py-2 rounded-full border border-neutral-300 text-xs font-semibold hover:bg-neutral-100"
              >
                Copy Tracking Number
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-neutral-950 text-white text-xs font-semibold hover:bg-neutral-800"
              >
                Close & View Timeline
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
