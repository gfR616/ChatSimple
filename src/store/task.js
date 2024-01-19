import { createSlice } from '@reduxjs/toolkit'

const allSlice = createSlice({
	name: 'all',
	initialState: { guestName: '', guestId: '', displayState: '', recipientUid: '' },
	reducers: {
		setGuestName: (state, action) => {
			state.guestName = action.payload
			console.log('ЗАСТОРИЛ guestName', state.guestName)
		},
		setGuestId: (state, action) => {
			state.guestId = action.payload
			console.log('ЗАСТОРИЛ guestId', state.guestId)
		},
		setDisplayState: (state, action) => {
			state.displayState = action.payload
			console.log('ЗАСТОРИЛ displayState', state.displayState)
		},
		setRecipientUid: (state, action) => {
			state.recipientUid = action.payload
			console.log('ЗАСТОРИЛ recipientUid', state.recipientUid)
		},
	},
})

export const { setGuestName, setGuestId, setDisplayState, setRecipientUid } =
	allSlice.actions
export default allSlice.reducer
