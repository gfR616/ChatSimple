import Message from './message'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'

const DialogScreen = ({ displayState, isIncomingMessage }) => {
	const boxRef = useRef()

	useEffect(() => {
		if (boxRef.current) {
			boxRef.current.scrollTop = boxRef.current.scrollHeight
		}
	}, [displayState])
	return (
		<Box
			ref={boxRef}
			bg="#05145e47"
			color="white"
			h="94vh"
			p={3}
			borderRadius={5}
			overflow="auto"
		>
			{displayState.map((messageObj, index) => (
				<Message
					isIncomingMessage={isIncomingMessage}
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
