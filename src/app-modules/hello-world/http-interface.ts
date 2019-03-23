import Boom from 'boom';
import fastify from 'fastify';
import * as http from 'http';
import * as helloWorld from './hello-world';

type httpServer = fastify.FastifyInstance<http.Server, http.IncomingMessage, http.ServerResponse>;

export const httpInterface = (server: httpServer) => {
  server.get('/', async (request, reply) => {
    // TODO fix types for the accepts plugin
    const accept = (request as any).accepts() // Accepts object
    const data = helloWorld.sayHi();

    switch (accept.type(['json', 'html'])) {
      case 'json':
        reply.type('application/json').send(data);
        break
      case 'html':
        reply.type('text/html').send(`<h1>Hi ${data.hello}</h1>`);
        break
      default:
        reply.send(Boom.notAcceptable('unacceptable'));
        break
    }
  });
};

export default httpInterface;
