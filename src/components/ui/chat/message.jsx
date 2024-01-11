import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Message = ({ message, user, time, isIncomingMessage }) => {
	return (
		<>
			{isIncomingMessage && (
				<Box
					p={3}
					pb={5}
					m={1}
					color="black"
					bg="white"
					minH="fit-content"
					minW="fit-content"
					w="40vh"
					borderRadius={10}
					position="relative"
				>
					<Text as="b" style={{ fontStyle: 'italic' }} color="#03841ceb">
						{user}
					</Text>

					<Text>{message}</Text>
					<Text fontSize="xs" color="#2d4812f3" position="absolute" bottom={1} right={5}>
						{time}
					</Text>
				</Box>
			)}
			{!isIncomingMessage && (
				<Box
					p={3}
					pb={5}
					m={1}
					color="black"
					bg="white"
					minH="fit-content"
					minW="fit-content"
					w="40vh"
					borderRadius={10}
					position="relative"
				>
					<Text as="b" style={{ fontStyle: 'italic' }} color="#160384eb">
						{user}
					</Text>

					<Text>{message}</Text>
					<Text fontSize="xs" color="#2d4812f3" position="absolute" bottom={1} right={5}>
						{time}
					</Text>
				</Box>
			)}
		</>
	)
}

export default Message
