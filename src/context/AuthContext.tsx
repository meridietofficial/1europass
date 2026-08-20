import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  full_name: string
  email: string
  phone_code: string | null
  phone_number: string | null
  is_email_verified: boolean
  is_active: boolean
  profile_picture: string | null
  country: string | null
  state: string | null
  city: string | null
  dob: string | null
  language: string | null
  role: string
  created_at: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}

const TOKEN_KEY = '1europass_token'
const USER_KEY  = '1europass_user'
const AuthContext = createContext<AuthContextType | null>(null)

function readUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]   = useState<User | null>(readUser)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))

  function login(user: User, token: string) {
    setUser(user)
    setToken(token)
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
