"use strict";
//  create advertisment
//   before creatina an advertisment user hast to complet his profile
Object.defineProperty(exports, "__esModule", { value: true });
const advertisment_request_schema_1 = require("../../../../domain/advertisment/advertisment.request-schema");
const advertisment_usecase_1 = require("../../../../domain/advertisment/advertisment.usecase");
const advertisment_util_1 = require("../../../../utils/advertisment.util");
const auth_util_1 = require("../../../../utils/auth.util");
const response_1 = require("../../../../utils/response");
const dummyImage = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const AdvertismentRoutes = async (fastify) => {
    fastify
        .withTypeProvider()
        .post('', {
        schema: advertisment_request_schema_1.createAdvertismentRequestSchema
    }, async (req, res) => {
        try {
            (0, advertisment_util_1.validateAdvertismentForm)(req, res);
            const user = (0, auth_util_1.getUserIdFromRequestHeader)(req);
            const payload = (0, advertisment_util_1.createAdvertismentData)(req?.body);
            // const images = await fileUpload(req.body);
            // console.log("IMAGES UPLOADED:", images);
            await (0, advertisment_usecase_1.createAdvertismentUseCase)({ ...payload, images: [dummyImage] }, user.userId);
            (0, response_1.createSuccessResponse)(res, 'Advertisment created!');
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    })
        .patch('/inventoryDetails/:id', { schema: advertisment_request_schema_1.updateAdvertismentInverntorySchema }, async (req, res) => {
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
        .delete('/:id', { schema: advertisment_request_schema_1.deleteAdvertismentSchema }, async (req, res) => {
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
        .get('/my-advertisements', { schema: advertisment_request_schema_1.getPublishedAdvertisementsSchema }, async (req, res) => {
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
