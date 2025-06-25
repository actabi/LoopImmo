"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemStats = exports.updateSystemConfig = exports.getSystemConfig = exports.deletePriceTier = exports.updatePriceTier = exports.createPriceTier = exports.listPriceTiers = void 0;
const db_1 = require("../db");
const utils_1 = require("./utils");
const logger_1 = require("../utils/logger");
const listPriceTiers = async (_req, res) => {
    try {
        const { rows } = await (0, db_1.query)('SELECT * FROM price_tiers');
        res.json(rows);
    }
    catch (err) {
        (0, logger_1.error)(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.listPriceTiers = listPriceTiers;
exports.createPriceTier = (0, utils_1.notImplemented)('create price tier');
exports.updatePriceTier = (0, utils_1.notImplemented)('update price tier');
exports.deletePriceTier = (0, utils_1.notImplemented)('delete price tier');
exports.getSystemConfig = (0, utils_1.notImplemented)('get system config');
exports.updateSystemConfig = (0, utils_1.notImplemented)('update system config');
exports.getSystemStats = (0, utils_1.notImplemented)('get system stats');
