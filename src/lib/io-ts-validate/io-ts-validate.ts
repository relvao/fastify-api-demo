import { left } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { reporter } from 'io-ts-reporters';

const ioTsValidate = <T>(Obj: t.TypeC<any>, data: any): T => {
  const result = Obj.decode(data);

  return result.getOrElseL(val => {
    throw reporter(left(val));
  });
}

export default ioTsValidate;
