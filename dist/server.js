"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const app_1 = __importDefault(require("./app"));
const options = {};
const server = (0, fastify_1.default)();
dotenv.config();
server.get("/", async (request, reply) => {
    return { message: "Hello, from fastify!" };
});
void server.setErrorHandler(async (error, request, reply) => {
    console.error('Raw Error:', error);
    const isValidationError = !!error.validation;
    if (isValidationError) {
        const errorFields = error?.validation?.map((v) => ({
            field: v.instancePath,
            message: v.message,
        }));
        const response = {
            status: 'Bad Request',
            message: 'Validation error occurred',
            timestamp: new Date().toISOString(),
            errorSource: 'Validation',
            errors: errorFields,
        };
        return reply.status(400).send(response);
    }
    const statusCode = error.statusCode || 500;
    const response = {
        status: 'Error',
        message: error.message || 'Something went wrong',
        timestamp: new Date().toISOString(),
        errorSource: error.name || 'Internal Server Error',
    };
    return reply.status(statusCode).send(response);
});
void server.register(app_1.default);
const port = parseInt(process.env.PORT || "4000", 10);
console.log("PORT:", port);
const start = async () => {
    try {
        await server.register(cors_1.default, {
            origin: ['*'],
            allowedHeaders: '*',
        });
        await server.listen({ port: port, host: '0.0.0.0' });
        console.log(`Server is running at http://localhost:${port}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
