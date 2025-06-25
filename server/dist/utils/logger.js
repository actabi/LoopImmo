"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.log = exports.isDebug = void 0;
const isDebug = () => process.env.DEBUG === 'true';
exports.isDebug = isDebug;
const log = (...args) => {
    if ((0, exports.isDebug)()) {
        // eslint-disable-next-line no-console
        console.log(...args);
    }
};
exports.log = log;
const error = (...args) => {
    if ((0, exports.isDebug)()) {
        // eslint-disable-next-line no-console
        console.error(...args);
    }
};
exports.error = error;
