"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.route.ts
const auth_request_schema_1 = require("../../../../domain/auth/auth.request.schema");
const auth_usecase_1 = require("../../../../domain/auth/auth.usecase");
const user_request_schema_1 = require("../../../../domain/user/user.request.schema");
const user_usecase_1 = require("../../../../domain/user/user.usecase");
const response_1 = require("../../../../utils/response");
const AuthRoutes = async (fastify) => {
    fastify
        .withTypeProvider()
        .post('/admin/login', {
        schema: auth_request_schema_1.loginSchema,
    }, async (req, res) => {
        try {
            const token = await (0, auth_usecase_1.loginUseCase)(req.body, res);
            (0, response_1.createSuccessResponse)(res, 'Login successful', { token }, 200);
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    })
        .post('/user/login', { schema: auth_request_schema_1.loginSchema }, async (req, res) => {
        try {
            const token = await (0, user_usecase_1.loginUserUseCase)(req.body);
            (0, response_1.createSuccessResponse)(res, 'Login successful', { token }, 200);
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    })
        .post('/user/signup', { schema: user_request_schema_1.createUserRequestSchema }, async (req, res) => {
        try {
            const token = await (0, user_usecase_1.creatUserUseCase)(req.body);
            (0, response_1.createSuccessResponse)(res, 'Signup successful', { token }, 200);
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    });
};
exports.default = AuthRoutes;
