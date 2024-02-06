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
		<Box border="1px gray solid" h="94.8vh" overflow="auto">
			{userChatList && (
				<>
					<Box p={1} m={1}>
						<Input
							borderRadius={10}
							borderColor="gray"
							onChange={handleInputChange}
							placeholder={'Поиск по активным чатам'}
							value={searchQuery}
						/>
					</Box>
				</>
			)}
			{filteredChats.map((chatItem, index) => {
				console.log('ЧАТИ ИТЕМ', chatItem)
				return (
					<>
						<Box p={1} ml={1} mr={1}>
							<ChatListElement
								key={index}
								latestMessage={chatItem.latestMessage}
								chatDisplayName={chatItem.displayName}
							/>
						</Box>
					</>
				)
			})}
		</Box>
	)
}

export default ChatsList
