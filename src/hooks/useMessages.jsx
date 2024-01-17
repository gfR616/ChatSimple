import { fetchAllMessages, pushMessage } from '../services/messageService'
import { customAlphabet } from 'nanoid'
import React, { useContext, useEffect } from 'react'

const MessagesContext = React.createContext()

export const useMessages = () => {
	return useContext(MessagesContext)
}

export const MessagesProvider = ({ children }) => {
	//получаем и отображаем все сообщения + определяем направленность
	function getAllMessages(setDisplayState, uid) {
		console.log('UIdInFunction:', uid)
		useEffect(() => {
			fetchAllMessages((snapshot) => {
				const data = snapshot.val()
				if (data !== null) {
					const messages = Object.values(data)
						.flat()
						.map((message) => {
							const isIncoming = message.uid !== uid
							console.log(message)
							return {
								...message,
								isIncoming: isIncoming,
							}
						})
					messages ? setDisplayState(messages) : setDisplayState([])
					console.log('Все сообщения получены:', messages)
				} else {
					setDisplayState([])
				}
			})
		}, [uid])
	}

	// отправляем сообщение
	function sendMessage(userName, inputState, setInputState, uid) {
		const nanoid = customAlphabet('1234567890abcdef', 12)
		const id = nanoid()
		const addDisplayElement = {
			_id: id,
			userName: userName,
			uid: uid,
			message: inputState,
			displayTime: new Date().toLocaleTimeString(),
			displayDate: new Date().toLocaleDateString(),
			isIncoming: false,
		}
		pushMessage(addDisplayElement)
		setInputState('')
	}

	return (
		<MessagesContext.Provider value={{ getAllMessages, sendMessage }}>
			{children}
		</MessagesContext.Provider>
	)
}
