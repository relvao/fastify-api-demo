import fs from 'fs';
import nock from 'nock';
import path from 'path';
import test from 'tape';
import getXml from '../get-xml';
import fixture from './trovit-ireland-fixture';

test('lib/request', async function (t) {

  t.test('getXml', async (st) => {
    const url = 'http://feeds.spotahome.com/trovit-ireland.xml';
    const fixtureBasePath = path.resolve(__dirname);

    var couchdb = nock('http://feeds.spotahome.com')
      .matchHeader('accept', 'application/xml')
      .get('/trovit-ireland.xml')
      .reply(200, fs.readFileSync(path.join(fixtureBasePath, 'trovit-ireland.xml'), 'utf8'));

    const res = await getXml({ url });
    st.deepEqual(res, fixture, 'JS Object from XML data');

    st.end();
  });

});
