"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubCategoriesResponseDocument = exports.SubcategoryType = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.SubcategoryType = typebox_1.Type.Object({
    subcategoryId: typebox_1.Type.String(),
    categoryId: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
    icon: typebox_1.Type.String(),
});
exports.getSubCategoriesResponseDocument = typebox_1.Type.Array(exports.SubcategoryType);
