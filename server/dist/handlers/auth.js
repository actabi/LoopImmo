"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.refreshToken = exports.logout = exports.register = exports.login = void 0;
const crypto_1 = require("crypto");
const db_1 = require("../db");
const utils_1 = require("./utils");
const logger_1 = require("../utils/logger");
const login = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'email required' });
    }
    try {
        const { rows } = await (0, db_1.query)('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.json({ token: 'dummy-token', user: rows[0] });
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.login = login;
const register = async (req, res) => {
    const { email, first_name, last_name, roles = [], referredBy } = req.body;
    if (!email || !first_name || !last_name) {
        return res.status(400).json({ error: 'missing fields' });
    }
    try {
        const id = (0, crypto_1.randomUUID)();
        const referralCode = Math.random().toString(36).slice(2, 8).toUpperCase();
        const { rows } = await (0, db_1.query)('INSERT INTO users (id, email, first_name, last_name, roles, phone, avatar, referral_code, referred_by, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW()) RETURNING *', [
            id,
            email,
            first_name,
            last_name,
            roles,
            null,
            null,
            referralCode,
            referredBy || null,
        ]);
        res.status(201).json(rows[0]);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.register = register;
exports.logout = (0, utils_1.notImplemented)('logout');
exports.refreshToken = (0, utils_1.notImplemented)('refresh token');
exports.forgotPassword = (0, utils_1.notImplemented)('forgot password');
exports.resetPassword = (0, utils_1.notImplemented)('reset password');
