export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  firstName?: string
  lastName?: string
  email: string
  phoneNumber?: string | null
  profilePicture?: string
  hospitalId?: string | null
  hospitalName?: string
  createdAt?: string
  roles?: string[]
}

export interface AuthState {
  user: AuthUser | null
  accessToken?: string | null
  refreshToken?: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}
