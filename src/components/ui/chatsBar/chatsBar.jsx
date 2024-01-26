import { UseChats } from '../../../hooks/useChats'
import { useInitialChat } from '../../../hooks/useInitialChat'
import { getAllUsers } from '../../../services/userService'
import { setRecipientUid } from '../../../store/task'
import ChatsList from './chatsList'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Button, Menu, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
// import { TfiComment, TfiFaceSmile, TfiIdBadge } from 'react-icons/tfi'
import { useDispatch } from 'react-redux'

const ChatsBar = ({ senderUid }) => {
	const dispatch = useDispatch()
	const { getAllUserChats } = UseChats()
	const { InitialChat } = useInitialChat()
	const [userChatList, setUserChatList] = useState()
	const [isEmptyInput, setisEmptyInput] = useState()
	console.log('усер чат лист', userChatList)

	useEffect(() => {
		const fetchUserChats = async () => {
			if (senderUid) {
				const chats = await getAllUserChats(senderUid)
				setUserChatList(chats)
				setisEmptyInput(chats)
			}
		}
		fetchUserChats()
	}, [senderUid, getAllUserChats])

	const handleOpenChat = async (recipientUid) => {
		console.log(senderUid, recipientUid)
		dispatch(setRecipientUid(recipientUid))
		InitialChat(senderUid, recipientUid)
	}
	return (
		<Box h="95vh" bgColor="gray.100" border="1px black solid" borderRadius={5}>
			<ChatsList userChatList={userChatList} />
		</Box>
	)
}

export default ChatsBar
