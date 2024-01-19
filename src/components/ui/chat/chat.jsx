import { useMessages } from '../../../hooks/useMessages'
import { setDisplayState } from '../../../store/task'
import ChatInput from './chatInput'
import DialogScreen from './dialogScreen'
import { Box } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Chat = ({ userName, senderUid }) => {
	const [inputState, setInputState] = useState('')
	const recipientUid = useSelector((state) => state.all.recipientUid)
	const commonKey = useSelector((state) => state.all.commonKey)
	recipientUid && console.log('recipientUid', recipientUid)
	const textAreaRef = useRef()
	const dispatch = useDispatch()
	//инициализируем получение сообщений
	const { getAllMessages, sendMessage } = useMessages()

	getAllMessages(dispatch, senderUid)

	//
	const handleInputChange = (event) => {
		setInputState(event.target.value)
	}
	// отправляем сообщение
	const handleSendMessage = () => {
		if (inputState === '') return
		recipientUid &&
			commonKey &&
			sendMessage(userName, inputState, setInputState, senderUid, recipientUid, commonKey)
		textAreaRef.current.focus()
	}

	return (
		<Box border="1px solid black" h="95vh" borderRadius={5} bgColor="#776b93">
			<Box>
				<DialogScreen />
			</Box>
			<Box>
				<ChatInput
					onInputChange={handleInputChange}
					onSendMessage={handleSendMessage}
					inputState={inputState}
					textAreaRef={textAreaRef}
				/>
			</Box>
		</Box>
	)
}

export default Chat
