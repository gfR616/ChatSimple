import messageBase from '../../../base/fireBaseConfig'
import { setUserName } from '../../../store/task'
import ChatInput from './chatInput'
import DialogScreen from './dialogScreen'
import { Box } from '@chakra-ui/react'
import { getDatabase, onValue, push, ref, remove } from 'firebase/database'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Chat = () => {
	const dbRef = useMemo(() => ref(getDatabase(messageBase)), [])
	const dispatch = useDispatch()
	const userName = useSelector((state) => state.user.userName)
	const [inputState, setInputState] = useState('')
	const [displayState, setDisplayState] = useState([])
	const [isIncomingMessage, setIsIncomingMessage] = useState(false)

	useEffect(() => {
		onValue(dbRef, (snapshot) => {
			const data = snapshot.val()
			if (data !== null) {
				const messages = Object.values(data).flat()
				const lastMessageUserName = messages[messages.length - 1].userName
				messages ? setDisplayState(messages) : setDisplayState([])
				if (lastMessageUserName !== userName) {
					setIsIncomingMessage(!isIncomingMessage)
				}
			} else {
				setDisplayState([])
			}
		})
	}, [dbRef])

	useEffect(() => {
		let storedUserName = localStorage.getItem('userName')
		if (!userName && storedUserName) {
			dispatch(setUserName(storedUserName))
		} else if (userName) {
			localStorage.setItem('userName', userName)
		}
	}, [dispatch, userName])

	const handleInputChange = (event) => {
		setInputState(event.target.value)
	}

	const handleSendMessage = () => {
		if (inputState === '') return
		const addDisplayElement = {
			userName: userName,
			message: inputState,
			time: new Date().toLocaleTimeString(),
		}
		push(dbRef, addDisplayElement)
		setInputState('')
	}

	const handleClearScreen = () => {
		remove(dbRef)
	}

	return (
		<Box border="1px solid black" h="100vh" borderRadius={5}>
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
