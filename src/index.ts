import config from 'config';
import fastifyAccepts from 'fastify-accepts';
import helloWorld from './app-modules/hello-world/http-interface';
import httpServer from './http-server';

httpServer({
  port: config.get<number>('httpPort'),
  plugins: [
    { fn: fastifyAccepts }
  ],
  appModules: [
    helloWorld
  ]
});
