"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFavoriteProperties = exports.getUserSavedSearches = exports.getUserProperties = exports.deleteUser = exports.updateUser = exports.getUser = exports.listUsers = void 0;
const db_1 = require("../db");
const utils_1 = require("./utils");
const logger_1 = require("../utils/logger");
const listUsers = async (_req, res) => {
    try {
        const { rows } = await (0, db_1.query)('SELECT * FROM users');
        res.json(rows);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.listUsers = listUsers;
const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await (0, db_1.query)('SELECT * FROM users WHERE id = $1', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
        }
        else {
            res.json(rows[0]);
        }
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, phone } = req.body;
    try {
        const { rows } = await (0, db_1.query)('UPDATE users SET first_name = $1, last_name = $2, phone = $3 WHERE id = $4 RETURNING *', [first_name, last_name, phone, id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
        }
        else {
            res.json(rows[0]);
        }
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount } = await (0, db_1.query)('DELETE FROM users WHERE id = $1', [id]);
        if (rowCount === 0) {
            res.status(404).json({ error: 'User not found' });
        }
        else {
            res.status(204).end();
        }
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteUser = deleteUser;
const getUserProperties = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await (0, db_1.query)('SELECT * FROM properties WHERE seller_id = $1', [id]);
        res.json(rows);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserProperties = getUserProperties;
exports.getUserSavedSearches = (0, utils_1.notImplemented)('get user saved searches');
exports.getUserFavoriteProperties = (0, utils_1.notImplemented)('get user favorite properties');
