import { useUsers } from '../../../hooks/useUsers'
import Message from './message'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const DialogScreen = () => {
	const boxRef = useRef()
	const { user } = useUsers()
	const displayState = useSelector((state) => state.all.displayState)
	useEffect(() => {
		if (boxRef.current) {
			boxRef.current.scrollTop = boxRef.current.scrollHeight
		}
	}, [displayState])

	const filteredDisplayState = displayState.map((messageObj) => {
		if (messageObj.senderName === user.displayName) {
			return { ...messageObj, isIncoming: false }
		} else {
			return { ...messageObj, isIncoming: true }
		}
	})

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
			{filteredDisplayState &&
				filteredDisplayState.map((messageObj) => {
					console.log('messageObj', messageObj)
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
