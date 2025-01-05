"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHeaderDocument = exports.SuccessResponseType = exports.ErrorResponses = void 0;
const typebox_1 = require("@sinclair/typebox");
const CommonErrorResponse = typebox_1.Type.Object({
    status: typebox_1.Type.Optional(typebox_1.Type.String()),
    message: typebox_1.Type.Optional(typebox_1.Type.String()),
    timestamp: typebox_1.Type.Optional(typebox_1.Type.String()),
    errorSource: typebox_1.Type.Optional(typebox_1.Type.String()),
    errors: typebox_1.Type.Optional(typebox_1.Type.Any()),
});
exports.ErrorResponses = {
    400: CommonErrorResponse,
    500: CommonErrorResponse,
    401: CommonErrorResponse,
};
const SuccessResponseType = (dataType) => typebox_1.Type.Object({
    status: typebox_1.Type.Optional(typebox_1.Type.String()),
    message: typebox_1.Type.String(),
    timestamp: typebox_1.Type.String(),
    ...(dataType ? { data: dataType } : {}),
});
exports.SuccessResponseType = SuccessResponseType;
exports.AuthHeaderDocument = typebox_1.Type.Object({
    authorization: typebox_1.Type.String({
        description: 'Bearer <token>',
    }),
});
