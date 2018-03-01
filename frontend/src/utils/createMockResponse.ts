import { ApiResponse } from '../types';

export const createMockResponse = <T>(data: T, canFail = false): Promise<ApiResponse<T>> => {
  const random = Math.random();
  let response: ApiResponse<T> = {
    success: true,
    data
  };

  if (canFail && random < 1 / 8) {
    response = {
      success: false,
      code: 418,
      message: 'Mock error'
    };
  }

  return new Promise((resolve, reject) => {
    setTimeout(
      () => response.success ? resolve(response) : reject(response),
      Math.random() * 1000
    );
  });
};
