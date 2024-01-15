import { useMessages } from '../../../hooks/useMessages'
import { useUsers } from '../../../hooks/useUsers'
import { clearAllMeassages } from '../../../services/messageService'
// import { setUserName } from '../../../store/task'
import ChatInput from './chatInput'
import DialogScreen from './dialogScreen'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Chat = ({ userName }) => {
	const dispatch = useDispatch()

	const [inputState, setInputState] = useState('')
	const [displayState, setDisplayState] = useState([])

	//инициализируем получение сообщений
	const { getAllMessages, getLastMessage, sendMessage } = useMessages()
	getAllMessages(userName, setDisplayState)
	getLastMessage(userName, setDisplayState)

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
