import { useMessages } from '../../../hooks/useMessages'
import ChatInput from './chatInput'
import DialogScreen from './dialogScreen'
import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'

const Chat = ({ userName, uid, setDisplayState, displayState }) => {
	const [inputState, setInputState] = useState('')

	//инициализируем получение сообщений
	const { getAllMessages, sendMessage } = useMessages()
	getAllMessages(setDisplayState, uid)

	//
	const handleInputChange = (event) => {
		setInputState(event.target.value)
	}
	// отправляем сообщение
	const handleSendMessage = () => {
		if (inputState === '') return
		sendMessage(userName, inputState, setInputState, uid)
	}

	return (
		<Box border="1px solid black" h="96vh" borderRadius={5} bgColor="#776b93">
			<Box>
				<DialogScreen displayState={displayState} />
			</Box>
			<Box>
				<ChatInput
					onInputChange={handleInputChange}
					onSendMessage={handleSendMessage}
					inputState={inputState}
				/>
			</Box>
		</Box>
	)
}

export default Chat
