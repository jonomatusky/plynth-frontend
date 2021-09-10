import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../util/client'

let initialState = {
  user: {},
  status: 'idle',
  createStatus: 'idle',
  createMeStatus: 'idle',
  updateStatus: 'idle',
  userListStatus: 'idle',
  subscribeStatus: 'idle',
  error: null,
  scanRoute: '/',
  locationHistory: [],
  users: [],
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ headers, ...rest }) => {
    const { user } = await client.request({
      headers,
      url: '/users/me',
    })
    return user
  }
)

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ headers, ...inputs }) => {
    const { user } = await client.request({
      headers,
      url: '/users',
      method: 'POST',
      data: inputs,
    })
    return user
  }
)

export const createMe = createAsyncThunk(
  'user/createMe',
  async ({ headers, ...inputs }) => {
    const { user } = await client.request({
      headers,
      url: '/users/me',
      method: 'POST',
      data: inputs,
    })
    return user
  }
)

export const subscribe = createAsyncThunk(
  'user/subscribe',
  async ({ headers, ...inputs }) => {
    const res = await client.request({
      headers,
      url: `/users/subscribe`,
      method: 'POST',
      data: inputs,
    })
    return res
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ headers, ...inputs }) => {
    const { user } = await client.request({
      headers,
      url: `/users/me`,
      method: 'PATCH',
      data: inputs,
    })
    return user
  }
)

export const acceptInvite = createAsyncThunk(
  'user/acceptInvite',
  async ({ headers, ...inputs }) => {
    const { user } = await client.request({
      headers,
      url: `/users/invite`,
      method: 'POST',
      data: inputs,
    })
    return user
  }
)

export const fetchUserList = createAsyncThunk(
  'user/fetchUserList',
  async ({ headers }) => {
    const { users } = await client.request({
      headers,
      url: '/users/list',
      method: 'GET',
    })
    return users
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUser(state, action) {
    //   const { user } = action.payload
    //   state.user = user
    // },
    // pushLocation(state, action) {
    //   state.locationHistory = state.locationHistory.concat(action.payload)
    // },
    // clearError(state, action) {
    //   state.error = null
    //   state.status = 'idle'
    // },
    clearUser(state, action) {
      state.status = 'idle'
      state.user = {}
      state.error = null
      state.scanRoute = '/'
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.user = action.payload
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
      state.scanRoute = '/'
    },
    [createUser.pending]: (state, action) => {
      state.createStatus = 'loading'
    },
    [createUser.fulfilled]: (state, action) => {
      state.createStatus = 'succeeded'
      state.user = action.payload
    },
    [createUser.rejected]: (state, action) => {
      state.createStatus = 'failed'
      state.error = action.error.message
    },
    [createMe.pending]: (state, action) => {
      state.createMeStatus = 'loading'
    },
    [createMe.fulfilled]: (state, action) => {
      state.createMeStatus = 'succeeded'
      state.user = action.payload
    },
    [createMe.rejected]: (state, action) => {
      state.createMeStatus = 'failed'
      state.error = action.error.message
    },
    [updateUser.pending]: (state, action) => {
      state.updateStatus = 'loading'
    },
    [updateUser.fulfilled]: (state, action) => {
      state.updateStatus = 'idle'
      state.user = action.payload
    },
    [updateUser.rejected]: (state, action) => {
      state.updateStatus = 'failed'
      state.error = action.error.message
    },
    [fetchUserList.pending]: (state, action) => {
      state.userListStatus = 'loading'
    },
    [fetchUserList.fulfilled]: (state, action) => {
      state.userListStatus = 'succeeded'
      state.users = action.payload
    },
    [fetchUserList.rejected]: (state, action) => {
      state.userListStatus = 'failed'
      state.error = action.error.message
    },
    [acceptInvite.fulfilled]: (state, action) => {
      state.user = action.payload
    },
    [subscribe.pending]: (state, action) => {
      state.subscribeStatus = 'loading'
    },
    [subscribe.fulfilled]: (state, action) => {
      state.subscribeStatus = 'succeeded'
    },
    [subscribe.rejected]: (state, action) => {
      state.subscribeStatus = 'failed'
    },
  },
})

export const { setUser, pushLocation, clearError, clearUser } =
  userSlice.actions

export default userSlice.reducer
