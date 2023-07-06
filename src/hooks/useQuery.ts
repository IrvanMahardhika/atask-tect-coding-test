import querystring from 'query-string';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return querystring.parse(useLocation().search.slice(1)) as {
    [key: string]: string;
  };
};

export default useQuery;
