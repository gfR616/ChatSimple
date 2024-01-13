import { useMessages } from '../../../hooks/useMessage'
import { clearAllMeassages } from '../../../services/messageService'
import { setUserName } from '../../../store/task'
import ChatInput from './chatInput'
import DialogScreen from './dialogScreen'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Chat = () => {
	const dispatch = useDispatch()
	const userName = useSelector((state) => state.user.userName)
	const [inputState, setInputState] = useState('')
	const [displayState, setDisplayState] = useState([])

	const { getAllMessages, getLastMessage, sendMessage } = useMessages()
	getAllMessages(userName, setDisplayState)
	getLastMessage(userName, setDisplayState)

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
		sendMessage(userName, inputState, setInputState)
	}
	// удаляем все сообщения
	const handleClearScreen = () => {
		clearAllMeassages()
		setDisplayState([])
	}

	return (
		<Box border="1px solid black" h="96vh" borderRadius={5} bgColor="#776b93">
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
