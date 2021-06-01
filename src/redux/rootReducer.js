import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import packsReducer from './packSlice'
import alertReducer from './alertSlice'
import scanReducer from './scanSlice'

const rootReducer = combineReducers({
  user: userReducer,
  packs: packsReducer,
  alert: alertReducer,
  scan: scanReducer,
})

export default rootReducer
