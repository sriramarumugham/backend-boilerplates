"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromRequestHeader = exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = (userId) => {
    const token = jsonwebtoken_1.default.sign({ userId: userId }, process.env.SECRET_KEY, {
        expiresIn: '24h',
    });
    return token;
};
exports.signToken = signToken;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        return decoded;
    }
    catch (error) {
        throw new Error('Invalid token');
    }
};
exports.verifyToken = verifyToken;
const getUserIdFromRequestHeader = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error('Authorization header missing');
    }
    const token = authHeader?.split(' ')[1] ?? authHeader?.split(' ')[0];
    const decodedToken = (0, exports.verifyToken)(token);
    return decodedToken;
};
exports.getUserIdFromRequestHeader = getUserIdFromRequestHeader;
