import { getChatHistory, initialHistory } from '../services/historyService'
import { addMessagesToRoom } from '../services/roomService'
import { getKeys } from '../services/userService'
import { setCommonKey, setDisplayState } from '../store/task'
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'

const InitializeContext = React.createContext()

export const useInitialChat = () => {
	return useContext(InitializeContext)
}
export const InitialChatProvider = ({ children }) => {
	const dispatch = useDispatch()

	async function InitialChat(senderUid, recipientUid) {
		try {
			const senderKeys = await getKeys(senderUid)
			const recipientKeys = await getKeys(recipientUid)
			const commonKey = await senderKeys.find((key) => recipientKeys.includes(key))
			console.log('commonKey', commonKey)

			if (!commonKey) {
				await initialHistory(senderUid, recipientUid)
				console.log('История инициализирована!')
				const senderKeys = await getKeys(senderUid)
				const recipientKeys = await getKeys(recipientUid)
				const commonKey = await senderKeys.find((key) => recipientKeys.includes(key))
				dispatch(setCommonKey(commonKey))
				console.log('чат создан, истории еще нет')
			} else if (commonKey) {
				const chatHistory = await getChatHistory(commonKey)
				dispatch(setCommonKey(commonKey))
				chatHistory !== null && chatHistory !== undefined
					? await addMessagesToRoom(commonKey, chatHistory)
					: dispatch(setDisplayState([]))
			}
		} catch (error) {
			console.error('Ошибка при открытии чата:', error)
		}
	}
	return (
		<InitializeContext.Provider value={{ InitialChat }}>
			{children}
		</InitializeContext.Provider>
	)
}
