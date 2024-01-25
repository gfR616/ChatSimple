import { UseChats } from '../../../../hooks/useChats'
import ChatListElement from './chatListElement'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export const ChatsList = ({ senderUid }) => {
	const { getAllUserChats } = UseChats()
	const [userChatList, setUserChatList] = useState([])

	useEffect(() => {
		const fetchUserChats = async () => {
			if (senderUid) {
				const chats = await getAllUserChats(senderUid)
				setUserChatList(chats)
			}
		}
		fetchUserChats()
	}, [senderUid, getAllUserChats])

	userChatList && console.log('ahahahah', userChatList)
	return (
		<Box border="1px black solid" h="86.8vh" borderRadius={5} overflow="auto">
			{userChatList &&
				userChatList.map((chat, index) => {
					return <ChatListElement key={index} message={chat.message} time={chat.time} />
				})}
		</Box>
	)
}

export default ChatsList
