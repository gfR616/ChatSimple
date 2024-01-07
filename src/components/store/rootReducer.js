import { combineReducers } from "@reduxjs/toolkit"
import userSlice from "./task"

const rootReducer = combineReducers({
  user: userSlice
})

export default rootReducer
