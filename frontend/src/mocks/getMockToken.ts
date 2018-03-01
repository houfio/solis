import { createMockResponse } from '../utils/createMockResponse';
import { Token } from '../types';

export const getMockToken = () => createMockResponse<Token>({
  token: 'mock-token'
});
