export const ENDPOINTS = {
  auth: {
    login: '/api/v1/auth/login',
    register: '/api/v1/auth/register',
    googleLogin: '/api/auth/google',
    logout: '/api/auth/logout',
  },
  locations: {
    countries: '/api/v1/locations/countries',
    states: '/api/v1/locations/states',
    cities: '/api/v1/locations/cities',
  },
  user: {
    me: '/api/user/me',
    update: '/api/user/me',
  },
  categories: {
    list: '/api/v1/categories',
  },
  housing: {
    list: '/api/v1/housing/list',
    create: '/api/v1/housing',
    get: (id: string) => `/api/v1/housing/${id}`,
    view: (id: string) => `/api/v1/housing/${id}/view`,
    update: (id: string) => `/api/v1/housing/${id}`,
    status: (id: string) => `/api/v1/housing/${id}/status`,
    delete: (id: string) => `/api/v1/housing/${id}`,
  },
  listings: {
    my: '/api/v1/listings/my',
  },
  cloudinaryAuth: '/api/v1/cloudinary-auth',
} as const
