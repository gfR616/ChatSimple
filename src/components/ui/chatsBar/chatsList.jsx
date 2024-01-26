import { UseChats } from '../../../hooks/useChats'
import ChatListElement from './chatListElement'
import { Box, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export const ChatsList = ({ userChatList }) => {
	const [searchQuery, setSearchQuery] = useState('')

	const handleInputChange = (event) => {
		setSearchQuery(event.target.value)
	}
	const filteredChats = userChatList
		? userChatList.filter((el) => {
				return el.latestMessage.recipientName
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
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
