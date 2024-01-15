import { createSlice } from '@reduxjs/toolkit'

const guestSlice = createSlice({
	name: 'guest',
	initialState: { guestName: '' },
	reducers: {
		setGuestName: (state, action) => {
			state.guestName = action.payload
		},
	},
})

export const { setGuestName } = guestSlice.actions
export default guestSlice.reducer
