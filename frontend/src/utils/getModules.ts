import { auth } from '../modules/auth';
import { http } from '../modules/http';
import { content } from '../modules/content';

export const getModules = () => [
  auth,
  content,
  http
];
