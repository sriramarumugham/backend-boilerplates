"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdvertismentByIdRequestSchema = exports.searchRequestSchema = exports.deleteAdvertismentSchema = exports.getPublishedAdvertisementsSchema = exports.blockAdvertismentSchema = exports.getAdvertismentByStatusSchema = exports.updateAdvertismentInverntorySchema = exports.createAdvertismentRequestSchema = void 0;
const types_1 = require("../../types");
const response_type_1 = require("../../types/response.type");
const typebox_1 = require("@sinclair/typebox");
const advertisment_type_1 = require("../../types/advertisment.type");
const helpers_1 = require("../../utils/helpers");
exports.createAdvertismentRequestSchema = {
    tags: ['advertisment'],
    response: {
        ...response_type_1.ErrorResponses,
        201: (0, response_type_1.SuccessResponseType)(),
    },
    description: `This API requires form data. Upload the images and other fields in form data. \n\nSchema:\n${(0, helpers_1.generateSchemaDescription)(types_1.AdvertismentType)}`,
};
exports.updateAdvertismentInverntorySchema = {
    tags: ['advertisment'],
    body: advertisment_type_1.UpdateInventoryDocument,
    response: {
        ...response_type_1.ErrorResponses,
        201: (0, response_type_1.SuccessResponseType)(),
    },
};
exports.getAdvertismentByStatusSchema = {
    tags: ['advertisment'],
    querystring: typebox_1.Type.Object({
        status: typebox_1.Type.Enum(advertisment_type_1.E_STATUS), // Add valid advertisement statuses
    }),
    response: {
        ...response_type_1.ErrorResponses,
        200: (0, response_type_1.SuccessResponseType)(typebox_1.Type.Array(types_1.AdvertismentType)),
    },
};
exports.blockAdvertismentSchema = {
    tags: ['advertisment'],
    params: typebox_1.Type.Object({
        advertismentId: typebox_1.Type.String(), // Advertisement ID to block
    }),
    response: {
        ...response_type_1.ErrorResponses,
        201: (0, response_type_1.SuccessResponseType)(),
    },
};
exports.getPublishedAdvertisementsSchema = {
    tags: ['advertisment'],
    response: {
        ...response_type_1.ErrorResponses,
        200: (0, response_type_1.SuccessResponseType)(typebox_1.Type.Array(types_1.AdvertismentType)),
    },
};
exports.deleteAdvertismentSchema = {
    tags: ['advertisment'],
    params: typebox_1.Type.Object({
        id: typebox_1.Type.String(), // Expecting the advertisement ID as a path parameter
    }),
    response: {
        ...response_type_1.ErrorResponses,
        200: (0, response_type_1.SuccessResponseType)(typebox_1.Type.Array(types_1.AdvertismentType)),
    },
};
// search
exports.searchRequestSchema = {
    tags: ['search'], // Updated tag
    querystring: advertisment_type_1.searchRequestDocument, // Ensure this is a TypeBox schema
    response: {
        ...response_type_1.ErrorResponses,
        200: (0, response_type_1.SuccessResponseType)(typebox_1.Type.Array(types_1.AdvertismentType)),
    },
};
exports.getAdvertismentByIdRequestSchema = {
    tags: ['search'], // Updated tag
    params: typebox_1.Type.Object({ id: typebox_1.Type.String() }),
    response: {
        ...response_type_1.ErrorResponses,
        200: (0, response_type_1.SuccessResponseType)(types_1.AdvertismentType),
    },
};
