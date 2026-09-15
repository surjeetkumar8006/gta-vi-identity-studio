// Dynamic URL Route Sync for Vice City Empire Studio

export type RoutePath = 
  | '/'
  | '/create'
  | '/identity'
  | '/reputation'
  | '/empire'
  | '/profile'
  | '/wanted'
  | '/export'
  | '/leaderboard';

export const STEP_TO_PATH: Record<number, RoutePath> = {
  1: '/',
  2: '/create',
  3: '/identity',
  4: '/reputation',
  5: '/empire',
  6: '/profile',
  7: '/export',
};

export const PATH_TO_STEP: Record<string, number> = {
  '/': 1,
  '': 1,
  '/create': 2,
  '/identity': 3,
  '/reputation': 4,
  '/empire': 5,
  '/profile': 6,
  '/wanted': 6,
  '/export': 7,
};

export function navigateTo(path: string) {
  if (typeof window !== 'undefined' && window.location.pathname !== path) {
    window.history.pushState({}, '', path + window.location.search);
  }
}

export function getCurrentPath(): string {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname.toLowerCase();
}
