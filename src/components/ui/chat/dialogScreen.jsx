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
		<Box
			ref={boxRef}
			bg="#3b093c"
			color="white"
			h="94vh"
			p={3}
			borderRadius={5}
			overflow="auto"
			opacity="0.95"
		>
			{displayState.map((messageObj) => (
				<Box
					key={messageObj._id}
					display="flex"
					justifyContent={messageObj.isIncoming ? 'flex-start' : 'flex-end'}
				>
					<Message
						isIncomingMessage={messageObj.isIncoming}
						message={messageObj.message}
						user={messageObj.userName}
						time={messageObj.displayTime}
						date={messageObj.displayDate}
					/>
				</Box>
			))}
		</Box>
	)
}

export default DialogScreen
