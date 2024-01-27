import { createSlice } from '@reduxjs/toolkit'

const allSlice = createSlice({
	name: 'all',
	initialState: {
		guestName: '',
		guestId: '',
		displayState: [],
		recipientUid: '',
		commonKey: '',
		roomId: '',
		displayChatName: '',
	},
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
		setCommonKey: (state, action) => {
			state.commonKey = action.payload
			console.log('ЗАСТОРИЛ commonKey', state.commonKey)
		},
		setRoomId: (state, action) => {
			state.roomId = action.payload
			console.log('ЗАСТОРИЛ roomId', state.roomId)
		},
		setDisplayChatName: (state, action) => {
			state.displayChatName = action.payload
			console.log('ЗАСТОРИЛ displayChatName', state.displayChatName)
		},
	},
})

export const {
	setGuestName,
	setGuestId,
	setDisplayState,
	setRecipientUid,
	setCommonKey,
	setRoomId,
	setDisplayChatName,
} = allSlice.actions
export default allSlice.reducer
