"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCustomErrorHandler = exports.createErrorResponse = exports.createSuccessResponse = void 0;
const createSuccessResponse = (res, message, data, statusCode) => {
    return res.status(statusCode ?? 200).send({
        status: 'OK',
        message: message || 'Success',
        timestamp: new Date().toISOString(),
        data: data || null, // Default to null if no data is provided
    });
};
exports.createSuccessResponse = createSuccessResponse;
const createErrorResponse = (res, message, statusCode) => {
    return res.status(statusCode ?? 500).send({
        status: 'Internal Server Error',
        message: message || 'Error',
        timestamp: new Date(),
        errorSource: 'caybia backend',
    });
};
exports.createErrorResponse = createErrorResponse;
const addCustomErrorHandler = (fastify) => {
    fastify.setErrorHandler((error, req, res) => {
        if (error.validation) {
            const errors = error.validation.map((v) => ({
                field: v.instancePath,
                message: v.message,
            }));
            return createErrorResponse(res, errors, 400);
        }
        else {
            const status = 'Internal Server Error';
            const message = error.message || 'Something went wrong';
            return createErrorResponse(res, message, status);
        }
    });
};
exports.addCustomErrorHandler = addCustomErrorHandler;
