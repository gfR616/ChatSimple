import { pushMessageInStore } from '../services/historyService'
import { getMessagesFromRoom, sendMessageToRoom } from '../services/roomService'
import { getUserData } from '../services/userService'
import { setDisplayState } from '../store/task'
import { customAlphabet } from 'nanoid'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const MessagesContext = React.createContext()

export const useMessages = () => {
	return useContext(MessagesContext)
}

export const MessagesProvider = ({ children }) => {
	const dispatch = useDispatch()

	//получаем и отображаем все сообщения
	function getAllMessages(commonKey) {
		console.log('коomon ki in HOOK getAllMessages', commonKey)
		if (commonKey) {
			getMessagesFromRoom(commonKey, (snapshot) => {
				const data = snapshot.val()
				let messages = data ? Object.values(data) : []
				messages.sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate))
				dispatch(setDisplayState(messages))
			})
		}
	}

	// отправляем сообщение
	async function sendMessage(
		userName,
		inputState,
		setInputState,
		senderUid,
		commonKey,
		recipientUid,
		recipientName,
	) {
		await setInputState('')
		console.log(userName, inputState, senderUid, commonKey, recipientUid, recipientName)
		const nanoid = customAlphabet('1234567890abcdef', 30)
		const id = nanoid()
		const addDisplayElement = {
			_id: id,
			senderName: userName,
			senderUid: senderUid,
			message: inputState,
			displayTime: new Date().toLocaleTimeString(),
			displayDate: new Date().toLocaleDateString(),
			isoDate: new Date().toISOString(),
			commonKey: commonKey,
			recipientUid: recipientUid,
			recipientName: recipientName,
		}
		console.log('commonKey, addDisplayElement', commonKey, addDisplayElement)
		await sendMessageToRoom(commonKey, addDisplayElement)
		await pushMessageInStore(commonKey, addDisplayElement)

		console.log('Cообщение отправлено', addDisplayElement)
	}

	return (
		<MessagesContext.Provider value={{ getAllMessages, sendMessage }}>
			{children}
		</MessagesContext.Provider>
	)
}
