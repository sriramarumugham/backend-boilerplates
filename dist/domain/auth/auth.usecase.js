"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUseCase = void 0;
const admin_repo_1 = require("../../data-access/admin.repo");
const auth_util_1 = require("../../utils/auth.util");
const bycrypt_util_1 = require("../../utils/bycrypt.util");
const response_1 = require("../../utils/response");
const loginUseCase = async (body, res) => {
    const admin = await (0, admin_repo_1.getAdminByEmailRepo)(body?.email);
    if (!admin)
        return (0, response_1.createErrorResponse)(res, 'Invalid credentials', 401);
    const isPasswordValid = await (0, bycrypt_util_1.comparePassword)(body?.password, admin.password);
    if (!isPasswordValid) {
        return (0, response_1.createErrorResponse)(res, 'Invalid credentials', 401);
    }
    const token = (0, auth_util_1.signToken)(admin.adminId);
    return token;
};
exports.loginUseCase = loginUseCase;
