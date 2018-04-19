import { API_URL } from '../constants';
import { ApiResponse, Token } from '../types';

export const createApiRequest =
  <T>(method: string, url: string, data?: any, token?: Token) => fetch(`${API_URL}/${url}`, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      ...token && {
        Authorization: token.token
      }
    }
  }).then((response) => response.json()) as Promise<ApiResponse<T>>;
