import {
  getAdvertismentByIdRequestSchema,
  searchRequestSchema,
} from '@/domain/advertisment/advertisment.request-schema';
import {
  getAdvertismentByIdUsecase,
  searchProductsUseCase,
} from '@/domain/advertisment/advertisment.usecase';
import { createErrorResponse, createSuccessResponse } from '@/utils/response';
import { Static, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'; // Import the search use case
import { searchRequestDocument } from '../../../../types/advertisment.type';

const SearchRoute: FastifyPluginAsync = async (fastify) => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      '/',
      { schema: searchRequestSchema },
      async (
        req: FastifyRequest<{
          Querystring: Static<typeof searchRequestDocument>; 
        }>,
        res: FastifyReply,
      ) => {
        try {
          const { productName, categoryName, searchText } = req.query;

          const products = await searchProductsUseCase({
            productName,
            categoryName,
            searchText,
          });

          createSuccessResponse(
            res,
            'Search results fetched successfully!',
            products,
          );
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .get(
      '/:id', 
      {
        schema: getAdvertismentByIdRequestSchema,
      },
      async (
        req: FastifyRequest<{
          Params: { id: string }; 
        }>,
        res: FastifyReply,
      ) => {
        try {
          const { id } = req.params; 

          const advertisment = await getAdvertismentByIdUsecase(id);

          if (!advertisment) {
            return createErrorResponse(
              res,
              'Advertisement not found or inactive',
              404,
            );
          }

          createSuccessResponse(
            res,
            'Advertisement fetched successfully!',
            advertisment,
          );
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    );
};

export default SearchRoute;
