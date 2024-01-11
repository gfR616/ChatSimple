import messageBase from '../../../base/fireBaseConfig'
import {
	clearAllMeassages,
	fetchAllMessages,
	fetchLatestMessage,
	initializeMessagesNode,
	sendMessage,
} from '../../../services/messageService'
import { setUserName } from '../../../store/task'
import ChatInput from './chatInput'
import DialogScreen from './dialogScreen'
import { Box } from '@chakra-ui/react'
import { getDatabase, onValue, push, ref, remove } from 'firebase/database'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Chat = () => {
	const dispatch = useDispatch()
	const userName = useSelector((state) => state.user.userName)
	const [inputState, setInputState] = useState('')
	const [displayState, setDisplayState] = useState([])
	const [isIncomingMessage, setIsIncomingMessage] = useState(false)

	//получаем и отображаем все сообщения разово
	useEffect(() => {
		fetchAllMessages((snapshot) => {
			const data = snapshot.val()
			if (data !== null) {
				const messages = Object.values(data).flat()
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
			const data = snapshot.val()
			if (data) {
				const message = Object.values(data)[0]
				setDisplayState((prevState) => {
					const newState = [...prevState, message]
					console.log('Последнее сообщение:', message)
					console.log('стейт после добавления', newState)
					return newState
				})
			}
		})
	}, [])
	//Получаем userName из lockalStorage
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
		const addDisplayElement = {
			userName: userName,
			message: inputState,
			time: new Date().toLocaleTimeString(),
		}
		sendMessage(addDisplayElement)
		setInputState('')
	}
	// удаляем все сообщения
	const handleClearScreen = () => {
		clearAllMeassages()
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
