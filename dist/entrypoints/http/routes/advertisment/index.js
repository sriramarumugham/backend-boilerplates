"use strict";
//  create advertisment
//   before creatina an advertisment user hast to complet his profile
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const advertisment_request_schema_1 = require("../../../../domain/advertisment/advertisment.request-schema");
const advertisment_usecase_1 = require("../../../../domain/advertisment/advertisment.usecase");
const advertisment_util_1 = require("../../../../utils/advertisment.util");
const auth_util_1 = require("../../../../utils/auth.util");
const file_upload_util_1 = require("../../../../utils/file-upload.util");
const response_1 = require("../../../../utils/response");
const fs = __importStar(require("fs"));
const promises_1 = require("fs/promises");
const promises_2 = require("node:stream/promises");
// const dummyImage = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const AdvertismentRoutes = async (fastify) => {
    fastify
        .withTypeProvider()
        .post('', {
        schema: advertisment_request_schema_1.createAdvertismentRequestSchema
    }, async (req, res) => {
        try {
            const parts = req.files();
            const uploadedImageUrls = [];
            let fields = {};
            for await (const part of parts) {
                fields = part.fields;
                if (part.type === 'file') {
                    try {
                        const localFilePath = `${part.filename}`;
                        console.log(`Processing file ${part.filename}...`);
                        await (0, promises_2.pipeline)(part.file, fs.createWriteStream(localFilePath));
                        const imageUrls = await (0, file_upload_util_1.fileUpload)(localFilePath);
                        uploadedImageUrls.push(...imageUrls);
                        await (0, promises_1.unlink)(localFilePath);
                        console.log(`File ${part.filename} uploaded and local file deleted.`);
                    }
                    catch (error) {
                        console.error(`Error processing file ${part.filename}:`, error);
                    }
                }
                else {
                    console.log('Form field:', part);
                }
            }
            try {
                const user = (0, auth_util_1.getUserIdFromRequestHeader)(req);
                const payload = (0, advertisment_util_1.createAdvertismentData)(fields);
                payload.images = uploadedImageUrls;
                await (0, advertisment_usecase_1.createAdvertismentUseCase)(payload, user.userId);
                return (0, response_1.createSuccessResponse)(res, 'Advertisement created!');
            }
            catch (error) {
                const message = error?.message || 'An unexpected error occurred';
                const statusCode = error?.status || 500;
                return (0, response_1.createErrorResponse)(res, message, statusCode);
            }
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
