export type ApiOptions = {
  path: string;
  method: Method;
  headers?: object;
  query?: object;
  data?: object;
  timeout?: number;
  responseType?: string;
};
