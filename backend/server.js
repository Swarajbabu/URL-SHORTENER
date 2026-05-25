import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import client from 'prom-client';

// Import Routes
import urlRoutes from './routes/urlRoutes.js';
import redirectRoutes from './routes/redirectRoutes.js';

dotenv.config();

const app = express();

// ─── Prometheus Metrics Setup ─────────────────────────────────
const register = new client.Registry();

// Collect default Node.js metrics (CPU, memory, event loop, etc.)
client.collectDefaultMetrics({ register });

// Custom: HTTP request counter
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

// Custom: HTTP request duration histogram
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'status'],
  buckets: [10, 50, 100, 200, 300, 500, 1000, 2000],
  registers: [register],
});

// Custom: URLs shortened counter
const urlsShortenedTotal = new client.Counter({
  name: 'urls_shortened_total',
  help: 'Total number of URLs shortened',
  registers: [register],
});

// Export the custom counter so routes can use it
export { urlsShortenedTotal };

// ─── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ extended: false }));

// Middleware to track every request's duration and count
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const route = req.route?.path || req.path;
    httpRequestCounter.labels(req.method, route, res.statusCode).inc();
    httpRequestDuration.labels(req.method, route, res.statusCode).observe(duration);
  });
  next();
});

// ─── Connect to MongoDB ─────────────────────────────────────────
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// ─── Health Check Endpoint (used by K8s probes) ────────────────
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  // 1 = connected
  if (dbState === 1) {
    res.status(200).json({ status: 'OK', db: 'connected' });
  } else {
    res.status(503).json({ status: 'ERROR', db: 'disconnected' });
  }
});

// ─── Prometheus Metrics Endpoint ────────────────────────────────
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// ─── API Routes ─────────────────────────────────────────────────
app.use('/api/url', urlRoutes);

// ─── Redirect Route ─────────────────────────────────────────────
app.use('/', redirectRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
