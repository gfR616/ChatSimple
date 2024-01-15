import guestReducer from './task'
import { configureStore } from '@reduxjs/toolkit'

function createStore() {
	return configureStore({
		reducer: {
			guest: guestReducer,
		},
	})
}

export default createStore
