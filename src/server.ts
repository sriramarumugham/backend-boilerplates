

import * as dotenv from "dotenv";

import Fastify from "fastify";

import cors from '@fastify/cors';

import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload'

import app from "./app";




export type AppOptions = {} & Partial<AutoloadPluginOptions>;

const options: AppOptions = {};

const server = Fastify();

dotenv.config();

server.get("/", async (request, reply) => {
  return { message: "Hello, from fastify!" };
});

void server.setErrorHandler(async (error, request, reply) => {
  console.error('Raw Error:', error);
  const isValidationError = !!error.validation;
  if (isValidationError) {
    const errorFields = error?.validation?.map((v) => ({
      field: v.instancePath,
      message: v.message,
    }));

    const response = {
      status: 'Bad Request',
      message: 'Validation error occurred',
      timestamp: new Date().toISOString(),
      errorSource: 'Validation',
      errors: errorFields,
    };

    return reply.status(400).send(response);
  }
  const statusCode = error.statusCode || 500;
  const response = {
    status: 'Error',
    message: error.message || 'Something went wrong',
    timestamp: new Date().toISOString(),
    errorSource: error.name || 'Internal Server Error',
  };
  return reply.status(statusCode).send(response);
});

void server.register(app);



const port = parseInt(process.env.PORT || "4000", 10)

console.log("PORT:", port)

const start = async () => {
  try {
    await server.register(cors, {
      origin: ['*'],
      allowedHeaders: '*',
    });

    await server.listen({ port: port, host: '0.0.0.0' });
    console.log(`Server is running at http://localhost:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
