export type RouteGuard = 'auth' | 'no_auth';

export type RouteGuards = {
  [G in RouteGuard]?: number
};
