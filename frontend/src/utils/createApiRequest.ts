import { API_URL } from '../constants';
import { ApiResponseFailure, ApiResponseSuccess } from '../types';

export const createApiRequest = async <T>(method: string, url: string, data?: any, token?: string) => {
  const response = await fetch(`${API_URL}/${url}`, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      ...token && {
        Authorization: token
      }
    }
  });

  const json = await response.json() as { success: boolean };

  if (!response.ok || !json.success) {
    return Promise.reject(json as ApiResponseFailure);
  }

  return json as ApiResponseSuccess<T>;
};
