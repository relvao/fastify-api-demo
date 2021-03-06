import Boom from 'boom';
import fastify from 'fastify';
import * as http from 'http';
import template from './html-template';
import * as trovitIreland from './trovit-ireland';

type httpServer = fastify.FastifyInstance<http.Server, http.IncomingMessage, http.ServerResponse>;

export const httpInterface = (server: httpServer) => {
  server.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: {
        sortBy: { type: 'string' },
        sortOrder: { type: 'string' }
      }
    },
    handler: async (request, reply) => {
      // TODO fix types for the accepts plugin
      const accept = (request as any).accepts() // Accepts object
      const sortBy = request.query.sortBy || 'id';
      const sortOrder = request.query.sortOrder || 'asc'
      const data = await trovitIreland.getProperties({
        sortBy,
        sortOrder
      });

      switch (accept.type(['json', 'html'])) {
        case 'json':
          reply.type('application/json').send(data);
          break
        case 'html':
          reply.type('text/html').send(template({ data, sortBy, sortOrder }));
          break
        //
        // We could have other response types like binary data, for example. 
        // Or a template to convert the data to xslx.
        // It's just a matter of adding the right encoder.
        // 
        default:
          reply.send(Boom.notAcceptable('unacceptable'));
          break
      }
    }
  });
};

export default httpInterface;
