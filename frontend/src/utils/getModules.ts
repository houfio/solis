import { admin } from '../modules/admin';
import { auth } from '../modules/auth';
import { content } from '../modules/content';
import { http } from '../modules/http';

export const getModules = () => [
  auth,
  content,
  http,
  admin
];
