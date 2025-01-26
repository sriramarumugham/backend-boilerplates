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
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    // Only register Swagger in development environment
    if (process.env.NODE_ENV == 'local') {
        fastify.register(swagger_1.default, {
            openapi: {
                info: {
                    title: 'SVC',
                    description: '',
                    version: '0.1.0',
                },
                servers: [
                    {
                        url: `http://localhost:${process.env.PORT || 3000}`, // Default to port 3000 if PORT is not set
                    },
                ],
                components: {
                    securitySchemes: {
                        bearerAuth: {
                            type: 'apiKey',
                            name: 'Authorization',
                            in: 'header',
                        },
                    },
                },
            },
            hideUntagged: false,
        });
        fastify.register(swagger_ui_1.default, {
            routePrefix: '/docs',
        });
        console.log('Swagger and Swagger UI are enabled in development mode.');
    }
    else {
        console.log('Swagger and Swagger UI are disabled in production mode.');
    }
});
