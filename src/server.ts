import Fastify from "fastify";

const server = Fastify();

server.get("/", async (request, reply) => {
    return { message: "Hello, from fastify!" };
});

const start = async () => {
    try {
        await server.listen({ port: 3000 });
        console.log("Server at http://localhost:3000");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
