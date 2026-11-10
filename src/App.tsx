import React, { useState } from 'react';
import { INITIAL_SERVICES, INITIAL_REQUESTS } from './data/mockData';
import { ServiceItem, ServiceRequestRecord } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCatalogue } from './components/ServiceCatalogue';
import { HowItWorks } from './components/HowItWorks';
import { PopularServices } from './components/PopularServices';
import { RequestTrackerSection } from './components/RequestTrackerSection';
import { WhoUsesServices } from './components/WhoUsesServices';
import { ServiceUpdatesAndSupport } from './components/ServiceUpdatesAndSupport';
import { Footer } from './components/Footer';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { RequestServiceModal } from './components/RequestServiceModal';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [requests, setRequests] = useState<ServiceRequestRecord[]>(INITIAL_REQUESTS);
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);

  // Modals state
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Navigation helper
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenRequest = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setRequestModalOpen(true);
  };

  const handleOpenTrack = (trackingId?: string) => {
    handleNavigateSection('track');
  };

  const handleSuccessNewRequest = (newRecord: ServiceRequestRecord) => {
    setRequests([newRecord, ...requests]);
  };

  // Filtered services based on search query
  const displayedServices = services.filter((srv) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      srv.name.toLowerCase().includes(q) ||
      srv.purpose.toLowerCase().includes(q) ||
      srv.category.toLowerCase().includes(q) ||
      srv.audience.some((aud) => aud.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased flex flex-col selection:bg-neutral-900 selection:text-white">
      
      {/* 1. Header / Navbar */}
      <Navbar
        onOpenRequestModal={handleOpenRequest}
        onOpenTrackModal={handleOpenTrack}
        onOpenContactModal={() => setContactModalOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* 2. Hero Section: SERVICE CATALOGUE AND REQUEST PORTAL, Headline, Search, Request Flow */}
        <Hero
          onSearch={(query) => {
            setSearchQuery(query);
            // If user searched, scroll down to catalogue
            if (query.trim()) {
              handleNavigateSection('services');
            }
          }}
          onRequestClick={() => handleOpenRequest()}
          onTrackClick={() => handleOpenTrack()}
        />

        {/* 3. Service Catalogue & "Every service page shows" */}
        <ServiceCatalogue
          services={displayedServices}
          selectedAudience={selectedAudience}
          onSelectAudience={setSelectedAudience}
          onOpenServiceDetail={(srv) => setSelectedServiceDetail(srv)}
          onRequestService={(srvId) => handleOpenRequest(srvId)}
        />

        {/* 4. How a request works (6 Steps) */}
        <HowItWorks
          onRequestClick={() => handleOpenRequest()}
        />

        {/* 5. Popular services (3 Image Cards) */}
        <PopularServices
          services={services}
          onRequestService={(srvId) => handleOpenRequest(srvId)}
          onOpenServiceDetail={(srv) => setSelectedServiceDetail(srv)}
        />

        {/* 6. Request tracking stats & Status timeline */}
        <RequestTrackerSection
          requests={requests}
          onOpenTrackModal={handleOpenTrack}
        />

        {/* 7. Who uses services (Audience Cards) */}
        <WhoUsesServices
          selectedAudience={selectedAudience}
          onSelectAudience={setSelectedAudience}
          onViewAllClick={() => handleNavigateSection('services')}
        />

        {/* 8. Service updates & Support (Two-column headlines) */}
        <ServiceUpdatesAndSupport
          onOpenContactModal={() => setContactModalOpen(true)}
        />
      </main>

      {/* 9. Footer: [T] TCCI, Services, Requests, Support columns */}
      <Footer
        onOpenRequestModal={handleOpenRequest}
        onOpenTrackModal={handleOpenTrack}
        onOpenContactModal={() => setContactModalOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Interactive Modals */}
      <ServiceDetailModal
        service={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        onRequestService={(srvId) => handleOpenRequest(srvId)}
      />

      <RequestServiceModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        services={services}
        preselectedServiceId={preselectedServiceId}
        onSuccessSubmit={handleSuccessNewRequest}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

    </div>
  );
}
