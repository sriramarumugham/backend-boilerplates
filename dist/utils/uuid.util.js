"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUUID = getUUID;
const uuid = require('uuid');
function getUUID() {
    return uuid.v4();
}
