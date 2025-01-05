"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_util_1 = require("../../../../utils/auth.util");
const admin_request_schema_1 = require("../../../../domain/admin/admin.request-schema");
const admin_usecase_1 = require("../../../../domain/admin/admin.usecase");
const response_1 = require("../../../../utils/response");
const AdminRoutes = async (fastify) => {
    fastify
        .withTypeProvider()
        .post('/signup', { schema: admin_request_schema_1.createAdminRequestSchema }, async (req, res) => {
        try {
            const admin = await (0, admin_usecase_1.createAdminUseCase)(req.body);
            (0, response_1.createSuccessResponse)(res, 'Admin Created!', admin, 201);
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    })
        .post('/sub-admin', { schema: admin_request_schema_1.createSubadminRequestSchema }, async (req, res) => {
        try {
            const { userId } = (0, auth_util_1.getUserIdFromRequestHeader)(req);
            const subadmin = await (0, admin_usecase_1.createSubadminUseCase)(req.body, userId, res);
            (0, response_1.createSuccessResponse)(res, 'Subadmin Created!', subadmin, 201);
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    });
};
exports.default = AdminRoutes;
