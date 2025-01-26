import {
  createReferredUserDocument,
  CreateUserDocument,
  FilteredUserDocument,
  UpdateUserProfileDocument,
} from '@/types';
import { loginResponseDocument } from '@/types/auth.type';
import { ErrorResponses, SuccessResponseType } from '@/types/response.type';
import { FastifySchema } from 'fastify';

export const createUserRequestSchema = {
  tags: ['auth'],
  body: CreateUserDocument,
  response: {
    ...ErrorResponses,
    201: SuccessResponseType(loginResponseDocument),
  },
} satisfies FastifySchema;

export const updateUserProfile = {
  tags: ['user'],
  security: [{ bearerAuth: [] }],
  body: UpdateUserProfileDocument,
  response: {
    ...ErrorResponses,
    201: SuccessResponseType(),
  },
} satisfies FastifySchema;

export const getUserProfile = {
  tags: ['user'],
  security: [{ bearerAuth: [] }],
  response: {
    ...ErrorResponses,
    200: SuccessResponseType(FilteredUserDocument),
  },
} satisfies FastifySchema;
