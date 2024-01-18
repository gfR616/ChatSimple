import allReducer from './task'
import { configureStore } from '@reduxjs/toolkit'

function createStore() {
	return configureStore({
		reducer: {
			all: allReducer,
		},
	})
}

export default createStore
