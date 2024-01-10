import userReducer from './task'
import { configureStore } from '@reduxjs/toolkit'

function createStore() {
	return configureStore({
		reducer: {
			user: userReducer,
		},
	})
}

export default createStore
