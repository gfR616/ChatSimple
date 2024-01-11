import base from '../../../base/fireBaseConfig'
import { setUserName } from '../../../store/task'
import ChatInput from './chatInput'
import DialogScreen from './dialogScreen'
import { Box } from '@chakra-ui/react'
import { getDatabase, onValue, push, ref, remove } from 'firebase/database'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Chat = () => {
	const dbRef = useMemo(() => ref(getDatabase(base)), [])
	const dispatch = useDispatch()
	const userName = useSelector((state) => state.user.userName)
	const [inputState, setInputState] = useState('')
	const [displayState, setDisplayState] = useState([])

	useEffect(() => {
		onValue(dbRef, (snapshot) => {
			const data = snapshot.val()
			if (data !== null) {
				const messages = Object.values(data).flat()
				messages ? setDisplayState(messages) : setDisplayState([])
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
		const addDisplayElement = {
			userName: userName,
			message: inputState,
			time: new Date().toLocaleTimeString(),
		}

		push(dbRef, addDisplayElement)
		setInputState('')
	}

	const handleClearScreen = () => {
		localStorage.removeItem('displayState')
		remove(dbRef)
	}

	return (
		<Box border="1px solid black" maxH="100vh" minH="100vh" borderRadius={5}>
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
