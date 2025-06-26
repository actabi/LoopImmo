"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const Sentry = __importStar(require("@sentry/node"));
const db_1 = require("./db");
const handlers_1 = require("./handlers");
const logger_1 = require("./utils/logger");
const allowedOrigin = process.env.FRONTEND_URL;
if (!allowedOrigin) {
    (0, logger_1.error)('FRONTEND_URL environment variable is not defined');
    process.exit(1);
}
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
});
// RequestHandler must be the first middleware
app.use(Sentry.Handlers.requestHandler());
app.use((0, cors_1.default)({ origin: allowedOrigin }));
app.use((0, helmet_1.default)());
const limiter = (0, express_rate_limit_1.default)({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);
app.use(express_1.default.json({ limit: '10kb' }));
app.get('/api/users', async (_req, res) => {
    try {
        const { rows } = await (0, db_1.query)('SELECT * FROM users');
        res.json(rows);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/api/properties', async (_req, res) => {
    try {
        const { rows } = await (0, db_1.query)('SELECT * FROM properties');
        res.json(rows);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/api/subscribe', handlers_1.subscribeNewsletter);
app.post('/api/register', handlers_1.register);
app.get('/', (_req, res) => {
    res.send('Hello LoopImmo !');
});
// Test route to verify Sentry configuration
app.get('/debug-sentry', (_req, _res) => {
    throw new Error('Test Sentry error');
});
// Error handler must come after routes
app.use(Sentry.Handlers.errorHandler());
(0, db_1.connectDb)()
    .then(() => {
    app.listen(port, () => {
        (0, logger_1.log)(`Server listening on port ${port}`);
    });
})
    .catch((err) => {
    (0, logger_1.error)('Failed to start server due to database error', err);
    process.exit(1);
});
