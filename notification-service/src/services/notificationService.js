const { MongoClient } = require('mongodb');

class NotificationService {
  constructor() {
    this.mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    this.dbName = process.env.DATABASE_NAME || 'goldenlink';
    this.client = null;
    this.db = null;
    this.inMemoryStore = [];
    this.initDatabase();
  }

  async initDatabase() {
    try {
      this.client = new MongoClient(this.mongoUri, { serverSelectionTimeoutMS: 2000 });
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log(`[NotificationService] Connected to MongoDB at ${this.mongoUri}`);
    } catch (err) {
      console.warn(`[NotificationService] MongoDB connection unavailable (${err.message}). Using In-Memory dispatch store for demo mode.`);
      this.db = null;
    }
  }

  async dispatchEmergency(data) {
    const { incidentId, severity, accidentType, location, victims, recipients } = data;
    const defaultRecipients = [
      '112 Emergency Control',
      '108 Ambulance',
      '100 Police',
      'Nearby Responders'
    ];
    const targetRecipients = recipients && recipients.length > 0 ? recipients : defaultRecipients;
    const now = new Date().toISOString();

    const notifications = targetRecipients.map(recipient => {
      let msg = `[SIMULATED] GoldenLink Alert: ${severity ? severity.toUpperCase() : 'URGENT'} accident reported at #${incidentId}.`;
      if (recipient.includes('112')) {
        msg = `[SIMULATED] 112 Command Dispatch: Incident #${incidentId} (${accidentType || 'Accident'}) registered. Coordinating police & emergency services.`;
      } else if (recipient.includes('108')) {
        msg = `[SIMULATED] 108 Emergency Ambulance Unit: Dispatched to Incident #${incidentId}. ETA 6 mins.`;
      } else if (recipient.includes('100')) {
        msg = `[SIMULATED] 100 Police Control Room: Traffic perimeter & scene management dispatched for #${incidentId}.`;
      } else {
        msg = `[SIMULATED] Community Responders: Immediate assistance requested for #${incidentId}.`;
      }

      return {
        incidentId,
        recipient,
        notificationType: (severity === 'critical' || severity === 'serious') ? 'CRITICAL_DISPATCH_ALERT' : 'STANDARD_ALERT',
        timestamp: now,
        status: 'DELIVERED',
        SIMULATED: true,
        message: msg,
        channels: ['RADIO_SIMULATED', 'DASHBOARD_ALERT', 'MOBILE_PUSH']
      };
    });

    // Save to DB or in-memory
    if (this.db) {
      try {
        await this.db.collection('notifications').insertMany(notifications);
      } catch (e) {
        console.error('[NotificationService] Failed to insert notifications to Mongo:', e);
      }
    } else {
      this.inMemoryStore.push(...notifications);
    }

    console.log(`[NotificationService] Dispatched ${notifications.length} SIMULATED events for incident #${incidentId}`);
    return {
      success: true,
      dispatchId: `DISP-${incidentId}-${Date.now()}`,
      incidentId,
      notifications,
      simulatedNotice: 'NATIONAL DEMO SAFETY: All dispatches are strictly SIMULATED. No actual telephone calls made.'
    };
  }

  async getHistory(incidentId) {
    if (this.db) {
      return await this.db.collection('notifications').find({ incidentId }).toArray();
    }
    return this.inMemoryStore.filter(n => n.incidentId === incidentId);
  }
}

module.exports = new NotificationService();
