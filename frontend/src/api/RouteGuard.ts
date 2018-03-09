export type RouteGuardTypes = 'auth' | 'no_auth';

export type RouteGuard = {
  type: RouteGuardTypes,
  target: number
};
