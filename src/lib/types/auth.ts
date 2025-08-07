export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  fullname: string
  username: string
  email: string
  password: string
  password_confirmation: string
  tel?: string
  role?: 1 | 2 // 1 for user, 2 for admin
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

export interface Session {
  user: User
  token: string
  isAuthenticated: boolean
}
