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
	},
})

export const { setGuestName, setGuestId } = guestSlice.actions
export default guestSlice.reducer
