import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const ChatListElement = ({ message, time }) => {
	return (
		<Box h="10vh" border="1px black solid" borderRadius={5} bgColor="blue.100">
			<Text as="b" style={{ fontStyle: 'italic' }} color={'#840903eb'}></Text>
			<Text isTruncated={false}>{message}</Text>
			<Text fontSize="xs" color="#2d4812f3">
				{time}
			</Text>
		</Box>
	)
}

export default ChatListElement
