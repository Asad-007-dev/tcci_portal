import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { INITIAL_SERVICES, INITIAL_REQUESTS, SERVICE_UPDATES, SUPPORT_EVENTS } from './src/data/mockData.ts';
import { ServiceRequestRecord } from './src/types.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // In-memory persistent state for requests
  let requestsStore: ServiceRequestRecord[] = [...INITIAL_REQUESTS];

  // ==========================================
  // BACKEND REST API ROUTES
  // ==========================================

  // 1. GET /api/services - Retrieve all services or filter by category/audience
  app.get('/api/services', (req: Request, res: Response) => {
    const { category, audience } = req.query;
    let filtered = INITIAL_SERVICES;

    if (category && typeof category === 'string' && category !== 'all') {
      filtered = filtered.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    if (audience && typeof audience === 'string') {
      filtered = filtered.filter(s => s.audience.includes(audience as any));
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  });

  // 2. GET /api/services/:id - Get details of a single service (all 7 standard criteria)
  app.get('/api/services/:id', (req: Request, res: Response) => {
    const service = INITIAL_SERVICES.find(s => s.id === req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found in catalogue.' });
    }
    res.json({ success: true, data: service });
  });

  // 3. POST /api/requests - Submit a new service request and generate tracking docket
  app.post('/api/requests', (req: Request, res: Response) => {
    const {
      serviceId,
      applicantName,
      email,
      organization,
      audienceType,
      description,
      requiredDate,
      attachments
    } = req.body;

    const matchedService = INITIAL_SERVICES.find(s => s.id === serviceId);
    const serviceName = matchedService ? matchedService.name : 'Custom Service Request';

    // Generate unique tracking number format: TCCI-2026-XXXX
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `TCCI-2026-${randomId}`;
    const today = new Date().toISOString().split('T')[0];

    const newDocket: ServiceRequestRecord = {
      trackingId,
      serviceId: serviceId || 'general',
      serviceName,
      applicantName: applicantName || 'Dr. Asadullah Sheikh',
      email: email || 'user@example.com',
      organization: organization || 'Academic Institution',
      audienceType: audienceType || 'Researchers',
      description: description || 'Official submission to TCCI counter.',
      requiredDate: requiredDate || today,
      submittedAt: new Date().toLocaleString(),
      status: 'Submitted',
      statusNote: 'Docket created. Initial verification underway.',
      assignedOfficer: 'Officer Pending Allocation',
      steps: [
        { title: 'Choose service', description: serviceName, completed: true, date: today },
        { title: 'Describe your need', description: 'Technical scope registered', completed: true, date: today },
        { title: 'Add attachments', description: `${attachments?.length || 0} files uploaded`, completed: true, date: today },
        { title: 'Submit & Verification', description: 'Intake compliance checks', completed: true, current: true, date: today },
        { title: 'In progress', description: 'Technical review and departmental processing', completed: false },
        { title: 'Completed', description: 'Official docket resolution and clearance', completed: false }
      ],
      attachments: attachments || []
    };

    requestsStore.unshift(newDocket);

    res.status(201).json({
      success: true,
      message: 'Request registered successfully.',
      trackingId: newDocket.trackingId,
      data: newDocket
    });
  });

  // 4. GET /api/track/:trackingId - Track status and milestones of a request
  app.get('/api/track/:trackingId', (req: Request, res: Response) => {
    const docket = requestsStore.find(
      r => r.trackingId.toLowerCase() === req.params.trackingId.trim().toLowerCase()
    );

    if (!docket) {
      return res.status(404).json({
        success: false,
        message: `Tracking docket "${req.params.trackingId}" not found in TCCI ledger.`
      });
    }

    res.json({
      success: true,
      data: docket
    });
  });

  // 5. GET /api/stats - Aggregated stats for the tracker metrics
  app.get('/api/stats', (req: Request, res: Response) => {
    res.json({
      openRequests: 1250 + requestsStore.filter(r => r.status === 'Submitted').length,
      inProgress: 840 + requestsStore.filter(r => r.status === 'In progress').length,
      completed: 3420 + requestsStore.filter(r => r.status === 'Completed').length,
      slaPercentage: '99.4%'
    });
  });

  // 6. POST /api/contact - Support inquiry submission
  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body;
    res.json({
      success: true,
      message: `Inquiry from ${name} received. Our service desk will contact ${email} shortly.`
    });
  });

  // ==========================================
  // VITE DEV MIDDLEWARE / STATIC ASSETS
  // ==========================================
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TCCI Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
