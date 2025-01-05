"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.getAdminByAdminId = exports.getAdminByEmailRepo = exports.createAdminRepo = void 0;
const admin_type_1 = require("../types/admin.type");
const admin_schema_1 = __importDefault(require("./models/admin.schema"));
const createAdminRepo = async (adminData) => {
    return await admin_schema_1.default.create(adminData);
};
exports.createAdminRepo = createAdminRepo;
const getAdminByEmailRepo = async (email) => {
    const admin = await admin_schema_1.default.findOne({ email });
    return admin ? admin.toObject() : null;
};
exports.getAdminByEmailRepo = getAdminByEmailRepo;
const getAdminByAdminId = async (adminId) => {
    return await admin_schema_1.default.findOne({ adminId: adminId });
};
exports.getAdminByAdminId = getAdminByAdminId;
const isAdmin = async (adminId) => {
    const admin = await admin_schema_1.default.findOne({ adminId });
    return admin?.role === admin_type_1.E_ROLE.ADMIN;
};
exports.isAdmin = isAdmin;
