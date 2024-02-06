import { useInitialChat } from '../../../hooks/useInitialChat'
import { setDisplayChatName, setRecipientUid } from '../../../store/task'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'

const ChatListElement = ({ latestMessage, chatDisplayName }) => {
	if (!latestMessage) {
		return null
	}
	const { InitialChat } = useInitialChat()
	const dispatch = useDispatch()

	const handleOpenChat = async (senderUid, recipientUid) => {
		InitialChat(senderUid, recipientUid)
		dispatch(setRecipientUid(recipientUid))
		dispatch(setDisplayChatName(chatDisplayName))
	}

	return (
		<Box
			p={2}
			h="10vh"
			border="1px gray solid"
			borderRadius={10}
			bgColor="gray.200"
			onClick={() =>
				handleOpenChat(latestMessage.senderUid ?? '', latestMessage.recipientUid ?? '')
			}
		>
			<Text as="b" color={'#000000eb'}>
				{chatDisplayName}
			</Text>
			<Text
				p={1}
				pr={2}
				isTruncated={false}
				overflow="hidden"
				whiteSpace="nowrap"
				textOverflow="ellipsis"
			>
				{latestMessage.message}
			</Text>
			<Text fontSize="xs" color="#2d4812f3" align="end">
				{latestMessage.displayDate}
				<span> </span>
				{latestMessage.displayTime}
			</Text>
		</Box>
	)
}

export default ChatListElement
