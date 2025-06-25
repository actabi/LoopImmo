"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceProposal = exports.changeServiceProposalStatus = exports.createServiceProposal = exports.getServiceProposal = exports.listServiceProposals = exports.getServiceProviderPortfolio = exports.deleteServiceProvider = exports.updateServiceProvider = exports.createServiceProvider = exports.getServiceProvider = exports.listServiceProviders = void 0;
const crypto_1 = require("crypto");
const db_1 = require("../db");
const utils_1 = require("./utils");
const logger_1 = require("../utils/logger");
const listServiceProviders = async (_req, res) => {
    try {
        const { rows } = await (0, db_1.query)('SELECT * FROM service_providers');
        res.json(rows);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.listServiceProviders = listServiceProviders;
const getServiceProvider = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await (0, db_1.query)('SELECT * FROM service_providers WHERE id = $1', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Service provider not found' });
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
exports.getServiceProvider = getServiceProvider;
exports.createServiceProvider = (0, utils_1.notImplemented)('create service provider');
exports.updateServiceProvider = (0, utils_1.notImplemented)('update service provider');
exports.deleteServiceProvider = (0, utils_1.notImplemented)('delete service provider');
exports.getServiceProviderPortfolio = (0, utils_1.notImplemented)('get service provider portfolio');
const listServiceProposals = async (_req, res) => {
    try {
        const { rows } = await (0, db_1.query)('SELECT * FROM service_proposals');
        res.json(rows);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.listServiceProposals = listServiceProposals;
exports.getServiceProposal = (0, utils_1.notImplemented)('get service proposal');
const createServiceProposal = async (req, res) => {
    const { property_id, provider_id, status, proposed_date, message, custom_price } = req.body;
    if (!property_id || !provider_id) {
        return res.status(400).json({ error: 'missing fields' });
    }
    try {
        const id = (0, crypto_1.randomUUID)();
        const { rows } = await (0, db_1.query)('INSERT INTO service_proposals (id, property_id, provider_id, status, proposed_date, message, created_at, custom_price) VALUES ($1,$2,$3,$4,$5,$6,NOW(),$7) RETURNING *', [id, property_id, provider_id, status, proposed_date, message, custom_price]);
        res.status(201).json(rows[0]);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createServiceProposal = createServiceProposal;
exports.changeServiceProposalStatus = (0, utils_1.notImplemented)('change service proposal status');
exports.updateServiceProposal = (0, utils_1.notImplemented)('update service proposal');
