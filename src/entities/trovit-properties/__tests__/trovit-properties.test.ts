import { ThrowReporter } from 'io-ts/lib/ThrowReporter';
import test from 'tape';
import TrovitProperties from '../trovit-properties';
import fixt from './trovit-ireland-fixture';

test('Entities - Trovit Properties', async function (t) {
  t.test('Validate JSON data', async (st) => {
    const result = TrovitProperties.decode(fixt);

    st.doesNotThrow(
      () => ThrowReporter.report(result),
      'Trovit Properties data is valid'
    );

    st.end();
  });
});
