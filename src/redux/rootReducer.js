import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import packsReducer from './packSlice'
import alertReducer from './alertSlice'
import scanReducer from './scanSlice'
import portalReducer from './portalSlice'

const rootReducer = combineReducers({
  user: userReducer,
  packs: packsReducer,
  alert: alertReducer,
  scan: scanReducer,
  portal: portalReducer,
})

export default rootReducer
