const express = require('express');
const router = express.Router();
const notificationService = require('../services/notificationService');

router.post('/dispatch', async (req, res) => {
  try {
    const { incidentId, severity, accidentType, location, victims, recipients } = req.body;
    if (!incidentId) {
      return res.status(400).json({ error: 'incidentId is required.' });
    }

    const result = await notificationService.dispatchEmergency({
      incidentId,
      severity,
      accidentType,
      location,
      victims,
      recipients
    });
    return res.status(200).json(result);
  } catch (err) {
    console.error('[dispatch.js] Error handling dispatch:', err);
    return res.status(500).json({ error: 'Internal dispatch error', details: err.message });
  }
});

router.get('/history/:incidentId', async (req, res) => {
  try {
    const { incidentId } = req.params;
    const history = await notificationService.getHistory(incidentId);
    return res.status(200).json({ incidentId, notifications: history });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
