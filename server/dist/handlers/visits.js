"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeVisitSlotAvailability = exports.deleteVisitSlot = exports.updateVisitSlot = exports.createVisitSlot = exports.listVisitSlots = exports.addVisitFeedback = exports.changeVisitStatus = exports.deleteVisit = exports.updateVisit = exports.createVisit = exports.getVisit = exports.listVisits = void 0;
const crypto_1 = require("crypto");
const db_1 = require("../db");
const utils_1 = require("./utils");
const logger_1 = require("../utils/logger");
const listVisits = async (req, res) => {
    const { property_id, buyer_id } = req.query;
    try {
        let sql = 'SELECT * FROM visits';
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
exports.listVisits = listVisits;
exports.getVisit = (0, utils_1.notImplemented)('get visit');
const createVisit = async (req, res) => {
    const { property_id, buyer_id, visit_date, visit_time, status } = req.body;
    if (!property_id || !buyer_id || !visit_date || !visit_time) {
        return res.status(400).json({ error: 'missing fields' });
    }
    try {
        const id = (0, crypto_1.randomUUID)();
        const { rows } = await (0, db_1.query)('INSERT INTO visits (id, property_id, buyer_id, visit_date, visit_time, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [id, property_id, buyer_id, visit_date, visit_time, status]);
        res.status(201).json(rows[0]);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createVisit = createVisit;
exports.updateVisit = (0, utils_1.notImplemented)('update visit');
exports.deleteVisit = (0, utils_1.notImplemented)('delete visit');
exports.changeVisitStatus = (0, utils_1.notImplemented)('change visit status');
exports.addVisitFeedback = (0, utils_1.notImplemented)('add visit feedback');
exports.listVisitSlots = (0, utils_1.notImplemented)('list visit slots');
exports.createVisitSlot = (0, utils_1.notImplemented)('create visit slot');
exports.updateVisitSlot = (0, utils_1.notImplemented)('update visit slot');
exports.deleteVisitSlot = (0, utils_1.notImplemented)('delete visit slot');
exports.changeVisitSlotAvailability = (0, utils_1.notImplemented)('change visit slot availability');
