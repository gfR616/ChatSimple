import { pushMessageInStore } from '../services/historyService'
import { getMessagesFromRoom, sendMessageToRoom } from '../services/roomService'
import { setDisplayState } from '../store/task'
import { customAlphabet } from 'nanoid'
import React, { useContext, useEffect } from 'react'

const MessagesContext = React.createContext()

export const useMessages = () => {
	return useContext(MessagesContext)
}

export const MessagesProvider = ({ children }) => {
	//получаем и отображаем все сообщения

	function getAllMessages(dispatch, commonKey) {
		useEffect(() => {
			getMessagesFromRoom(
				commonKey,
				(snapshot) => {
					const data = snapshot.val()
					console.log('ДАТА', data)
					let messages = Object.values(data ?? [])
					console.log('messages', messages)
					dispatch(setDisplayState(messages))
				},
				[],
			)
		})
	}

	// отправляем сообщение
	async function sendMessage(
		userName,
		inputState,
		setInputState,
		senderUid,
		recipientUid,
		commonKey,
	) {
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
		}
		console.log('commonKey, addDisplayElement', commonKey, addDisplayElement)
		await sendMessageToRoom(commonKey, addDisplayElement)
		await pushMessageInStore(addDisplayElement, senderUid, recipientUid, commonKey)
		await setInputState('')
		console.log('Cообщение отправлено', addDisplayElement)
	}

	return (
		<MessagesContext.Provider value={{ getAllMessages, sendMessage }}>
			{children}
		</MessagesContext.Provider>
	)
}
