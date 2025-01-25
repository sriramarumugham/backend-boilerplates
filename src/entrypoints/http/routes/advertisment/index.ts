//  create advertisment
//   before creatina an advertisment user hast to complet his profile

import {
  blockAdvertismentSchema,
  createAdvertismentRequestSchema,
  deleteAdvertismentSchema,
  getAdvertismentByStatusSchema,
  getPublishedAdvertisementsSchema,
  updateAdvertismentInverntorySchema,
} from '@/domain/advertisment/advertisment.request-schema';
import {
  blockAdvertismentUseCase,
  createAdvertismentUseCase,
  deleteAdvertismentUseCase,
  getAdvertismentByStatus,
  getUserAdvertismentsUsecase,
  updateAdvertismentStatusUseCase,
} from '@/domain/advertisment/advertisment.usecase';
import { AdvertismentTypeRequestType } from '@/types';
import { createAdvertismentData, validateAdvertismentForm } from '@/utils/advertisment.util';
import { getUserIdFromRequestHeader } from '@/utils/auth.util';
import { fileUpload } from '@/utils/file-upload.util';
import { createErrorResponse, createSuccessResponse } from '@/utils/response';
import { Static, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

import * as fs from 'fs';
import { unlink } from 'fs/promises';

import { pipeline } from 'node:stream/promises';
// const dummyImage = "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const AdvertismentRoutes: FastifyPluginAsync = async (fastify) => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      '', {
      schema: createAdvertismentRequestSchema
    },
      async (
        req: FastifyRequest<{
          Body: any;
        }>,
        res: FastifyReply,
      ) => {
        try {
   
          const parts = req.files();
          const uploadedImageUrls: string[] = [];
          let fields={};

          for await (const part of parts) {
            fields = part.fields;

            if (part.type === 'file') {
              try {
                const localFilePath = `${part.filename}`;  

                console.log(`Processing file ${part.filename}...`);
                await pipeline(part.file, fs.createWriteStream(localFilePath));

                const imageUrls = await fileUpload(localFilePath);
                uploadedImageUrls.push(...imageUrls);  
                await unlink(localFilePath);
                console.log(`File ${part.filename} uploaded and local file deleted.`);
              } catch (error) {
                console.error(`Error processing file ${part.filename}:`, error);
              }
            } else {
              console.log('Form field:', part);
            }
          }

          try {
            const user = getUserIdFromRequestHeader(req);
            const payload:any = createAdvertismentData(fields as unknown as any);  
            payload.images = uploadedImageUrls; 
            await createAdvertismentUseCase(payload, user.userId); 
           return createSuccessResponse(res, 'Advertisement created!');
          } catch (error:any) {
            const message = error?.message || 'An unexpected error occurred';
            const statusCode = error?.status || 500;
           return createErrorResponse(res, message, statusCode);
          }
          createSuccessResponse(res, 'Advertisment created!');
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .patch(
      '/inventoryDetails/:id',
      { schema: updateAdvertismentInverntorySchema },
      async (
        req: FastifyRequest<{
          Params: { id: string };
          Body: Static<typeof updateAdvertismentInverntorySchema.body>;
        }>,
        res: FastifyReply,
      ) => {
        try {
          const user = getUserIdFromRequestHeader(req);
          await updateAdvertismentStatusUseCase(
            req.params.id,
            req.body,
            user.userId,
          );
          createSuccessResponse(res, 'Advertisement status updated!');
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .delete(
      '/:id',
      { schema: deleteAdvertismentSchema },
      async (
        req: FastifyRequest<{ Params: { id: string } }>,
        res: FastifyReply,
      ) => {
        try {
          const user = getUserIdFromRequestHeader(req);
          await deleteAdvertismentUseCase(req.params.id, user.userId);
          createSuccessResponse(res, 'Advertisement deleted successfully!');
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .get(
      '/my-advertisements',
      { schema: getPublishedAdvertisementsSchema },
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const user = getUserIdFromRequestHeader(req);
          const advertisments = await getUserAdvertismentsUsecase(user.userId);
          createSuccessResponse(
            res,
            'Advertisements fetched successfully!',
            advertisments,
          );
        } catch (error: any) {
          createErrorResponse(
            res,
            error.message || 'An unexpected error occurred',
            error.status || 500,
          );
        }
      },
    )
    .get(
      '/admin/advertisments',
      { schema: getAdvertismentByStatusSchema }, // Add schema here
      async (
        req: FastifyRequest<{
          Querystring: Static<typeof getAdvertismentByStatusSchema.querystring>;
        }>,
        res: FastifyReply,
      ) => {
        try {
          const admin = getUserIdFromRequestHeader(req);
          const { status } = req.query; // Extract status from query
          const advertisments = await getAdvertismentByStatus(
            admin.userId,
            status,
          );
          createSuccessResponse(
            res,
            'Advertisements fetched successfully!',
            advertisments,
          );
        } catch (error: any) {
          createErrorResponse(
            res,
            error.message || 'An unexpected error occurred',
            error.status || 500,
          );
        }
      },
    )
    .post(
      '/admin/block/:advertismentId',
      { schema: blockAdvertismentSchema }, // Add schema here
      async (
        req: FastifyRequest<{
          Params: Static<typeof blockAdvertismentSchema.params>;
        }>,
        res: FastifyReply,
      ) => {
        try {
          const admin = getUserIdFromRequestHeader(req);
          const { advertismentId } = req.params; // Extract advertisement ID from params
          await blockAdvertismentUseCase(admin.userId, advertismentId); // Call the blocking use case
          createSuccessResponse(res, 'Advertisement blocked successfully!');
        } catch (error: any) {
          createErrorResponse(
            res,
            error.message || 'An unexpected error occurred',
            error.status || 500,
          );
        }
      },
    );
};

export default AdvertismentRoutes;
