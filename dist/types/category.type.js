"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesDocument = exports.CategoryType = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.CategoryType = typebox_1.Type.Object({
    categoryId: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
    icon: typebox_1.Type.String(),
});
exports.getCategoriesDocument = typebox_1.Type.Array(exports.CategoryType);
