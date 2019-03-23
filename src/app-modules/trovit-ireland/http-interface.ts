import Boom from 'boom';
import fastify from 'fastify';
import * as http from 'http';
import template from './html-template';
import * as trovitIreland from './trovit-ireland';

type httpServer = fastify.FastifyInstance<http.Server, http.IncomingMessage, http.ServerResponse>;

export const httpInterface = (server: httpServer) => {
  server.get('/', async (request, reply) => {
    // TODO fix types for the accepts plugin
    const accept = (request as any).accepts() // Accepts object
    const data = await trovitIreland.getProperties();

    switch (accept.type(['json', 'html'])) {
      case 'json':
        reply.type('application/json').send(data);
        break
      case 'html':
        reply.type('text/html').send(template(data));
        break
      default:
        reply.send(Boom.notAcceptable('unacceptable'));
        break
    }
  });
};

export default httpInterface;
