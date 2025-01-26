"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilteredUserDocument = exports.isValidProfile = exports.UpdateUserProfileDocument = exports.CreateUserDocument = exports.UserType = void 0;
const typebox_1 = require("@sinclair/typebox");
const compiler_1 = require("@sinclair/typebox/compiler");
const referredusers_type_1 = require("./referredusers.type");
exports.UserType = typebox_1.Type.Object({
    userId: typebox_1.Type.String(),
    fullName: typebox_1.Type.String(),
    phoneNumber: typebox_1.Type.String(),
    countryCode: typebox_1.Type.String(),
    email: typebox_1.Type.String(),
    country: typebox_1.Type.String(),
    city: typebox_1.Type.String(),
    zip: typebox_1.Type.String(),
    address: typebox_1.Type.String(),
    password: typebox_1.Type.String(),
});
exports.CreateUserDocument = typebox_1.Type.Intersect([
    typebox_1.Type.Pick(exports.UserType, ['email', 'password']),
    referredusers_type_1.createReferredUserDocument,
]);
exports.UpdateUserProfileDocument = typebox_1.Type.Partial(typebox_1.Type.Omit(exports.UserType, [
    'userId',
    'email',
    'password',
]));
exports.isValidProfile = compiler_1.TypeCompiler.Compile(exports.UpdateUserProfileDocument);
exports.FilteredUserDocument = typebox_1.Type.Partial(typebox_1.Type.Omit(exports.UserType, ['password']));
