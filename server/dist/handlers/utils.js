"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notImplemented = void 0;
const notImplemented = (name) => (req, res) => {
    res.status(501).json({ error: `${name} not implemented` });
};
exports.notImplemented = notImplemented;
