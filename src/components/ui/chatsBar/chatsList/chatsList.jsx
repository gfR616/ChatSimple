import ChatListElement from './chatListElement'
import { Box } from '@chakra-ui/react'
import React from 'react'

const ChatsList = () => {
	return (
		<Box border="1px black solid" h="87vh" borderRadius={5} overflow="auto">
			<ChatListElement />
			<ChatListElement />
			<ChatListElement />
			<ChatListElement />
			<ChatListElement />
			<ChatListElement />
			<ChatListElement />
			<ChatListElement />
			<ChatListElement />
			<ChatListElement />
			<ChatListElement />
		</Box>
	)
}

export default ChatsList
