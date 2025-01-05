"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminDocument = exports.AdminResponseDocument = exports.AdminDocument = exports.E_ROLE = void 0;
const typebox_1 = require("@sinclair/typebox");
var E_ROLE;
(function (E_ROLE) {
    E_ROLE["ADMIN"] = "ADMIN";
    E_ROLE["SUB_ADMIN"] = "SUB_ADMIN";
})(E_ROLE || (exports.E_ROLE = E_ROLE = {}));
exports.AdminDocument = typebox_1.Type.Object({
    adminId: typebox_1.Type.Optional(typebox_1.Type.String()),
    fullName: typebox_1.Type.String(),
    email: typebox_1.Type.String(),
    phoneNumber: typebox_1.Type.String(),
    countryCode: typebox_1.Type.String(),
    country: typebox_1.Type.String(),
    password: typebox_1.Type.String(),
    role: typebox_1.Type.Enum(E_ROLE),
    createdBy: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()])),
    referralCode: typebox_1.Type.Optional(typebox_1.Type.String()),
});
exports.AdminResponseDocument = typebox_1.Type.Omit(exports.AdminDocument, ['password']);
exports.createAdminDocument = typebox_1.Type.Omit(exports.AdminDocument, [
    'createdBy',
    'role',
    'adminId',
    'referralCode',
]);
