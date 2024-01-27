import { useUsers } from '../../../hooks/useUsers'
import ChatListElement from './chatListElement'
import { Box, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

// import { useDispatch } from 'react-redux'

export const ChatsList = ({ userChatList, senderUid }) => {
	const [searchQuery, setSearchQuery] = useState('')
	const { user } = useUsers()
	const handleInputChange = (event) => {
		setSearchQuery(event.target.value)
	}

	const filteredChats = userChatList.reduce((acc, el) => {
		if (
			el.latestMessage &&
			el.latestMessage.recipientName !== el.latestMessage.senderName
		) {
			let displayName
			el.latestMessage.recipientName === user.displayName
				? (displayName = el.latestMessage.senderName)
				: (displayName = el.latestMessage.recipientName)

			if (
				displayName.toLowerCase().includes(searchQuery.toLowerCase()) &&
				displayName !== user.displayName
			) {
				acc.push({
					...el,
					displayName,
				})
			}
		}
		return acc
	}, [])

	return (
		<Box border="1px black solid" h="94.8vh" borderRadius={2} overflow="auto">
			{userChatList && (
				<Input
					onChange={handleInputChange}
					placeholder={'Поиск по чатам'}
					value={searchQuery}
				/>
			)}
			{filteredChats.map((chatItem, index) => {
				console.log('ЧАТИ ИТЕМ', chatItem)
				return (
					<ChatListElement
						key={index}
						latestMessage={chatItem.latestMessage}
						chatDisplayName={chatItem.displayName}
					/>
				)
			})}
		</Box>
	)
}

export default ChatsList
