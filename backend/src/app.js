
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { clerkMiddleware, getAuth } = require('@clerk/express');
const prisma = require('./prisma');
const gameRoutes = require('./routes/game.routes');

const app = express();

app.use(morgan('dev'));

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

app.get('/whoami', (req, res) => {
  const { userId, sessionId, sessionClaims } = getAuth(req);

  res.json({
    success: true,
    data: {
      userId,
      sessionId,
      hasClaims: !!sessionClaims
    }
  });
});

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      data: {
        status: 'ok',
        backend: 'connected',
        database: 'connected',
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('Health/database check failed:', err.message);

    res.status(503).json({
      success: false,
      data: {
        status: 'degraded',
        backend: 'connected',
        database: 'disconnected',
        timestamp: new Date().toISOString()
      },
      error: 'Backend ishlayapti, lekin database bilan aloqa yo‘q.'
    });
  }
});

app.use('/games', gameRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint topilmadi'
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      error: err.issues
    });
  }

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Serverda xatolik'
  });
});

module.exports = app;
