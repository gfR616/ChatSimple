import {
	clearAllMeassages,
	fetchAllMessages,
	fetchLatestMessage,
	sendMessage,
} from '../../../services/messageService'
import { setUserName } from '../../../store/task'
import ChatInput from './chatInput'
import DialogScreen from './dialogScreen'
import { Box } from '@chakra-ui/react'
import { getAuth } from 'firebase/auth'
import { customAlphabet } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Chat = () => {
	const dispatch = useDispatch()
	const userName = useSelector((state) => state.user.userName)
	const [inputState, setInputState] = useState('')
	const [displayState, setDisplayState] = useState([])
	const user = getAuth().currentUser
	console.log(user)

	// Находим userName
	useEffect(() => {
		let storedUserName = localStorage.getItem('userName')
		if (!userName && storedUserName) {
			dispatch(setUserName(storedUserName))
		} else if (userName) {
			localStorage.setItem('userName', userName)
		}
	}, [dispatch, userName])

	//получаем и отображаем все сообщения разово + определяем направленность
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

		// получаем и отображаем последнее сообщение
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

	//
	const handleInputChange = (event) => {
		setInputState(event.target.value)
	}
	// отправляем сообщение
	const handleSendMessage = () => {
		if (inputState === '') return
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
		sendMessage(addDisplayElement)
		setInputState('')
	}
	// удаляем все сообщения
	const handleClearScreen = () => {
		clearAllMeassages()
		setDisplayState([])
	}

	return (
		<Box border="1px solid black" h="100vh" borderRadius={5} bgColor="#1d0b49">
			<Box>
				<DialogScreen displayState={displayState} onClearScreen={handleClearScreen} />
			</Box>
			<Box>
				<ChatInput
					onInputChange={handleInputChange}
					onSendMessage={handleSendMessage}
					onClearScreen={handleClearScreen}
					inputState={inputState}
				/>
			</Box>
		</Box>
	)
}

export default Chat
