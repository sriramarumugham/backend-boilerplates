"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertismentTypeRequestType = exports.searchRequestDocument = exports.UpdateInventoryDocument = exports.CreateAdvertismentRequestDocument = exports.AdvertismentType = exports.E_INVENTORY_STATUS = exports.E_STATUS = void 0;
const typebox_1 = require("@sinclair/typebox");
var E_STATUS;
(function (E_STATUS) {
    E_STATUS["ACTIVE"] = "ACTIVE";
    E_STATUS["DELETED"] = "DELETED";
    E_STATUS["BLOCKED"] = "BLOCKED";
})(E_STATUS || (exports.E_STATUS = E_STATUS = {}));
var E_INVENTORY_STATUS;
(function (E_INVENTORY_STATUS) {
    E_INVENTORY_STATUS["AVAILABLE"] = "AVAILABLE";
    E_INVENTORY_STATUS["SOLD"] = "SOLD";
    E_INVENTORY_STATUS["UNLIST"] = "UNLIST";
})(E_INVENTORY_STATUS || (exports.E_INVENTORY_STATUS = E_INVENTORY_STATUS = {}));
exports.AdvertismentType = typebox_1.Type.Object({
    advertismentId: typebox_1.Type.String(),
    productName: typebox_1.Type.String(),
    productDescription: typebox_1.Type.String(),
    views: typebox_1.Type.Optional(typebox_1.Type.Number()),
    categoryName: typebox_1.Type.String(),
    categoryId: typebox_1.Type.String(),
    subcategoryName: typebox_1.Type.String(),
    subcategoryId: typebox_1.Type.String(),
    images: typebox_1.Type.Array(typebox_1.Type.String()),
    city: typebox_1.Type.String(),
    zip: typebox_1.Type.String(),
    address: typebox_1.Type.String(),
    createdBy: typebox_1.Type.String(),
    status: typebox_1.Type.Enum(E_STATUS),
    inventoryDetails: typebox_1.Type.Enum(E_INVENTORY_STATUS),
    productDetails: typebox_1.Type.Any(),
});
exports.CreateAdvertismentRequestDocument = typebox_1.Type.Omit(exports.AdvertismentType, [
    'advertismentId',
    'views',
    'createdBy',
]);
exports.UpdateInventoryDocument = typebox_1.Type.Pick(exports.AdvertismentType, [
    'inventoryDetails',
]);
exports.searchRequestDocument = typebox_1.Type.Object({
    productName: typebox_1.Type.Optional(typebox_1.Type.String()),
    categoryName: typebox_1.Type.Optional(typebox_1.Type.String()),
    searchText: typebox_1.Type.Optional(typebox_1.Type.String())
});
// form data schema
exports.AdvertismentTypeRequestType = typebox_1.Type.Object({
    advertismentId: typebox_1.Type.String(),
    productName: typebox_1.Type.Object({ value: typebox_1.Type.String() }),
    productDescription: typebox_1.Type.Object({ value: typebox_1.Type.String() }),
    views: typebox_1.Type.Object({ value: typebox_1.Type.Number() }),
    categoryName: typebox_1.Type.Object({ value: typebox_1.Type.String() }),
    categoryId: typebox_1.Type.Object({ value: typebox_1.Type.String() }),
    subcategoryName: typebox_1.Type.Object({ value: typebox_1.Type.String() }),
    subcategoryId: typebox_1.Type.Object({ value: typebox_1.Type.String() }),
    images: typebox_1.Type.Object({ value: typebox_1.Type.Array(typebox_1.Type.Object({
            fieldname: typebox_1.Type.String(),
            filename: typebox_1.Type.String(),
            encoding: typebox_1.Type.String(),
            mimetype: typebox_1.Type.String(),
            file: typebox_1.Type.Any(),
        })) }),
    city: typebox_1.Type.Object({ value: typebox_1.Type.String() }),
    zip: typebox_1.Type.Object({ value: typebox_1.Type.String() }),
    address: typebox_1.Type.Object({ value: typebox_1.Type.String() }),
    createdBy: typebox_1.Type.String(),
    status: typebox_1.Type.Object({ value: typebox_1.Type.Enum(E_STATUS) }),
    inventoryDetails: typebox_1.Type.Object({ value: typebox_1.Type.Enum(E_INVENTORY_STATUS) }),
    productDetails: typebox_1.Type.Object({ value: typebox_1.Type.Any() }),
});
