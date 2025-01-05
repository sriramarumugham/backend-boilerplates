

import * as dotenv from "dotenv";

import Fastify from "fastify";

const server = Fastify();

dotenv.config();

server.get("/", async (request, reply) => {
    return { message: "Hello, from fastify!" };
});


const port = parseInt(process.env.PORT || "4000", 10)

console.log("PORT:",port)

const start = async () => {
    try {
        await server.listen({ port: port, host: '0.0.0.0' });
        console.log(`Server is running at http://localhost:${port}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
