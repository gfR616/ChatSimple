import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Message = ({ message, user, time }) => {
	return (
		<Box
			p={3}
			m={5}
			color="black"
			bg="tomato"
			minH="fit-content"
			minW="fit-content"
			w="40vh"
			borderRadius={10}
		>
			<Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{user}</Text>
			<Text>{message}</Text>
			<Text fontSize="xs" color="#2d4812f3">
				{time}
			</Text>
		</Box>
	)
}

export default Message
