import axios from 'axios';
import Boom from 'boom';
import xmlParser from 'fast-xml-parser';
import NodeCache from 'node-cache';
import Logger from 'pino';

const logger = Logger(); // TODO global config for log level. Disable for tests
const myCache = new NodeCache({ stdTTL: 360, checkperiod: 120, deleteOnExpire: true });

const fetchFromRemote = (url: string) => {
  const config = {
    headers: {
      Accept: 'application/xml'
    }
  };

  return axios.get(url, config)
    .then((res) => {
      const data = xmlParser.parse(res.data);
      myCache.set(url, data);

      return data;
    })
    .catch((err) => {
      const errDetails = err.response ? `HTTP ${err.response.status} - ${err.response.data}` : 'Bad Data';
      logger.error(`Unable to fetch XML data from ${url}. ${errDetails}`);

      return Promise.reject(Boom.serverUnavailable('Unable to retrieve data from backend'));
    });
}

interface GetXmlArgs {
  url: string;
  cache?: boolean;
}

/**
 * Fetches xml from url and decodes the data into an object 
 */
const getXml = async ({ url, cache = true }: GetXmlArgs) => {
  const cachedData = myCache.get(url);

  if (cache && cachedData) {
    // update in the bg
    fetchFromRemote(url);
    return Promise.resolve(cachedData);
  }

  return fetchFromRemote(url);
}


export default getXml;
