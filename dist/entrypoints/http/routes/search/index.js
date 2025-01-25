"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const advertisment_request_schema_1 = require("../../../../domain/advertisment/advertisment.request-schema");
const advertisment_usecase_1 = require("../../../../domain/advertisment/advertisment.usecase");
const response_1 = require("../../../../utils/response");
const SearchRoute = async (fastify) => {
    fastify
        .withTypeProvider()
        .get('/', { schema: advertisment_request_schema_1.searchRequestSchema }, async (req, res) => {
        try {
            const { productName, categoryName, searchText } = req.query;
            const products = await (0, advertisment_usecase_1.searchProductsUseCase)({
                productName,
                categoryName,
                searchText,
            });
            (0, response_1.createSuccessResponse)(res, 'Search results fetched successfully!', products);
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    })
        .get('/:id', {
        schema: advertisment_request_schema_1.getAdvertismentByIdRequestSchema,
    }, async (req, res) => {
        try {
            const { id } = req.params;
            const advertisment = await (0, advertisment_usecase_1.getAdvertismentByIdUsecase)(id);
            if (!advertisment) {
                return (0, response_1.createErrorResponse)(res, 'Advertisement not found or inactive', 404);
            }
            (0, response_1.createSuccessResponse)(res, 'Advertisement fetched successfully!', advertisment);
        }
        catch (error) {
            const message = error.message || 'An unexpected error occurred';
            const statusCode = error.status || 500;
            (0, response_1.createErrorResponse)(res, message, statusCode);
        }
    });
};
exports.default = SearchRoute;
