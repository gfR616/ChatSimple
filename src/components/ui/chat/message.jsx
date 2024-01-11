import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Message = ({ message, user, time }) => {
	return (
		<Box
			p={3}
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
			<Text
				fontSize="xs"
				color="#2d4812f3"
				position="absolute"
				bottom={1} // Добавьте это свойство
				right={5}
			>
				{time}
			</Text>
		</Box>
	)
}

export default Message
