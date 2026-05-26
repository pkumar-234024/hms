import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginApi } from './authAPI'
import type { AuthState, LoginCredentials, AuthUser } from './authTypes'

const persisted = typeof window !== 'undefined' ? localStorage.getItem('auth') : null
const parsed = persisted ? JSON.parse(persisted) : null

const initialState: AuthState = {
  user: parsed?.user ?? null,
  accessToken: parsed?.accessToken ?? null,
  refreshToken: parsed?.refreshToken ?? null,
  status: 'idle',
  error: null,
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const resp = await loginApi(credentials)
      return resp
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.status = 'idle'
      state.error = null
      if (typeof window !== 'undefined') localStorage.removeItem('auth')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const payload = action.payload as any
        const user = { ...(payload.user as AuthUser) }
        
        if (payload.accessToken) {
          try {
            const base64Url = payload.accessToken.split('.')[1]
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
            const decoded = JSON.parse(window.atob(base64))
            const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded['role']
            if (role) {
              user.roles = Array.isArray(role) ? role : [role]
            }
          } catch (e) {
            console.error('Error decoding token:', e)
          }
        }

        state.user = user
        state.accessToken = payload.accessToken ?? null
        state.refreshToken = payload.refreshToken ?? null
        state.error = null
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'auth',
            JSON.stringify({ user: state.user, accessToken: state.accessToken, refreshToken: state.refreshToken })
          )
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
