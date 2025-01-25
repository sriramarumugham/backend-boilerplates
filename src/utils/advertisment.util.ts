import { AdvertismentTypeRequestType, E_INVENTORY_STATUS, E_STATUS } from "@/types";
import { FastifyReply, FastifyRequest } from "fastify";

export const validateAdvertismentForm = async (req: FastifyRequest<{Body:AdvertismentTypeRequestType}>, res: FastifyReply) => {
  const { body } = req;

  // Validate productName
  const productName = body?.productName?.value;
  if (!productName || typeof productName !== 'string') {
    res.status(400).send({ message: 'productName must be a string' });
    return false;
  }

  // Validate productDescription
  const productDescription = body?.productDescription?.value;
  if (!productDescription || typeof productDescription !== 'string') {
    res.status(400).send({ message: 'productDescription must be a string' });
    return false;
  }



  // Validate categoryName
  const categoryName = body?.categoryName?.value;
  if (!categoryName || typeof categoryName !== 'string') {
    res.status(400).send({ message: 'categoryName must be a string' });
    return false;
  }

  // Validate categoryId
  const categoryId = body?.categoryId?.value;
  if (!categoryId || typeof categoryId !== 'string') {
    res.status(400).send({ message: 'categoryId must be a string' });
    return false;
  }

  // Validate subcategoryName
  const subcategoryName = body?.subcategoryName?.value;
  if (!subcategoryName || typeof subcategoryName !== 'string') {
    res.status(400).send({ message: 'subcategoryName must be a string' });
    return false;
  }

  // Validate subcategoryId
  const subcategoryId = body?.subcategoryId?.value;
  if (!subcategoryId || typeof subcategoryId !== 'string') {
    res.status(400).send({ message: 'subcategoryId must be a string' });
    return false;
  }

  // Validate city
  const city = body?.city?.value;
  if (!city || typeof city !== 'string') {
    res.status(400).send({ message: 'city must be a string' });
    return false;
  }

  // Validate zip
  const zip = body?.zip?.value;
  if (!zip || typeof zip !== 'string') {
    res.status(400).send({ message: 'zip must be a string' });
    return false;
  }

  // Validate address
  const address = body?.address?.value;
  if (!address || typeof address !== 'string') {
    res.status(400).send({ message: 'address must be a string' });
    return false;
  }

  // Validate status (should be one of the E_STATUS enum values)
  const status = body?.status?.value;
  if (!status || !Object.values(E_STATUS).includes(status)) {
    res.status(400).send({ message: `status must be one of the valid values: ${Object.values(E_STATUS).join(', ')}` });
    return false;
  }

  // Validate inventoryDetails (should be one of the E_INVENTORY_STATUS enum values)
  const inventoryDetails = body?.inventoryDetails?.value;
  if (!inventoryDetails || !Object.values(E_INVENTORY_STATUS).includes(inventoryDetails)) {
    res.status(400).send({ message: `inventoryDetails must be one of the valid values: ${Object.values(E_INVENTORY_STATUS).join(', ')}` });
    return false;
  }

  // Validate productDetails (no strict validation here, as it's Type.Any())
  const productDetails = body?.productDetails?.value;
  if (productDetails === undefined) {
    res.status(400).send({ message: 'productDetails is required' });
    return false;
  }

const images = body?.images as unknown as any;  // Directly get the images field

if (Array.isArray(images)) {
  // Validate each image if it's a file
  for (const image of images) {
    // Check if image is an object and has required file properties
    if (!image || typeof image !== 'object' || !image.file || !image.filename || !image.mimetype) {
      res.status(400).send({ message: 'Each image must be a valid file object' });
      return false;
    }
  }
} else if (typeof images === 'object' && images?.file && images.filename && images.mimetype) {
  // Single file validation
  const image = images;

  // Validate file properties
  if (!image || typeof image !== 'object' || !image.file || !image.filename || !image.mimetype) {
    res.status(400).send({ message: 'Image must be a valid file object' });
    return false;
  }
} else {
  res.status(400).send({ message: 'images must be a valid file object or an array of file objects' });
  return false;
}

  // If all validations pass, return true
  return true;
};


// Helper function to process form data and return the object excluding 'images'
export const createAdvertismentData = (body: AdvertismentTypeRequestType) => {
  const {
    advertismentId,
    productName,
    productDescription,
    views,
    categoryName,
    categoryId,
    subcategoryName,
    subcategoryId,
    city,
    zip,
    address,
    createdBy,
    status,
    inventoryDetails,
    productDetails
  } = body;

  // Construct the object excluding the images
  const formData = {
    advertismentId,
    productName: productName?.value,
    productDescription: productDescription?.value,
    views: views?.value,
    categoryName: categoryName?.value,
    categoryId: categoryId?.value,
    subcategoryName: subcategoryName?.value,
    subcategoryId: subcategoryId?.value,
    city: city?.value,
    zip: zip?.value,
    address: address?.value,
    createdBy,
    status: status?.value,
    inventoryDetails: inventoryDetails?.value,
    productDetails: productDetails?.value,
  };

  return formData;
};

