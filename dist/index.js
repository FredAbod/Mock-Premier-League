"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./database/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const admin_Routes_1 = __importDefault(require("./routes/admin.Routes"));
const user_Routes_1 = __importDefault(require("./routes/user.Routes"));
const team_Routes_1 = __importDefault(require("./routes/team.Routes"));
const fixtures_Routes_1 = __importDefault(require("./routes/fixtures.Routes"));
// Load environment variables from .env file
dotenv_1.default.config();
// Create Express application
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Session middleware with Redis store
app.use((0, express_session_1.default)({
    store: new (require('express-session').MemoryStore)(), // Use MemoryStore as session store
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 3600000, // Session duration in milliseconds
    },
}));
// Middleware
app.use(express_1.default.json());
// Morgan logging middleware
app.use((0, morgan_1.default)('dev'));
// Rate limiting middleware
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
// Routes
app.use('/api/admin', admin_Routes_1.default);
app.use('/api/user', user_Routes_1.default);
app.use('/api/team', team_Routes_1.default);
app.use('/api/fixture', fixtures_Routes_1.default);
// Default route
app.get('/', (req, res) => {
    res.send('Home Page!!');
});
// Connect to MongoDB
(0, db_1.default)();
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
