import { UseChats } from '../../../hooks/useChats'
import { useInitialChat } from '../../../hooks/useInitialChat'
import { setRecipientUid } from '../../../store/task'
import ChatsList from './chatsList'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

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
		<Box h="95vh" bgColor="gray.100" border="1px black solid" borderRadius={5}>
			<ChatsList userChatList={userChatList} senderUid={senderUid} />
		</Box>
	)
}

export default ChatsBar
