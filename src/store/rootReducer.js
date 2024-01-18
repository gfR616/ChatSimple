import allReducer from './task'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	all: allReducer,
})

export default rootReducer
