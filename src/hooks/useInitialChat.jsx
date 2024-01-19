import { getChatHistory, initialHistory } from '../services/historyService'
import { createNewRoom } from '../services/roomService'
import { getKeys } from '../services/userService'
import { setCommonKey } from '../store/task'
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'

const InitializeContext = React.createContext()

export const useMessages = () => {
	return useContext(InitializeContext)
}
export const InitialChatProvider = ({ children }) => {
	const dispatch = useDispatch

	async function InitialChat(senderUid, recipientUid) {
		try {
			const senderKeys = await getKeys(senderUid)
			const recipientKeys = await getKeys(recipientUid)
			const commonKey = await senderKeys.find((key) => recipientKeys.includes(key))
			if (commonKey) {
				const newRoom = createNewRoom()
				const chatHistory = await getChatHistory(commonKey)
				console.log('ROOOOOOOOOOOOOOOOOM', newRoom)

				// pushMessageInRTDB(chatHistory.messages)

				console.log('Чат создан, история загружена!')
				dispatch(setCommonKey(commonKey))
			} else {
				await initialHistory(senderUid, recipientUid)
				console.log('История инициализирована!')
				const senderKeys = await getKeys(senderUid)
				const recipientKeys = await getKeys(recipientUid)
				const commonKey = await senderKeys.find((key) => recipientKeys.includes(key))
				if (commonKey) {
					const chatHistory = await getChatHistory(commonKey)

					// pushMessageInRTDB(chatHistory.messages)

					console.log('Чат создан, история загружена!')
					dispatch(setCommonKey(commonKey))
				}
				console.log('чат создан, истории еще нет')
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
