docker build -t fastify-app .
docker run -d -p 4000:4000 --name fastify-container fastify-app
