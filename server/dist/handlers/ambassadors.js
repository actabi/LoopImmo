"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReferralNotes = exports.convertReferral = exports.acceptReferral = exports.changeReferralStatus = exports.createReferral = exports.getReferral = exports.listReferrals = exports.getAmbassadorCommissions = exports.getAmbassadorStats = exports.getAmbassadorProperties = exports.updateAmbassador = exports.createAmbassador = exports.getAmbassador = exports.listAmbassadors = void 0;
const crypto_1 = require("crypto");
const db_1 = require("../db");
const utils_1 = require("./utils");
const logger_1 = require("../utils/logger");
const listAmbassadors = async (_req, res) => {
    try {
        const { rows } = await (0, db_1.query)('SELECT * FROM ambassadors');
        res.json(rows);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.listAmbassadors = listAmbassadors;
const getAmbassador = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await (0, db_1.query)('SELECT * FROM ambassadors WHERE id = $1', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Ambassador not found' });
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
exports.getAmbassador = getAmbassador;
const createAmbassador = async (req, res) => {
    const { user_id, zone, commission, bio } = req.body;
    if (!user_id) {
        return res.status(400).json({ error: 'user_id required' });
    }
    try {
        const id = (0, crypto_1.randomUUID)();
        const { rows } = await (0, db_1.query)('INSERT INTO ambassadors (id, user_id, zone, commission, bio) VALUES ($1,$2,$3,$4,$5) RETURNING *', [id, user_id, zone, commission, bio]);
        res.status(201).json(rows[0]);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createAmbassador = createAmbassador;
exports.updateAmbassador = (0, utils_1.notImplemented)('update ambassador');
exports.getAmbassadorProperties = (0, utils_1.notImplemented)('get ambassador properties');
exports.getAmbassadorStats = (0, utils_1.notImplemented)('get ambassador stats');
exports.getAmbassadorCommissions = (0, utils_1.notImplemented)('get ambassador commissions');
exports.listReferrals = (0, utils_1.notImplemented)('list referrals');
exports.getReferral = (0, utils_1.notImplemented)('get referral');
exports.createReferral = (0, utils_1.notImplemented)('create referral');
exports.changeReferralStatus = (0, utils_1.notImplemented)('change referral status');
exports.acceptReferral = (0, utils_1.notImplemented)('accept referral');
exports.convertReferral = (0, utils_1.notImplemented)('convert referral');
exports.addReferralNotes = (0, utils_1.notImplemented)('add referral notes');
