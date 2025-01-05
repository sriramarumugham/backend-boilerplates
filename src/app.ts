import { connectDb } from "./data-access/db/db.config";

import AutoLoad, { type AutoloadPluginOptions } from '@fastify/autoload';


import * as dotenv from 'dotenv';
import { FastifyPluginAsync } from "fastify";

dotenv.config();

import { join } from 'path';


export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const options: AppOptions = {};


const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts,
): Promise<void> => {

    void fastify.register(AutoLoad, {
    dir: join(__dirname, './plugins'),
    options: opts,
  });

    void fastify.register(AutoLoad, {
       dir: join(__dirname, './entrypoints/http/routes'),
       options: { ...options, prefix: 'cayiba/api/v1' },
     });
      
  connectDb();
}


export default app;
export { app, options };

