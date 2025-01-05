"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReferredUserDocument = exports.referralCodeType = exports.ReferredUserDocument = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.ReferredUserDocument = typebox_1.Type.Object({
    referralCode: typebox_1.Type.String(),
    userId: typebox_1.Type.String(),
    referredBy: typebox_1.Type.String(),
});
exports.referralCodeType = typebox_1.Type.Pick(exports.ReferredUserDocument, [
    'referralCode',
]);
exports.createReferredUserDocument = typebox_1.Type.Optional(exports.referralCodeType);
