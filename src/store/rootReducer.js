import userSlice from './task'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	user: userSlice,
})

export default rootReducer
