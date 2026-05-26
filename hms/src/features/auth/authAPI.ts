import type { LoginCredentials } from './authTypes'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://localhost:57679'

export interface LoginResponse {
  success: boolean
  message?: string
  user?: any
  accessToken?: string
  refreshToken?: string
  accessTokenExpires?: string
  refreshTokenExpires?: string
}

export async function loginApi(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      // include cookies if backend sets them
      credentials: 'include',
    })

    const text = await res.text()
    let data: LoginResponse | null = null
    try {
      data = JSON.parse(text) as LoginResponse
    } catch (e) {
      // non-JSON response
    }

    if (!res.ok) {
      const errMsg = data?.message ?? text ?? `HTTP ${res.status}`
      throw new Error(errMsg)
    }

    if (!data) throw new Error('Invalid JSON response from server')
    if (!data.success) throw new Error(data.message || 'Login failed')
    return data
  } catch (err) {
    // rethrow with more context for the UI
    const message = err instanceof Error ? err.message : String(err)
    console.error('loginApi error:', message)
    throw new Error(message)
  }
}
