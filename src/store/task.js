import { createSlice } from '@reduxjs/toolkit'

const guestSlice = createSlice({
	name: 'guest',
	initialState: { guestName: '' },
	reducers: {
		setGuestName: (state, action) => {
			state.guestName = action.payload
			console.log('ЗАСТОРИЛ имя')
		},
		setGuestId: (state, action) => {
			state.guestId = action.payload
			console.log('ЗАСТОРИЛ идэ')
		},
		displayState: (state, action) => {
			state.displayState = action.payload
		},
	},
})

export const { setGuestName, setGuestId, displayState } = guestSlice.actions
export default guestSlice.reducer
