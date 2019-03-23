import config from 'config';
import fastifyAccepts from 'fastify-accepts';
import trovitIreland from './app-modules/trovit-ireland/http-interface';
import httpServer from './http-server';

httpServer({
  port: config.get<number>('httpPort'),
  plugins: [
    { fn: fastifyAccepts }
  ],
  appModules: [
    trovitIreland
  ]
});
