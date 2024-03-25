import express from 'express';
import morgan from 'morgan';
import connectDB from './database/db';
import dotenv from 'dotenv';
import session from 'express-session';
import redis from 'redis';
import rateLimit from 'express-rate-limit';
import adminRoutes from './routes/admin.Routes';
import userRoutes from './routes/user.Routes';
import teamRoutes from './routes/team.Routes';
import fixtureRoutes from './routes/fixtures.Routes';

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000;


// Session middleware with Redis store
app.use(
  session({
    store: new (require('express-session').MemoryStore)(), // Use MemoryStore as session store
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000, // Session duration in milliseconds
    },
  })
);

// Middleware
app.use(express.json());

// Morgan logging middleware
app.use(morgan('dev'));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/fixture', fixtureRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Home Page!!');
});

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
