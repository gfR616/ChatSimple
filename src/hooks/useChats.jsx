import { getAllHistory, getAllUserHistory } from '../services/historyService'
import { getAllUsers, getKeys } from '../services/userService'
import React, { useContext } from 'react'

const ChatsContext = React.createContext()

export const UseChats = () => {
	return useContext(ChatsContext)
}

export const ChatsProvider = ({ children }) => {
	async function getAllUserChats(senderUid) {
		const userChats = await getKeys(senderUid)
		const userChatHistory = await getAllUserHistory(userChats)
		console.log(userChats, userChatHistory)
		return userChatHistory
	}

	return (
		<ChatsContext.Provider value={{ getAllUserChats }}>{children}</ChatsContext.Provider>
	)
}
