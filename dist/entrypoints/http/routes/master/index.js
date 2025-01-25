"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const master_request_usecase_1 = require("../../../../domain/master/master.request.usecase");
const master_usecase_1 = require("../../../../domain/master/master.usecase");
const response_1 = require("../../../../utils/response");
const MasterRoutes = async (fastify) => {
    fastify
        .withTypeProvider()
        .post('/category', {
        schema: master_request_usecase_1.createCategories,
    }, async (req, res) => {
        try {
            await (0, master_usecase_1.createOrUpdateCategories)(req.body);
            (0, response_1.createSuccessResponse)(res, 'category created!');
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    })
        .post('/subcategory', {
        schema: master_request_usecase_1.createSubCategoriesRequestSchema,
    }, async (req, res) => {
        try {
            await (0, master_usecase_1.createOrUpdateSubcategories)(req.body);
            (0, response_1.createSuccessResponse)(res, 'subcategory created!');
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    })
        .get('/categories', {
        schema: master_request_usecase_1.getCategoriesRequestSchema,
    }, async (req, res) => {
        try {
            const categories = await (0, master_usecase_1.getCatagoriesUseCase)();
            (0, response_1.createSuccessResponse)(res, 'Categories retrieved successfully', categories);
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    })
        .get('/subcatagories/:catagoriesId', {
        schema: master_request_usecase_1.getSubCategoriesRequestSchema,
    }, async (req, res) => {
        try {
            const subCatagories = await (0, master_usecase_1.getAllSubcatagoriesByCatagoriesId)(req?.params?.catagoriesId);
            (0, response_1.createSuccessResponse)(res, 'Sub catagories retrieved successfully', subCatagories);
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    });
};
exports.default = MasterRoutes;
