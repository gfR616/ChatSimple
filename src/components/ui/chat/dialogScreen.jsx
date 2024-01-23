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

	let messages = Object.values(displayState?.[0] ?? {})

	console.log('DialogScreen МЕССЕДЖЕССС', messages)
	console.log('DialogScreen ДИСПЛЕЙСТЕЙТ', displayState)
	return (
		<Box
			ref={boxRef}
			bg="#9ab092"
			color="white"
			h="88vh"
			p={3}
			borderRadius={5}
			overflow="auto"
			opacity="0.95"
		>
			{!!messages.length &&
				messages.map((messageObj) => {
					return (
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
					)
				})}
		</Box>
	)
}

export default DialogScreen
