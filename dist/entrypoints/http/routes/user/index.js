"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_request_schema_1 = require("../../../../domain/user/user.request.schema");
const user_usecase_1 = require("../../../../domain/user/user.usecase");
const auth_util_1 = require("../../../../utils/auth.util");
const response_1 = require("../../../../utils/response");
const UserRoutes = async (fastify) => {
    fastify
        .withTypeProvider() // Ensure this is correctly applied
        .patch('/profile', {
        schema: {
            body: user_request_schema_1.updateUserProfile, // Ensure this matches your schema
        },
    }, async (req, res) => {
        try {
            const user = (0, auth_util_1.getUserIdFromRequestHeader)(req);
            const updateData = req.body;
            const updatedUser = await (0, user_usecase_1.updateUserProfileUseCase)(user.userId, updateData);
            (0, response_1.createSuccessResponse)(res, 'User profile updated successfully!', updatedUser);
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    });
};
