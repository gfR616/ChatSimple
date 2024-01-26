import { useInitialChat } from '../../../hooks/useInitialChat'
import { setRecipientUid } from '../../../store/task'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'

const ChatListElement = ({ latestMessage }) => {
	if (!latestMessage) {
		return null
	}
	const { InitialChat } = useInitialChat()
	const dispatch = useDispatch()
	const handleOpenChat = async (senderUid, recipientUid) => {
		InitialChat(senderUid, recipientUid)
		dispatch(setRecipientUid(recipientUid))
	}

	return (
		<Box
			h="10vh"
			border="1px black solid"
			borderRadius={5}
			bgColor="blue.100"
			onClick={() =>
				handleOpenChat(latestMessage.senderUid ?? '', latestMessage.recipientUid ?? '')
			}
		>
			<Text as="b" style={{ fontStyle: 'italic' }} color={'#172c69eb'}>
				{latestMessage.recipientName}
			</Text>
			<Text isTruncated={true}>{latestMessage.message}</Text>
			<Text fontSize="xs" color="#2d4812f3">
				{latestMessage.displayDate}
			</Text>
		</Box>
	)
}

export default ChatListElement
