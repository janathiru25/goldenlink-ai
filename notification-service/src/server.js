require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dispatchRoutes = require('./routes/dispatch');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Mount dispatch routes
app.use('/notifications', dispatchRoutes);

app.get('/', (req, res) => {
  res.json({
    service: 'GoldenLink Notification Microservice',
    status: 'online',
    port: PORT,
    simulated: true,
    notice: 'NATIONAL DEMO SAFETY: All 112/108/100 dispatches are strictly SIMULATED.'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'notification-service',
    port: PORT,
    simulated: true
  });
});

app.listen(PORT, () => {
  console.log(`[GoldenLink Notification Service] Running on port ${PORT} (SIMULATED DEMO DISPATCH ACTIVE)`);
});
