import { Static, Type } from '@sinclair/typebox';

export enum E_STATUS {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  BLOCKED = 'BLOCKED',
}

export enum E_INVENTORY_STATUS {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  UNLIST = 'UNLIST',
}

export const AdvertismentType = Type.Object({
  advertismentId: Type.String(),
  productName: Type.String(),
  productDescription: Type.String(),
  views:  Type.Optional(Type.Number()),
  categoryName: Type.String(),
  categoryId: Type.String(),
  subcategoryName: Type.String(),
  subcategoryId: Type.String(),
  images: Type.Array(Type.String()),
  city: Type.String(),
  zip: Type.String(),
  address: Type.String(),
  createdBy: Type.String(),
  status: Type.Enum(E_STATUS),
  inventoryDetails: Type.Enum(E_INVENTORY_STATUS),
  productDetails: Type.Any(),
});

export type AdvertismentDocument = Static<typeof AdvertismentType>;

export const CreateAdvertismentRequestDocument = Type.Omit(AdvertismentType, [
  'advertismentId',
  'views',
  'createdBy',
]);

export type CreateAdvertismentRequestType = Static<
  typeof CreateAdvertismentRequestDocument
>;

export const UpdateInventoryDocument = Type.Pick(AdvertismentType, [
  'inventoryDetails',
]);

export type UpdateInventoryType = Static<typeof UpdateInventoryDocument>;

export const searchRequestDocument = Type.Object({
  productName: Type.Optional(Type.String()),
  categoryName: Type.Optional(Type.String()),
  searchText:Type.Optional(Type.String())
})

export type searchRequestType = Static<typeof searchRequestDocument>;



// form data schema
export const AdvertismentTypeRequestType = Type.Object({
  advertismentId: Type.String(),
  productName: Type.Object({ value: Type.String() }),
  productDescription: Type.Object({ value: Type.String() }),
  views: Type.Object({ value: Type.Number() }),
  categoryName: Type.Object({ value: Type.String() }),
  categoryId: Type.Object({ value: Type.String() }),
  subcategoryName: Type.Object({ value: Type.String() }),
  subcategoryId: Type.Object({ value: Type.String() }),
  images: Type.Object({ value: Type.Array(
    Type.Object({
      fieldname: Type.String(),
      filename: Type.String(),
      encoding: Type.String(),
      mimetype: Type.String(),
      file: Type.Any(),
    })
  ) }),
  city: Type.Object({ value: Type.String() }),
  zip: Type.Object({ value: Type.String() }),
  address: Type.Object({ value: Type.String() }),
  createdBy: Type.String(),
  status: Type.Object({ value: Type.Enum(E_STATUS) }),
  inventoryDetails: Type.Object({ value: Type.Enum(E_INVENTORY_STATUS) }),
  productDetails: Type.Object({ value: Type.Any() }),
});

export type AdvertismentTypeRequestType = Static<typeof AdvertismentTypeRequestType>;
