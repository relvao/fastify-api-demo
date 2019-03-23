import axios from 'axios';
import xmlParser from 'fast-xml-parser';

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
  const res = await axios.get(url, config);
  // TODO error handling

  return xmlParser.parse(res.data);
}

export default getXml;
