export type AudienceType = 
  | 'Researchers' 
  | 'Universities' 
  | 'ORICs' 
  | 'Startups' 
  | 'Companies' 
  | 'Investors' 
  | 'Government' 
  | 'Students';

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  purpose: string;
  audience: AudienceType[];
  eligibility: string;
  benefits: string[];
  processSteps: string[];
  requiredDocuments: string[];
  estimatedTurnaround: string;
  isPopular?: boolean;
  image?: string;
}

export type TrackingStatus = 'Submitted' | 'In progress' | 'Completed';

export interface TrackingStep {
  title: string;
  description: string;
  date?: string;
  completed: boolean;
  current?: boolean;
}

export interface ServiceRequestRecord {
  trackingId: string;
  serviceId: string;
  serviceName: string;
  applicantName: string;
  email: string;
  organization: string;
  audienceType: AudienceType;
  description: string;
  requiredDate: string;
  submittedAt: string;
  status: TrackingStatus;
  statusNote: string;
  assignedOfficer: string;
  steps: TrackingStep[];
  attachments: string[];
}

export interface UpdateItem {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
}

export interface SupportEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}
