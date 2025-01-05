"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.createUserRequestSchema = void 0;
const types_1 = require("../../types");
const auth_type_1 = require("../../types/auth.type");
const response_type_1 = require("../../types/response.type");
exports.createUserRequestSchema = {
    tags: ['auth'],
    body: types_1.CreateUserDocument,
    response: {
        ...response_type_1.ErrorResponses,
        201: (0, response_type_1.SuccessResponseType)(auth_type_1.loginResponseDocument),
    },
};
exports.updateUserProfile = {
    tags: ['user'],
    body: types_1.UpdateUserProfileDocument,
    response: {
        ...response_type_1.ErrorResponses,
        201: (0, response_type_1.SuccessResponseType)(auth_type_1.loginResponseDocument),
    },
};