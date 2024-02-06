import { useMessages } from '../../../hooks/useMessages'
import { getUserData } from '../../../services/userService'
import { setDisplayState } from '../../../store/task'
import ChatInput from './chatInput'
import DialogScreen from './dialogScreen'
import RecipientNamePannel from './recipientNamePannel'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Chat = ({ userName, senderUid }) => {
	const chatDisplayName = useSelector((state) => state.all.displayChatName)
	const [inputState, setInputState] = useState('')
	const [recipientName, setResipientName] = useState('')
	const recipientUid = useSelector((state) => state.all.recipientUid)
	const commonKey = useSelector((state) => state.all.commonKey)
	const textAreaRef = useRef()
	//инициализируем получение сообщений
	const { getAllMessages, sendMessage } = useMessages()
	useEffect(() => {
		const fetchData = async () => {
			await getAllMessages(commonKey)
			if (recipientUid) {
				const recipientData = await getUserData(recipientUid)
				setResipientName(recipientData.displayName)
			}
		}
		fetchData()
	}, [commonKey, recipientUid])

	//
	const handleInputChange = (event) => {
		setInputState(event.target.value)
	}

	// отправляем сообщение
	const handleSendMessage = () => {
		if (inputState === '') return
		if (commonKey && recipientName) {
			console.log('commonKey', commonKey)
			sendMessage(
				userName,
				inputState,
				setInputState,
				senderUid,
				commonKey,
				recipientUid,
				recipientName,
			)
			textAreaRef.current.focus()
		}
	}

	return (
		<Box
			h="95vh"
			backgroundImage="chatBg.webp"
			backgroundSize="cover"
			backgroundPosition="center"
		>
			<RecipientNamePannel />
			<DialogScreen />
			<ChatInput
				onInputChange={handleInputChange}
				onSendMessage={handleSendMessage}
				inputState={inputState}
				textAreaRef={textAreaRef}
			/>
		</Box>
	)
}

export default Chat
