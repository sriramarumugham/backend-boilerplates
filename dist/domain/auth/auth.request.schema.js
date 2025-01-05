"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const auth_type_1 = require("../../types/auth.type");
const response_type_1 = require("../../types/response.type");
exports.loginSchema = {
    tags: ['auth'],
    body: auth_type_1.loginRequestDocument,
    response: {
        ...response_type_1.ErrorResponses,
        200: (0, response_type_1.SuccessResponseType)(auth_type_1.loginResponseDocument),
    },
};
