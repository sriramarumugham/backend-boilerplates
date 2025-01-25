"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdvertismentByIdUsecase = exports.searchProductsUseCase = exports.getAdvertismentByStatus = exports.blockAdvertismentUseCase = exports.getUserAdvertismentsUsecase = exports.updateAdvertismentStatusUseCase = exports.deleteAdvertismentUseCase = exports.createAdvertismentUseCase = void 0;
const admin_repo_1 = require("../../data-access/admin.repo");
const advertisment_schema_1 = __importDefault(require("../../data-access/models/advertisment.schema"));
const user_schema_1 = __importDefault(require("../../data-access/models/user.schema"));
const types_1 = require("../../types");
const createAdvertismentUseCase = async (body, userId) => {
    const user = await user_schema_1.default.findOne({ userId });
    if (!user) {
        throw new Error('User not found');
    }
    // TODO profile to upload user information
    // if (!isValidProfile.Check(user)) {
    //   throw new Error('User profile is incomplete. Please update your profile.');
    // }
    const response = await advertisment_schema_1.default.create({
        ...body,
        status: types_1.E_STATUS.ACTIVE,
        createdAt: new Date(),
        createdBy: userId,
    });
    return response;
};
exports.createAdvertismentUseCase = createAdvertismentUseCase;
const deleteAdvertismentUseCase = async (advertismentId, userId) => {
    const advertisment = await advertisment_schema_1.default.findOne({
        advertismentId: advertismentId,
        createdBy: userId,
    });
    if (!advertisment) {
        throw new Error('Advertisement not found or access denied.');
    }
    await advertisment_schema_1.default.updateOne({ status: types_1.E_STATUS.DELETED });
};
exports.deleteAdvertismentUseCase = deleteAdvertismentUseCase;
const updateAdvertismentStatusUseCase = async (advertismentId, body, userId) => {
    const advertisment = await advertisment_schema_1.default.findOne({
        advertismentId: advertismentId,
        createdBy: userId,
    });
    if (!advertisment) {
        throw new Error('Advertisement not found or access denied.');
    }
    await advertisment_schema_1.default.updateOne({
        inventoryDetails: body?.inventoryDetails,
    });
};
exports.updateAdvertismentStatusUseCase = updateAdvertismentStatusUseCase;
const INVENTORY_ORDER = {
    [types_1.E_INVENTORY_STATUS.AVAILABLE]: 1,
    [types_1.E_INVENTORY_STATUS.SOLD]: 2,
    [types_1.E_INVENTORY_STATUS.UNLIST]: 3,
};
const getUserAdvertismentsUsecase = async (userId) => {
    const adverts = await advertisment_schema_1.default.find({
        status: types_1.E_STATUS.ACTIVE,
        createdBy: userId
    }).exec();
    return adverts.sort((a, b) => {
        return (INVENTORY_ORDER[a.inventoryDetails] - INVENTORY_ORDER[b.inventoryDetails]);
    });
};
exports.getUserAdvertismentsUsecase = getUserAdvertismentsUsecase;
const blockAdvertismentUseCase = async (adminId, advertismentId) => {
    const isAdminUser = await (0, admin_repo_1.isAdmin)(adminId);
    if (!isAdminUser) {
        throw new Error('Only admins can update advertisement statuses');
    }
    await advertisment_schema_1.default.findByIdAndUpdate(advertismentId, {
        status: types_1.E_STATUS.BLOCKED,
    });
};
exports.blockAdvertismentUseCase = blockAdvertismentUseCase;
const getAdvertismentByStatus = async (adminId, status) => {
    const isAdminUser = await (0, admin_repo_1.isAdmin)(adminId);
    if (!isAdminUser) {
        throw new Error('Only admins can  acces the  advertisement buystatuses');
    }
    await advertisment_schema_1.default.find({
        status: status,
    });
};
exports.getAdvertismentByStatus = getAdvertismentByStatus;
const searchProductsUseCase = async ({ productName, categoryName, searchText, }) => {
    const query = {
        status: types_1.E_STATUS.ACTIVE,
        inventoryDetails: types_1.E_INVENTORY_STATUS.AVAILABLE,
    };
    if (productName) {
        query.productName = { $regex: productName, $options: 'i' }; // Case-insensitive search
    }
    if (categoryName) {
        query.categoryName = { $regex: categoryName, $options: 'i' };
    }
    if (searchText) {
        const regex = new RegExp(searchText, 'i');
        query.$or = [
            { productName: { $regex: regex } },
            { categoryName: { $regex: regex } },
            { productDescription: { $regex: regex } },
        ];
    }
    return await advertisment_schema_1.default.find(query);
};
exports.searchProductsUseCase = searchProductsUseCase;
const getAdvertismentByIdUsecase = async (id) => {
    return await advertisment_schema_1.default.findOne({
        advertismentId: id,
        status: types_1.E_STATUS.ACTIVE,
    });
};
exports.getAdvertismentByIdUsecase = getAdvertismentByIdUsecase;
