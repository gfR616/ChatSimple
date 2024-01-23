import { pushMessageInStore } from '../services/historyService'
import { getMessagesFromRoom, sendMessageToRoom } from '../services/roomService'
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
				console.log('DATA', data)
				let messages = data ? Object.values(data) : []
				console.log('messages', messages)
				dispatch(setDisplayState(messages))
			})
		}
	}

	// отправляем сообщение
	async function sendMessage(userName, inputState, setInputState, senderUid, commonKey) {
		console.log(userName, inputState, senderUid, commonKey)
		const nanoid = customAlphabet('1234567890abcdef', 30)
		const id = nanoid()
		const addDisplayElement = {
			_id: id,
			userName: userName,
			senderUid: senderUid,
			message: inputState,
			displayTime: new Date().toLocaleTimeString(),
			displayDate: new Date().toLocaleDateString(),
			isIncoming: false,
			commonKey: commonKey,
		}
		console.log('commonKey, addDisplayElement', commonKey, addDisplayElement)
		await sendMessageToRoom(commonKey, addDisplayElement)
		await pushMessageInStore(commonKey, addDisplayElement)
		await setInputState('')
		console.log('Cообщение отправлено', addDisplayElement)
	}

	return (
		<MessagesContext.Provider value={{ getAllMessages, sendMessage }}>
			{children}
		</MessagesContext.Provider>
	)
}
