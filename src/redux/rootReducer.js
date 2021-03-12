import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import packsReducer from './packSlice'

const rootReducer = combineReducers({
  user: userReducer,
  packs: packsReducer,
})

export default rootReducer
