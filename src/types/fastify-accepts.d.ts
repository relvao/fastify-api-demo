declare module 'fastify-accepts' {
  import * as fastify from 'fastify';

  function fastifyAccepts<HttpServer, HttpRequest, HttpResponse, T>(
    instance: fastify.FastifyInstance<HttpServer, HttpRequest, HttpResponse>,
    opts: T, callback?: (err?: Error) => void
  ): void;

  export = fastifyAccepts;
}
