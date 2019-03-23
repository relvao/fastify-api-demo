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

const sortData = (data: Property[], sortBy: string, sortOrder: string) => {
  const newData = [...data]; // prevent sort from mutating the original array
  const isAscending = sortOrder === 'asc';

  newData.sort((itemA, itemB) => {
    const propA = itemA[sortBy];
    const propB = itemB[sortBy];

    return (isAscending ? 1 : -1) * propA.localeCompare(propB);
  });

  return newData;
}

interface GetPropertiesArgs {
  sortBy: string;
  sortOrder: string;
}

export const getProperties = async ({ sortBy, sortOrder }: GetPropertiesArgs): Promise<Property[]> => {
  sortBy = ['id', 'title', 'url', 'city'].includes(sortBy) ? sortBy : 'id';
  sortOrder = ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'asc';

  const data = await getXml({ url: config.get<string>('trovitIrelandUrl') });
  const validatedData = validate<TrovitProperties>(TrovitProperties, data);
  const selectedData = selectData(validatedData);
  // FIXME detect data type and sort accordingly. Numbers are being sorted alphabeticaly
  const sortedData = sortData(selectedData, sortBy, sortOrder);

  return sortedData;
};

export default getProperties;
