"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubCategoriesRequestSchema = exports.getCategoriesRequestSchema = exports.createSubCategoriesRequestSchema = exports.createCategories = void 0;
const types_1 = require("../../types");
const response_type_1 = require("../../types/response.type");
const typebox_1 = require("@sinclair/typebox");
exports.createCategories = {
    tags: ['master'],
    body: typebox_1.Type.Array(types_1.CategoryType),
    response: {
        ...response_type_1.ErrorResponses,
        200: (0, response_type_1.SuccessResponseType)(),
    },
};
exports.createSubCategoriesRequestSchema = {
    tags: ['master'],
    body: typebox_1.Type.Array(types_1.SubcategoryType),
    response: {
        ...response_type_1.ErrorResponses,
        200: (0, response_type_1.SuccessResponseType)(),
    },
};
exports.getCategoriesRequestSchema = {
    tags: ['master'],
    response: {
        ...response_type_1.ErrorResponses,
        200: (0, response_type_1.SuccessResponseType)(types_1.getCategoriesDocument),
    },
};
exports.getSubCategoriesRequestSchema = {
    tags: ['master'],
    pathParams: typebox_1.Type.Object({
        categoriesId: typebox_1.Type.String(), // Adding categoriesId as a path parameter
    }),
    response: {
        ...response_type_1.ErrorResponses,
        200: (0, response_type_1.SuccessResponseType)(types_1.getSubCategoriesResponseDocument),
    },
};
