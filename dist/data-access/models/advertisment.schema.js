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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_util_1 = require("../../utils/uuid.util");
const mongoose_1 = __importStar(require("mongoose"));
const types_1 = require("../../types");
const AdvertismentSchema = new mongoose_1.Schema({
    advertismentId: { type: String, rquired: true, default: uuid_util_1.getUUID },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    views: { type: Number, required: false },
    categoryName: { type: String, required: true },
    categoryId: { type: String, required: true },
    subcategoryName: { type: String, required: true },
    subcategoryId: { type: String, required: true },
    images: [{ type: String, required: true }],
    city: { type: String, required: true },
    zip: { type: String, required: true },
    address: { type: String, required: true },
    createdBy: { type: String, required: true },
    status: { type: String, default: types_1.E_STATUS.ACTIVE, required: true },
    inventoryDetails: {
        type: String,
        default: types_1.E_INVENTORY_STATUS.AVAILABLE,
        required: true,
    },
    productDetails: { type: mongoose_1.Schema.Types.Mixed, required: false },
}, { timestamps: true });
const AdvertismentModel = mongoose_1.default.model('Advertisment', AdvertismentSchema);
exports.default = AdvertismentModel;
