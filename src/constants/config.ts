import { REACT_APP_API_URL, REACT_APP_ENVIRONMENT } from '../env';

export const API_URL = REACT_APP_API_URL;

export const IS_PROD = REACT_APP_ENVIRONMENT === 'prod';
export const IS_DEV = REACT_APP_ENVIRONMENT !== 'prod';

export const ITEMS_PER_PAGE = 5;
