import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

export const users = [
  {
    id: '1sada213',
    username: 'thawatchai',
    email: 'thawatchai@test.com',
    password: '123456'
  },
  {
    id: 'bsadl123',
    username: 'Wanchai',
    email: 'wanchai@test.com',
    password: '123abc'
  }
]
type AuthState = {
  user: User | any
  isLoading: boolean
  error: string
}

type User = {
  id: string
  username: string
  email: string
  password: string
}

const initialState: AuthState = {
  user: '',
  isLoading: false,
  error: ''
}

const signIn = (email: string, password: string) => {
  return new Promise<User | any>((resolve, reject) => {
    const foundUser = _.find(users, (user) => user.email === email && user.password === password)

    setTimeout(() => {
      if (foundUser) {
        resolve(foundUser)
      } else {
        reject('Email or password is invalid')
      }
    }, 3000)
  })
}

export const signInAsync = createAsyncThunk('signin', async ({ email, password }: { email: string; password: string }) => {
  try {
    return await signIn(email, password)
  } catch (error) {
    console.log(error)
    throw error
  }
})

export const authSlices = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    signOut: (state) => {
      state.user = null
      state.isLoading = false
      state.error = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signInAsync.pending, (state) => {
      state.isLoading = true
      state.error = ''
    })
    builder.addCase(signInAsync.fulfilled, (state, action) => {
      state.user = action.payload
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(signInAsync.rejected, (state, action) => {
      state.user = null
      state.isLoading = false
      state.error = action.error.message || ''
    })
  }
})

export const { signOut } = authSlices.actions

export default authSlices.reducer
