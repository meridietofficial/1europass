import { apiGet, apiPatch } from './client'
import { ENDPOINTS } from './endpoints'

interface User {
  id: string
  email: string
  name: string
}

export const getMe = () => apiGet<User>(ENDPOINTS.user.me)

export const updateMe = (payload: Partial<Pick<User, 'name' | 'email'>>) =>
  apiPatch<User>(ENDPOINTS.user.update, payload)
