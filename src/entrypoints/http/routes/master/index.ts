import { loginUseCase } from '@/domain/auth/auth.usecase';
import {
  createCategories,
  createSubCategoriesRequestSchema,
  getCategoriesRequestSchema,
  getSubCategoriesRequestSchema,
} from '@/domain/master/master.request.usecase';
import {
  createCategoryUseCase,
  createOrUpdateCategories,
  createOrUpdateSubcategories,
  createSubcategoryUseCase,
  getAllSubcatagoriesByCatagoriesId,
  getCatagoriesUseCase,
} from '@/domain/master/master.usecase';
import { CategoryDocument, SubcategoryDocument } from '@/types';
import { loginRequestDocument } from '@/types/auth.type';
import { Static, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
  createErrorResponse,
  createSuccessResponse,
} from '../../../../utils/response';

const MasterRoutes: FastifyPluginAsync = async (fastify) => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      '/category',
      {
        schema: createCategories,
      },
      async (
        req: FastifyRequest<{
          Body: CategoryDocument[];
        }>,
        res,
      ) => {
        try {
          await createOrUpdateCategories(req.body);
          createSuccessResponse(res, 'category created!');
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .post(
      '/subcategory',
      {
        schema: createSubCategoriesRequestSchema,
      },
      async (
        req: FastifyRequest<{
          Body: SubcategoryDocument[];
        }>,
        res,
      ) => {
        try {
          await createOrUpdateSubcategories(req.body);
          createSuccessResponse(res, 'subcategory created!');
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .get(
      '/categories',
      {
        schema: getCategoriesRequestSchema,
      },
      async (req, res: FastifyReply) => {
        try {
          const categories = await getCatagoriesUseCase();
          createSuccessResponse(
            res,
            'Categories retrieved successfully',
            categories,
          );
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    )
    .get(
      '/subcatagories/:catagoriesId',
      {
        schema: getSubCategoriesRequestSchema,
      },
      async (req: FastifyRequest<{
        Params: { catagoriesId: string };
      }>, res: FastifyReply) => {
        try {

          const subCatagories =
            await getAllSubcatagoriesByCatagoriesId(req?.params?.catagoriesId as string);
          createSuccessResponse(
            res,
            'Sub catagories retrieved successfully',
            subCatagories,
          );
        } catch (error: any) {
          const message = error.message || 'An unexpected error occurred';
          const statusCode = error.status || 500;
          createErrorResponse(res, message, statusCode);
        }
      },
    );
};

export default MasterRoutes;
