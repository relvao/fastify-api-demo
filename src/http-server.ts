import fastify from 'fastify';
import getPort from 'get-port';
import * as http from 'http';

type httpServer = fastify.FastifyInstance<http.Server, http.IncomingMessage, http.ServerResponse>;

interface HttpServerArgs {
  port?: number;
  logger?: boolean;
  plugins?: { fn: any, config?: any }[];
  appModules: Array<(server: httpServer) => void>;
}

export const startHttpServer = async ({ port, logger = true, plugins = [], appModules }: HttpServerArgs) => {
  if (!port) {
    // see if port is available or find any port available that is higher
    port = await getPort({ port: [8080] });
  }

  const srv = fastify({ logger });
  plugins.forEach((plugin) => srv.register(plugin.fn, plugin.config));
  appModules.forEach((module) => module(srv));

  try {
    await srv.listen(port);
    srv.log.info(`server listening on ${port}`);
  } catch (err) {
    srv.log.error(err);
    process.exit(1);
  }

  return {
    instance: srv,
    close: () => srv.close(),
    port
  }
}

export default startHttpServer;
