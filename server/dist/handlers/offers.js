"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterOffer = exports.changeOfferStatus = exports.deleteOffer = exports.updateOffer = exports.createOffer = exports.getOffer = exports.listOffers = void 0;
const crypto_1 = require("crypto");
const db_1 = require("../db");
const utils_1 = require("./utils");
const logger_1 = require("../utils/logger");
const listOffers = async (req, res) => {
    const { property_id, buyer_id } = req.query;
    try {
        let sql = 'SELECT * FROM offers';
        const params = [];
        if (property_id) {
            params.push(property_id);
            sql += ` WHERE property_id = $${params.length}`;
        }
        if (buyer_id) {
            params.push(buyer_id);
            sql += params.length === 1 ? ` WHERE buyer_id = $${params.length}` : ` AND buyer_id = $${params.length}`;
        }
        const { rows } = await (0, db_1.query)(sql, params);
        res.json(rows);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.listOffers = listOffers;
exports.getOffer = (0, utils_1.notImplemented)('get offer');
const createOffer = async (req, res) => {
    const { property_id, buyer_id, amount, status, message } = req.body;
    if (!property_id || !buyer_id || !amount) {
        return res.status(400).json({ error: 'missing fields' });
    }
    try {
        const id = (0, crypto_1.randomUUID)();
        const { rows } = await (0, db_1.query)('INSERT INTO offers (id, property_id, buyer_id, amount, status, message, created_at) VALUES ($1,$2,$3,$4,$5,$6,NOW()) RETURNING *', [id, property_id, buyer_id, amount, status, message]);
        res.status(201).json(rows[0]);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createOffer = createOffer;
exports.updateOffer = (0, utils_1.notImplemented)('update offer');
exports.deleteOffer = (0, utils_1.notImplemented)('delete offer');
exports.changeOfferStatus = (0, utils_1.notImplemented)('change offer status');
exports.counterOffer = (0, utils_1.notImplemented)('counter offer');
