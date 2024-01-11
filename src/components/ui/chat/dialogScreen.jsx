import Message from './message'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'

const DialogScreen = ({ displayState }) => {
	const boxRef = useRef()

	useEffect(() => {
		if (boxRef.current) {
			boxRef.current.scrollTop = boxRef.current.scrollHeight
		}
	}, [displayState])
	return (
		<Box ref={boxRef} bg="#05145e47" color="white" minH="94vh" p={3} borderRadius={5}>
			{displayState.map((messageObj, index) => (
				<Message
					key={index}
					message={messageObj.message}
					user={messageObj.userName}
					time={messageObj.time}
				/>
			))}
		</Box>
	)
}

export default DialogScreen
