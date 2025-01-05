"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReferralCode = generateReferralCode;
function generateReferralCode(base) {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generates a random alphanumeric string
    return `${base}-${randomPart}`;
}
