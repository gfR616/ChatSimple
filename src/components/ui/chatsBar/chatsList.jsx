import { UseChats } from '../../../hooks/useChats'
import { useUsers } from '../../../hooks/useUsers'
import ChatListElement from './chatListElement'
import { Box, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export const ChatsList = ({ userChatList, senderUid }) => {
	const [searchQuery, setSearchQuery] = useState('')
	const { user } = useUsers()

	const handleInputChange = (event) => {
		setSearchQuery(event.target.value)
	}
	const filteredChats = userChatList
		? userChatList.filter((el) => {
				return (
					el.latestMessage.recipientName
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) &&
					el.latestMessage.recipientName !== user.displayName
				)
			})
		: []

	return (
		<Box border="1px black solid" h="94.8vh" borderRadius={2} overflow="auto">
			{userChatList && (
				<Input
					onChange={handleInputChange}
					placeholder={'Поиск по чатам'}
					value={searchQuery}
				/>
			)}
			{filteredChats &&
				filteredChats.map((chatItem, index) => {
					return <ChatListElement key={index} latestMessage={chatItem.latestMessage} />
				})}
		</Box>
	)
}

export default ChatsList
