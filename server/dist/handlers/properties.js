"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePropertyFeature = exports.addPropertyFeatures = exports.deletePropertyPhoto = exports.addPropertyPhotos = exports.getPropertyVisitSlots = exports.changePropertyStatus = exports.getPropertyStats = exports.deleteProperty = exports.updateProperty = exports.createProperty = exports.getProperty = exports.listProperties = void 0;
const crypto_1 = require("crypto");
const db_1 = require("../db");
const utils_1 = require("./utils");
const logger_1 = require("../utils/logger");
const listProperties = async (_req, res) => {
    try {
        const { rows } = await (0, db_1.query)('SELECT * FROM properties');
        res.json(rows);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.listProperties = listProperties;
const getProperty = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await (0, db_1.query)(`SELECT p.*, u.first_name AS seller_first_name, u.last_name AS seller_last_name,
              a.id AS ambassador_id, a.bio AS ambassador_bio
       FROM properties p
       LEFT JOIN users u ON p.seller_id = u.id
       LEFT JOIN ambassadors a ON p.ambassador_id = a.id
       WHERE p.id = $1`, [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Property not found' });
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
exports.getProperty = getProperty;
const createProperty = async (req, res) => {
    const { title, price, type, status, seller_id } = req.body;
    if (!title || !price || !type || !status) {
        return res.status(400).json({ error: 'missing fields' });
    }
    try {
        const id = (0, crypto_1.randomUUID)();
        const { rows } = await (0, db_1.query)('INSERT INTO properties (id, title, price, type, status, seller_id, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,NOW(),NOW()) RETURNING *', [id, title, price, type, status, seller_id]);
        res.status(201).json(rows[0]);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createProperty = createProperty;
const updateProperty = async (req, res) => {
    const { id } = req.params;
    const { title, price, status } = req.body;
    try {
        const { rows } = await (0, db_1.query)('UPDATE properties SET title = $1, price = $2, status = $3, updated_at = NOW() WHERE id = $4 RETURNING *', [title, price, status, id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Property not found' });
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
exports.updateProperty = updateProperty;
const deleteProperty = async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount } = await (0, db_1.query)('DELETE FROM properties WHERE id = $1', [id]);
        if (rowCount === 0) {
            res.status(404).json({ error: 'Property not found' });
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
exports.deleteProperty = deleteProperty;
exports.getPropertyStats = (0, utils_1.notImplemented)('get property stats');
exports.changePropertyStatus = (0, utils_1.notImplemented)('change property status');
exports.getPropertyVisitSlots = (0, utils_1.notImplemented)('get property visit slots');
exports.addPropertyPhotos = (0, utils_1.notImplemented)('add property photos');
exports.deletePropertyPhoto = (0, utils_1.notImplemented)('delete property photo');
exports.addPropertyFeatures = (0, utils_1.notImplemented)('add property features');
exports.deletePropertyFeature = (0, utils_1.notImplemented)('delete property feature');
