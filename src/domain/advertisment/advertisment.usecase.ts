import { isAdmin } from '@/data-access/admin.repo';
import AdvertismentModel from '@/data-access/models/advertisment.schema';
import UserModel from '@/data-access/models/user.schema';
import {
  AdvertismentDocument,
  CreateAdvertismentRequestType,
  E_INVENTORY_STATUS,
  E_STATUS,
  UpdateInventoryType,
} from '@/types';
import { fileUpload } from '@/utils/file-upload.util';


export const createAdvertismentUseCase = async (
  body: CreateAdvertismentRequestType,
  userId: string,
) => {
  const user = await UserModel.findOne({ userId });
  if (!user) {
    throw new Error('User not found');
  }

  // TODO profile to upload user information
  // if (!isValidProfile.Check(user)) {
  //   throw new Error('User profile is incomplete. Please update your profile.');
  // }

  const response=await AdvertismentModel.create({
    ...body,
    status: E_STATUS.ACTIVE,
    createdAt: new Date(),
    createdBy: userId,
  });
  return response;
};

export const deleteAdvertismentUseCase = async (
  advertismentId: string,
  userId: string,
) => {
  const advertisment = await AdvertismentModel.findOne({
    advertismentId: advertismentId,
    createdBy:userId,
  });

  if (!advertisment) {
    throw new Error('Advertisement not found or access denied.');
  }

  await AdvertismentModel.updateOne({ status: E_STATUS.DELETED });
};

export const updateAdvertismentStatusUseCase = async (
  advertismentId: string,
  body: UpdateInventoryType,
  userId: string,
) => {
  const advertisment = await AdvertismentModel.findOne({
    advertismentId: advertismentId,
    createdBy:userId,
  });

  if (!advertisment) {
    throw new Error('Advertisement not found or access denied.');
  }

  await AdvertismentModel.updateOne({
    inventoryDetails: body?.inventoryDetails,
  });
};

const INVENTORY_ORDER: Record<E_INVENTORY_STATUS, number> = {
  [E_INVENTORY_STATUS.AVAILABLE]: 1,
  [E_INVENTORY_STATUS.SOLD]: 2,
  [E_INVENTORY_STATUS.UNLIST]: 3,
};

export const getUserAdvertismentsUsecase = async (
  userId: string,
): Promise<AdvertismentDocument[]> => {
  const adverts = await AdvertismentModel.find<AdvertismentDocument>({
    status: E_STATUS.ACTIVE,
    createdBy:userId
  }).exec();

  return adverts.sort((a, b) => {
    return (
      INVENTORY_ORDER[a.inventoryDetails] - INVENTORY_ORDER[b.inventoryDetails]
    );
  });
};


export const blockAdvertismentUseCase = async (
  adminId: string,
  advertismentId: string,
): Promise<void> => {
  const isAdminUser = await isAdmin(adminId);

  if (!isAdminUser) {
    throw new Error('Only admins can update advertisement statuses');
  }

  await AdvertismentModel.findByIdAndUpdate(advertismentId, {
    status: E_STATUS.BLOCKED,
  });
};

export const getAdvertismentByStatus = async (
  adminId: string,
  status: E_STATUS,
): Promise<void> => {
  const isAdminUser = await isAdmin(adminId);

  if (!isAdminUser) {
    throw new Error('Only admins can  acces the  advertisement buystatuses');
  }

  await AdvertismentModel.find({
    status: status,
  });
};

export const searchProductsUseCase = async ({
  productName,
  categoryName,
  searchText,
}: {
  productName?: string;
  categoryName?: string;
  searchText?: string; 
}): Promise<any> => {
  const query: any = {
    status: E_STATUS.ACTIVE,
    inventoryDetails: E_INVENTORY_STATUS.AVAILABLE,
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
  return await AdvertismentModel.find(query);
};

export const getAdvertismentByIdUsecase = async (id: string) => {
  return await AdvertismentModel.findOne({
    advertismentId: id,
    status: E_STATUS.ACTIVE, 
  });
};
