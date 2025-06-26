"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = exports.query = void 0;
const pg_1 = require("pg");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("./utils/logger");
// Load server-specific environment variables and log the result
const envPath = path_1.default.resolve(__dirname, '../.env');
const envResult = dotenv_1.default.config({ path: envPath });
if (envResult.error) {
    (0, logger_1.log)(`No .env file found at ${envPath}`);
}
else {
    (0, logger_1.log)(`Loaded environment variables from ${envPath}`);
}
// Configuration Pool optimisée pour OVH
const isDev = process.env.NODE_ENV === 'development';
// Allow disabling certificate validation when using self-signed certificates.
// Default to `false` so deployments like Railway can connect without needing
// an extra environment variable.
const sslConfig = {
    rejectUnauthorized: process.env.PG_REJECT_UNAUTHORIZED !== undefined
        ? process.env.PG_REJECT_UNAUTHORIZED !== 'false'
        : false,
};
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL?.split('?')[0], // URL propre sans paramètres
    ssl: sslConfig,
    // Paramètres valides pour PoolConfig
    max: 10, // Nombre max de connexions
    min: 2, // Nombre min de connexions maintenues
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000
});
const query = (text, params) => pool.query(text, params);
exports.query = query;
const connectDb = async () => {
    try {
        (0, logger_1.log)('Testing database connection with Pool...');
        // Test initial avec retry manuel
        let retries = 3;
        while (retries > 0) {
            try {
                const result = await pool.query('SELECT current_user, current_database(), NOW() as connected_at');
                (0, logger_1.log)('Database Pool connected successfully');
                (0, logger_1.log)('Connected as:', result.rows[0].current_user);
                (0, logger_1.log)('Database:', result.rows[0].current_database);
                (0, logger_1.log)('Connected at:', result.rows[0].connected_at);
                break;
            }
            catch (err) {
                retries--;
                if (retries === 0)
                    throw err;
                (0, logger_1.log)(`Connection attempt failed, retrying... (${retries} attempts left)`);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
    catch (err) {
        (0, logger_1.error)('Database Pool connection failed:', err);
        throw err;
    }
};
exports.connectDb = connectDb;
// Monitoring du pool (optionnel)
pool.on('connect', (client) => {
    (0, logger_1.log)('New pool client connected');
});
pool.on('error', (err, client) => {
    (0, logger_1.error)('Pool client error:', err);
});
// Gérer proprement la fermeture
process.on('SIGINT', async () => {
    (0, logger_1.log)('Closing database pool...');
    await pool.end();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    (0, logger_1.log)('Closing database pool...');
    await pool.end();
    process.exit(0);
});
