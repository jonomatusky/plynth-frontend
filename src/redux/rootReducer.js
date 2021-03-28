import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import packsReducer from './packSlice'
import alertReducer from './alertSlice'

const rootReducer = combineReducers({
  user: userReducer,
  packs: packsReducer,
  alert: alertReducer,
})

export default rootReducer
