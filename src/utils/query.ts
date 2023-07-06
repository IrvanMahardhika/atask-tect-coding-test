import querystring from 'query-string';

export const removeQueryParam = (str: string, param: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [param]: _, ...rest } = querystring.parse(str.substr(1));
  const newStr = querystring.stringify(rest);
  return newStr ? '?' + newStr : newStr;
};
