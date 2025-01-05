"use strict";
//  create advertisment
//   before creatina an advertisment user hast to complet his profile
Object.defineProperty(exports, "__esModule", { value: true });
const advertisment_request_schema_1 = require("../../../../domain/advertisment/advertisment.request-schema");
const advertisment_usecase_1 = require("../../../../domain/advertisment/advertisment.usecase");
const auth_util_1 = require("../../../../utils/auth.util");
const response_1 = require("../../../../utils/response");
const AdvertismentRoutes = async (fastify) => {
    fastify
        .withTypeProvider()
        .post('/advertisment', { schema: advertisment_request_schema_1.createAdvertismentRequestSchema }, async (req, res) => {
        try {
            const user = (0, auth_util_1.getUserIdFromRequestHeader)(req);
            await (0, advertisment_usecase_1.createAdvertismentUseCase)(req.body, user.userId);
            (0, response_1.createSuccessResponse)(res, 'Advertisment created!');
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    })
        .patch('/advertisment/:id/inventoryDetails', { schema: advertisment_request_schema_1.updateAdvertismentInverntorySchema }, async (req, res) => {
        try {
            const user = (0, auth_util_1.getUserIdFromRequestHeader)(req);
            await (0, advertisment_usecase_1.updateAdvertismentStatusUseCase)(req.params.id, req.body, user.userId);
            (0, response_1.createSuccessResponse)(res, 'Advertisement status updated!');
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    })
        .delete('/advertisment/:id', { schema: advertisment_request_schema_1.deleteAdvertismentSchema }, async (req, res) => {
        try {
            const user = (0, auth_util_1.getUserIdFromRequestHeader)(req);
            await (0, advertisment_usecase_1.deleteAdvertismentUseCase)(req.params.id, user.userId);
            (0, response_1.createSuccessResponse)(res, 'Advertisement deleted successfully!');
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    })
        .get('/published', { schema: advertisment_request_schema_1.getPublishedAdvertisementsSchema }, async (req, res) => {
        try {
            const user = (0, auth_util_1.getUserIdFromRequestHeader)(req);
            const advertisments = await (0, advertisment_usecase_1.getUserAdvertismentsUsecase)(user.userId);
            (0, response_1.createSuccessResponse)(res, 'Advertisements fetched successfully!', advertisments);
        }
        catch (error) {
            (0, response_1.createErrorResponse)(res, error.message || 'An unexpected error occurred', error.status || 500);
        }
    })
        .get('/admin/advertisments', { schema: advertisment_request_schema_1.getAdvertismentByStatusSchema }, // Add schema here
    async (req, res) => {
        try {
            const admin = (0, auth_util_1.getUserIdFromRequestHeader)(req);
            const { status } = req.query; // Extract status from query
            const advertisments = await (0, advertisment_usecase_1.getAdvertismentByStatus)(admin.userId, status);
            (0, response_1.createSuccessResponse)(res, 'Advertisements fetched successfully!', advertisments);
        }
        catch (error) {
            (0, response_1.createErrorResponse)(res, error.message || 'An unexpected error occurred', error.status || 500);
        }
    })
        .post('/admin/block/:advertismentId', { schema: advertisment_request_schema_1.blockAdvertismentSchema }, // Add schema here
    async (req, res) => {
        try {
            const admin = (0, auth_util_1.getUserIdFromRequestHeader)(req);
            const { advertismentId } = req.params; // Extract advertisement ID from params
            await (0, advertisment_usecase_1.blockAdvertismentUseCase)(admin.userId, advertismentId); // Call the blocking use case
            (0, response_1.createSuccessResponse)(res, 'Advertisement blocked successfully!');
        }
        catch (error) {
            (0, response_1.createErrorResponse)(res, error.message || 'An unexpected error occurred', error.status || 500);
        }
    });
};
exports.default = AdvertismentRoutes;
