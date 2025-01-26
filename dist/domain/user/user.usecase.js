"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUerById = exports.updateUserProfileUseCase = exports.loginUserUseCase = exports.creatUserUseCase = void 0;
const admin_schema_1 = __importDefault(require("../../data-access/models/admin.schema"));
const referreduser_schema_1 = __importDefault(require("../../data-access/models/referreduser.schema"));
const user_schema_1 = __importDefault(require("../../data-access/models/user.schema"));
const auth_util_1 = require("../../utils/auth.util");
const bycrypt_util_1 = require("../../utils/bycrypt.util");
const creatUserUseCase = async (body) => {
    const { email, password, referralCode } = body;
    const existingUser = await user_schema_1.default.findOne({ email });
    // TODO throw new custom erros
    if (existingUser)
        throw new Error('Email already in use');
    const hashedPassword = await (0, bycrypt_util_1.hashPassword)(password);
    const newUser = await user_schema_1.default.create({
        email,
        password: hashedPassword,
    });
    if (referralCode) {
        const referreedAdmin = await admin_schema_1.default.findOne({
            referralCode: referralCode,
        });
        if (!referralCode) {
            throw new Error('Invalid referral code!');
        }
        await referreduser_schema_1.default.create({
            userId: newUser.userId,
            referralCode,
            referredBy: referreedAdmin?.adminId,
        });
        const token = (0, auth_util_1.signToken)(newUser.userId);
        return token;
    }
};
exports.creatUserUseCase = creatUserUseCase;
const loginUserUseCase = async (body) => {
    const { email, password } = body;
    const user = await user_schema_1.default.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isValidPassword = await (0, bycrypt_util_1.comparePassword)(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid email or password');
    }
    const token = (0, auth_util_1.signToken)(user.userId);
    return token;
};
exports.loginUserUseCase = loginUserUseCase;
const updateUserProfileUseCase = async (userId, updateData) => {
    try {
        const updatedUser = await user_schema_1.default.updateOne({ userId: userId }, { $set: updateData }, {
            new: true,
            omitUndefined: true,
        });
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
};
exports.updateUserProfileUseCase = updateUserProfileUseCase;
const getUerById = async (userId) => {
    return await user_schema_1.default.findOne({ userId: userId }).lean();
};
exports.getUerById = getUerById;
