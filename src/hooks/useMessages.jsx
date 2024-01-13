import {
	fetchAllMessages,
	fetchLatestMessage,
	pushMessage,
} from '../services/messageService'
import { customAlphabet } from 'nanoid'
import React, { useContext, useEffect } from 'react'

const MessagesContext = React.createContext()

export const useMessages = () => {
	return useContext(MessagesContext)
}

export const MessagesProvider = ({ children }) => {
	//получаем и отображаем все сообщения разово + определяем направленность
	function getAllMessages(userName, setDisplayState) {
		useEffect(() => {
			fetchAllMessages((snapshot) => {
				const data = snapshot.val()
				if (data !== null) {
					const messages = Object.values(data)
						.flat()
						.map((message) => {
							const isIncoming = message.userName === userName
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
		}, [userName])
	}

	// получаем и отображаем последнее сообщение
	function getLastMessage(userName, setDisplayState) {
		useEffect(() => {
			fetchLatestMessage((snapshot) => {
				const snapshotVal = snapshot.val()
				if (snapshotVal !== null) {
					const data = Object.values(snapshotVal).map((message) => {
						const isIncoming = message.userName == userName
						return {
							...message,
							isIncoming: isIncoming,
						}
					})
					if (data !== null) {
						const message = Object.values(data)[0]
						setDisplayState((prevState) => {
							const newState = [...prevState, message]
							console.log('Последнее сообщение:', message)
							return newState
						})
					}
				}
			})
		}, [])
	}

	// отправляем сообщение
	function sendMessage(userName, inputState, setInputState) {
		const nanoid = customAlphabet('1234567890abcdef', 12)
		const id = nanoid()
		const addDisplayElement = {
			_id: id,
			userName: userName,
			message: inputState,
			displayTime: new Date().toLocaleTimeString(),
			// fullDate: new Date().toISOString(),
			displayDate: new Date().toLocaleDateString(),
			isIncoming: false,
		}
		pushMessage(addDisplayElement)
		setInputState('')
	}

	return (
		<MessagesContext.Provider value={{ getAllMessages, getLastMessage, sendMessage }}>
			{children}
		</MessagesContext.Provider>
	)
}
