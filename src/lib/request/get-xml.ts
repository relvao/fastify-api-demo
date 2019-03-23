import axios from 'axios';
import Boom from 'boom';
import xmlParser from 'fast-xml-parser';
import Logger from 'pino';

// TODO global config for log level. Disable for tests
const logger = Logger();

interface GetXmlArgs {
  url: string;
}

/**
 * Fetches xml from url and decodes the data into an object 
 */
const getXml = async ({ url }: GetXmlArgs) => {
  const config = {
    headers: {
      Accept: 'application/xml'
    }
  };

  return axios.get(url, config)
    .then((res) => {
      return xmlParser.parse(res.data);
    })
    .catch((err) => {
      const errDetails = err.response ? `HTTP ${err.response.status} - ${err.response.data}` : 'Bad Data';
      logger.error(`Unable to fetch XML data from ${url}. ${errDetails}`);

      return Promise.reject(Boom.serverUnavailable('Unable to retrieve data from backend'));
    });
}

export default getXml;
