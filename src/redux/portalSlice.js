import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from '../util/client'

let initialState = {
  portalUser: {},
  status: 'idle',
  error: null,
  cameraError: false,
}

export const fetchPortal = createAsyncThunk(
  'portal/fetchPortal',
  async ({ headers, username, ...rest }) => {
    const { user } = await client.request({
      headers,
      url: `/users/${username}`,
      data: rest,
    })
    return user
  }
)

const portalSlice = createSlice({
  name: 'portal',
  initialState,
  reducers: {
    setCameraError(state, action) {
      state.cameraError = action.payload
    },
  },
  extraReducers: {
    [fetchPortal.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPortal.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.portalUser = action.payload
    },
    [fetchPortal.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export const { setCameraError } = portalSlice.actions

export default portalSlice.reducer
