"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateSubcategories = exports.createOrUpdateCategories = exports.getAllSubcatagoriesByCatagoriesId = exports.getCatagoriesUseCase = exports.createSubcategoryUseCase = exports.createCategoryUseCase = void 0;
const category_schema_1 = __importDefault(require("../../data-access/models/category.schema"));
const subcategory_schema_1 = __importDefault(require("../../data-access/models/subcategory.schema"));
const createCategoryUseCase = async (body) => {
    const newCategory = await category_schema_1.default.create(body);
    return newCategory;
};
exports.createCategoryUseCase = createCategoryUseCase;
const createSubcategoryUseCase = async (body) => {
    const newSubcategory = await subcategory_schema_1.default.create(body);
    return newSubcategory;
};
exports.createSubcategoryUseCase = createSubcategoryUseCase;
const getCatagoriesUseCase = async () => {
    return await category_schema_1.default.find();
};
exports.getCatagoriesUseCase = getCatagoriesUseCase;
const getAllSubcatagoriesByCatagoriesId = async (categoryId) => {
    return await subcategory_schema_1.default.find({ categoryId: categoryId });
};
exports.getAllSubcatagoriesByCatagoriesId = getAllSubcatagoriesByCatagoriesId;
const createOrUpdateCategories = async (categories) => {
    const operations = categories.map(category => ({
        updateOne: {
            filter: { categoryId: category.categoryId },
            update: { $set: category },
            upsert: true,
        },
    }));
    const result = await category_schema_1.default.bulkWrite(operations);
    return result;
};
exports.createOrUpdateCategories = createOrUpdateCategories;
const createOrUpdateSubcategories = async (subcategories) => {
    const operations = subcategories.map(subcategory => ({
        updateOne: {
            filter: { subcategoryId: subcategory.subcategoryId },
            update: { $set: subcategory },
            upsert: true,
        },
    }));
    const result = await subcategory_schema_1.default.bulkWrite(operations);
    return result;
};
exports.createOrUpdateSubcategories = createOrUpdateSubcategories;
