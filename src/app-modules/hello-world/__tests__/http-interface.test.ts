import axios from 'axios';
import fastifyAccepts from 'fastify-accepts';
import test from 'tape';
import httpServer from '../../../http-server';
import { Unpack } from '../../../lib/types/types';
import helloWorld from '../http-interface';

test('Http Server', async function (t) {
  let server: Unpack<Unpack<typeof httpServer>>;

  // Before All
  t.test('load server', async (st) => {
    server = await httpServer({
      logger: false,
      plugins: [
        { fn: fastifyAccepts }
      ],
      appModules: [
        helloWorld
      ]
    });
    st.end();
  });

  t.test('Request /, accepts JSON', async (st) => {
    const res = await axios.get(`http://localhost:${server.port}`);

    st.equal(res.status, 200, 'HTTP Status');
    st.equal(res.statusText, 'OK', 'Status Text');
    st.deepEqual(res.data, { hello: 'world' }, 'Return Data');

    st.end();
  });

  t.test('Request /, accepts HTML', async (st) => {
    const config = {
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3"
      }
    };
    const res = await axios.get(`http://localhost:${server.port}`, config);

    st.equal(res.status, 200, 'HTTP Status');
    st.equal(res.statusText, 'OK', 'Status Text');
    st.deepEqual(res.data, '<h1>Hi world</h1>', 'Return Data');

    st.end();
  });


  // After All
  t.test('close server', async (st) => {
    await server.close();
    st.end();
  });
});
