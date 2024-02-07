import { UseChats } from '../../../hooks/useChats'
import ChatsList from './chatsList'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const ChatsBar = ({ senderUid }) => {
	const { getAllUserChats } = UseChats()
	const [userChatList, setUserChatList] = useState()

	useEffect(() => {
		const fetchUserChats = async () => {
			if (senderUid) {
				const chats = await getAllUserChats(senderUid)
				setUserChatList(chats)
			}
		}
		fetchUserChats()
	}, [senderUid, getAllUserChats])

	return (
		<Box
			h="95vh"
			backgroundImage="linear-gradient(135deg, #1c5f90,  gray.500, #527d60 )"
			border="1px gray solid"
		>
			{userChatList && (
				<ChatsList
					userChatList={userChatList}
					setUserChatList={setUserChatList}
					senderUid={senderUid}
				/>
			)}
		</Box>
	)
}

export default ChatsBar
