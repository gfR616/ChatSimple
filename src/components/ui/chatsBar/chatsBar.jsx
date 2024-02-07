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
		<Box h="95vh" bgColor="gray.100" border="1px gray solid">
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
