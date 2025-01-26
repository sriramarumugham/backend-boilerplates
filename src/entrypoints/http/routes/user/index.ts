import { getUserProfile, updateUserProfile } from '@/domain/user/user.request.schema';
import { getUerById, updateUserProfileUseCase } from '@/domain/user/user.usecase';
import { UpdateUserProfileType } from '@/types';
import { getUserIdFromRequestHeader } from '@/utils/auth.util';
import { createErrorResponse, createSuccessResponse } from '@/utils/response';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

const UserRoutes: FastifyPluginAsync = async (fastify) => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>() // Ensure this is correctly applied
    .patch(
      '',
      {
        schema: updateUserProfile
      },
      async (
        req: FastifyRequest<{
          Body: UpdateUserProfileType;
        }>,
        res: FastifyReply,
      ) => {
        try {
          const user = getUserIdFromRequestHeader(req);
          const updateData = req.body;

          const updatedUser = await updateUserProfileUseCase(
            user.userId,
            updateData,
          );

          createSuccessResponse(
            res,
            'User profile updated successfully!',
          );
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    ).get(
      '',
      {
        schema: getUserProfile
      },
      async (
        req: FastifyRequest,
        res: FastifyReply,
      ) => {
        try {
          const user = getUserIdFromRequestHeader(req);

          const userDetails = await getUerById(user.userId,);

          createSuccessResponse(
            res,
            'User profile fetched successfully!',
            userDetails,
          );
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    );
};
export default UserRoutes;
