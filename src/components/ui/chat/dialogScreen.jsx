import Message from './message'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const DialogScreen = () => {
	const boxRef = useRef()
	const displayState = useSelector((state) => state.all.displayState)
	useEffect(() => {
		if (boxRef.current) {
			boxRef.current.scrollTop = boxRef.current.scrollHeight
		}
	}, [displayState])

	return (
		<Box
			ref={boxRef}
			bg="#9ab092"
			color="white"
			h="84vh"
			p={3}
			borderRadius={5}
			overflow="auto"
			opacity="0.95"
		>
			{displayState &&
				displayState.map((messageObj) => {
					return (
						<Box
							key={messageObj._id}
							display="flex"
							justifyContent={messageObj.isIncoming ? 'flex-start' : 'flex-end'}
						>
							<Message
								isIncomingMessage={messageObj.isIncoming}
								message={messageObj.message}
								user={messageObj.senderName}
								time={messageObj.displayTime}
								date={messageObj.displayDate}
							/>
						</Box>
					)
				})}
		</Box>
	)
}

export default DialogScreen
