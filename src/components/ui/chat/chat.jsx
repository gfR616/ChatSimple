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
import { customAlphabet, nanoid } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Chat = () => {
	const dispatch = useDispatch()
	const userName = useSelector((state) => state.user.userName)
	const [inputState, setInputState] = useState('')
	const [displayState, setDisplayState] = useState([])
	const [isIncomingMessage, setIsIncomingMessage] = useState({})

	//получаем и отображаем все сообщения разово + определяем направленность
	useEffect(() => {
		fetchAllMessages((snapshot) => {
			const data = snapshot.val()
			if (data !== null) {
				const messages = Object.values(data)
					.flat()
					.map((message) => {
						const isIncoming = message.userName !== userName
						return {
							...message,
							isIncoming: message.userName !== userName,
						}
					})
				messages ? setDisplayState(messages) : setDisplayState([])
				console.log('Все сообщения получены:', messages)
			} else {
				setDisplayState([])
			}
		})
	}, [])
	// получаем и отображаем последнее сообщение
	useEffect(() => {
		fetchLatestMessage((snapshot) => {
			const snapshotVal = snapshot.val()
			console.log(snapshotVal)
			if (snapshotVal !== null) {
				const data = Object.values(snapshotVal).map((message) => ({
					...message,
					isIncoming: message.userName !== userName,
				}))
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
	// Находим userName
	useEffect(() => {
		let storedUserName = localStorage.getItem('userName')
		if (!userName && storedUserName) {
			dispatch(setUserName(storedUserName))
		} else if (userName) {
			localStorage.setItem('userName', userName)
		}
	}, [dispatch, userName])
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
			time: new Date().toLocaleTimeString(),
			date: new Date().toISOString(),
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
				<DialogScreen
					displayState={displayState}
					onClearScreen={handleClearScreen}
					isIncomingMessage={isIncomingMessage}
				/>
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
