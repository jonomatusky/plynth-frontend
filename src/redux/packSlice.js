import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as client from 'util/client'

let initialState = {
  packs: [],
  status: 'idle',
  error: null,
  updateStatus: 'idle',
  createStatus: 'idle',
}

export const fetchPacks = createAsyncThunk(
  'packs/fetchPacks',
  async ({ headers }) => {
    const { packs } = await client.request({
      headers,
      url: '/users/me/packs',
    })
    return packs
  }
)

export const createPack = createAsyncThunk(
  'packs/createPack',
  async ({ headers, ...inputs }) => {
    const { pack } = await client.request({
      headers,
      url: `/packs`,
      method: 'POST',
      data: inputs,
    })
    return pack
  }
)

export const updatePack = createAsyncThunk(
  'packs/updatePack',
  async ({ headers, id, ...inputs }) => {
    const { pack } = await client.request({
      headers,
      url: `/packs/${id}`,
      method: 'PATCH',
      data: inputs,
    })
    return pack
  }
)

export const deletePack = createAsyncThunk(
  'packs/deletePack',
  async ({ headers, id, ...rest }) => {
    await client.request({ headers, url: `/packs/${id}`, method: 'DELETE' })
    return id
  }
)

const packsSlice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPacks(state, action) {
      const { packs } = action.payload
      state.packs = packs
    },
    setNewPackImage(state, action) {
      state.newPackImage = action.payload
    },
    clearPacks(state, action) {
      state.packs = null
      state.newPackImage = null
      state.status = 'idle'
      state.error = null
      state.updateStatus = 'idle'
      state.createStatus = 'idle'
    },
    setFilter(state, action) {
      state.filter = action.payload
    },
  },
  extraReducers: {
    [fetchPacks.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPacks.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.packs = action.payload
    },
    [fetchPacks.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updatePack.pending]: (state, action) => {
      state.updateStatus = 'loading'
    },
    [updatePack.fulfilled]: (state, action) => {
      state.updateStatus = 'idle'
      const updatedPack = action.payload
      const matchingIndex = state.packs.findIndex(
        pack => pack.id === updatedPack.id
      )

      if (matchingIndex >= 0) {
        state.packs = [
          ...state.packs.slice(0, matchingIndex),
          ...state.packs.slice(matchingIndex + 1),
        ]
      }
      state.packs = [updatedPack, ...state.packs]
    },
    [updatePack.rejected]: (state, action) => {
      state.updateStatus = 'failed'
      state.error = action.error.message
    },
    [createPack.pending]: (state, action) => {
      state.createStatus = 'loading'
    },
    [createPack.fulfilled]: (state, action) => {
      state.createStatus = 'idle'
      const pack = action.payload
      state.packs = [pack, ...state.packs]
    },
    [createPack.rejected]: (state, action) => {
      state.createStatus = 'failed'
      state.error = action.error.message
    },
    [deletePack.fulfilled]: (state, action) => {
      const id = action.payload
      const matchingIndex = state.packs.findIndex(pack => pack.id === id)

      if (matchingIndex >= 0) {
        state.packs = [
          ...state.packs.slice(0, matchingIndex),
          ...state.packs.slice(matchingIndex + 1),
        ]
      }
    },
  },
})

export const { setPacks, setPack, setNewPackImage, clearPacks, setFilter } =
  packsSlice.actions

export default packsSlice.reducer

export const selectPack = (state, packId) => {
  return (state.packs.packs || []).find(pack => pack.id === packId)
}
