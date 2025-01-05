"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubadminUseCase = exports.createAdminUseCase = void 0;
const types_1 = require("../../types");
const random_util_1 = require("../../utils/random.util");
const response_1 = require("../../utils/response");
const admin_repo_1 = require("../../data-access/admin.repo");
const bycrypt_util_1 = require("../../utils/bycrypt.util");
const createAdminUseCase = async (adminData) => {
    const hashedPassword = await (0, bycrypt_util_1.hashPassword)(adminData.password);
    const payload = {
        ...adminData,
        role: types_1.E_ROLE.ADMIN,
        createdBy: null,
        referralCode: 'CAYBIA_ADMIN',
        password: hashedPassword,
    };
    return await (0, admin_repo_1.createAdminRepo)(payload);
};
exports.createAdminUseCase = createAdminUseCase;
const createSubadminUseCase = async (subAdminData, createdBy, reply) => {
    const admin = await (0, admin_repo_1.getAdminByAdminId)(createdBy);
    if (!admin) {
        return (0, response_1.createErrorResponse)(reply, 'User has to be a admin to create a subadmin', 401);
    }
    if (admin.role != types_1.E_ROLE.ADMIN) {
        return (0, response_1.createErrorResponse)(reply, 'Only admin can create a subadmin', 401);
    }
    const hashedPassword = await (0, bycrypt_util_1.hashPassword)(subAdminData.password);
    const subAdminPayload = {
        ...subAdminData,
        role: types_1.E_ROLE.SUB_ADMIN,
        createdBy: createdBy,
        referralCode: (0, random_util_1.generateReferralCode)(subAdminData.fullName),
        password: hashedPassword,
    };
    return await (0, admin_repo_1.createAdminRepo)(subAdminPayload);
};
exports.createSubadminUseCase = createSubadminUseCase;
