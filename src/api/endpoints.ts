export const ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    googleLogin: '/api/auth/google',
    logout: '/api/auth/logout',
  },
  user: {
    me: '/api/user/me',
    update: '/api/user/me',
  },
} as const
