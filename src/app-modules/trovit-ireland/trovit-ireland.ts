import config from 'config';
import TrovitProperties from '../../entities/trovit-properties/trovit-properties';
import validate from '../../lib/io-ts-validate/io-ts-validate';
import getXml from '../../lib/request/get-xml';
import { Property } from './types';

/**
 * no need to send all the available data to the browser
 */
const selectData = (data: TrovitProperties): Property[] => {
  return data.trovit.ad.map((item) => {
    return {
      id: item.id,
      title: item.title,
      url: item.url,
      city: item.city,
      picture: {
        url: item.pictures.picture[0].picture_url,
        title: item.pictures.picture[0].picture_title
      }
    }
  });
};

export const getProperties = async (): Promise<Property[]> => {
  const data = await getXml({ url: config.get<string>('trovitIrelandUrl') });
  const validatedData = validate<TrovitProperties>(TrovitProperties, data);
  const selectedData = selectData(validatedData);

  return selectedData;
};

export default getProperties;
