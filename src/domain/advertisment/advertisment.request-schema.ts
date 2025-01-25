import { AdvertismentType, CreateAdvertismentRequestDocument } from '@/types';
import { ErrorResponses, SuccessResponseType } from '@/types/response.type';
import { Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import {
  E_STATUS,
  searchRequestDocument,
  UpdateInventoryDocument,
} from '../../types/advertisment.type';
import { generateSchemaDescription } from '@/utils/helpers';

export const createAdvertismentRequestSchema = {
  tags: ['advertisment'],
  response: {
    ...ErrorResponses,
    201: SuccessResponseType(),
  },
  description: `This API requires form data. Upload the images and other fields in form data. \n\nSchema:\n${generateSchemaDescription(AdvertismentType)}`,
} satisfies FastifySchema;

export const updateAdvertismentInverntorySchema = {
  tags: ['advertisment'],
  body: UpdateInventoryDocument,
  response: {
    ...ErrorResponses,
    201: SuccessResponseType(),
  },
} satisfies FastifySchema;

export const getAdvertismentByStatusSchema = {
  tags: ['advertisment'],
  querystring: Type.Object({
    status: Type.Enum(E_STATUS), // Add valid advertisement statuses
  }),
  response: {
    ...ErrorResponses,
    200: SuccessResponseType(Type.Array(AdvertismentType)),
  },
} satisfies FastifySchema;

export const blockAdvertismentSchema = {
  tags: ['advertisment'],
  params: Type.Object({
    advertismentId: Type.String(), // Advertisement ID to block
  }),
  response: {
    ...ErrorResponses,
    201: SuccessResponseType(),
  },
} satisfies FastifySchema;

export const getPublishedAdvertisementsSchema = {
  tags: ['advertisment'],
  response: {
    ...ErrorResponses,
    200: SuccessResponseType(Type.Array(AdvertismentType)),
  },
} satisfies FastifySchema;

export const deleteAdvertismentSchema = {
  tags: ['advertisment'],
  params: Type.Object({
    id: Type.String(), // Expecting the advertisement ID as a path parameter
  }),
  response: {
    ...ErrorResponses,
    200: SuccessResponseType(Type.Array(AdvertismentType)),
  },
} satisfies FastifySchema;

// search
export const searchRequestSchema = {
  tags: ['search'], // Updated tag
  querystring: searchRequestDocument, // Ensure this is a TypeBox schema
  response: {
    ...ErrorResponses,
    200: SuccessResponseType(Type.Array(AdvertismentType)),
  },
} satisfies FastifySchema;

export const getAdvertismentByIdRequestSchema = {
  tags: ['search'], // Updated tag
  params: Type.Object({ id: Type.String() }),
  response: {
    ...ErrorResponses,
    200: SuccessResponseType(AdvertismentType),
  },
} satisfies FastifySchema;
