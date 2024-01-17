import { fetchAllMessages, pushMessageInRTDB } from '../services/messageService'
import { customAlphabet } from 'nanoid'
import React, { useContext, useEffect } from 'react'

const MessagesContext = React.createContext()

export const useMessages = () => {
	return useContext(MessagesContext)
}

export const MessagesProvider = ({ children }) => {
	//получаем и отображаем все сообщения + определяем направленность
	function getAllMessages(setDisplayState, senderUid) {
		console.log('UIdInFunction:', senderUid)
		useEffect(() => {
			fetchAllMessages((snapshot) => {
				const data = snapshot.val()
				if (data !== null) {
					const messages = Object.values(data)
						.flat()
						.map((message) => {
							const isIncoming = message.senderUid !== senderUid
							console.log(message)
							// if (!Object.prototype.hasOwnProperty.call(message, 'recipientUid')) {
							// 	message.recipientUid = senderUid
							// }
							return {
								...message,
								isIncoming: isIncoming,
								recipientUid: senderUid,
							}
						})
					messages ? setDisplayState(messages) : setDisplayState([])
					console.log('Все сообщения получены:', messages)
				} else {
					setDisplayState([])
				}
			})
		}, [senderUid])
	}

	// отправляем сообщение
	function sendMessage(userName, inputState, setInputState, senderUid) {
		const nanoid = customAlphabet('1234567890abcdef', 12)
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
		pushMessageInRTDB(addDisplayElement)
		setInputState('')
	}

	return (
		<MessagesContext.Provider value={{ getAllMessages, sendMessage }}>
			{children}
		</MessagesContext.Provider>
	)
}
