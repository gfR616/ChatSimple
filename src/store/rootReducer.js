import guestSlice from './task'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	guest: guestSlice,
})

export default rootReducer
