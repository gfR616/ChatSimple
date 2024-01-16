import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Message = ({ message, user, time, isIncomingMessage }) => {
	return (
		<>
			<Box
				p={3}
				pb={5}
				m={1}
				color="black"
				bg="white"
				minH="fit-content"
				maxW="45%"
				borderRadius={10}
				position="relative"
				isTruncated={false}
			>
				<Text
					as="b"
					style={{ fontStyle: 'italic' }}
					color={isIncomingMessage ? '#840903eb' : '#3705e9eb'}
				>
					{isIncomingMessage ? '→' : '←'} {user}
				</Text>
				<Text isTruncated={false}>{message}</Text>
				<Text fontSize="xs" color="#2d4812f3" position="absolute" bottom={1} right={5}>
					{time}
				</Text>
			</Box>
		</>
	)
}

export default Message
