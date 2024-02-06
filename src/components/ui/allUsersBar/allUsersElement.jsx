import { useInitialChat } from '../../../hooks/useInitialChat'
import { setDisplayChatName, setRecipientUid } from '../../../store/task'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'

const AllUsersListElement = ({ user, senderUid }) => {
	const { InitialChat } = useInitialChat()
	const dispatch = useDispatch()
	const handleOpenChat = async (senderUid, recipientUid) => {
		InitialChat(senderUid, recipientUid)
		dispatch(setRecipientUid(recipientUid))
		dispatch(setDisplayChatName(user.displayName))
	}
	return (
		<Box
			p={2}
			h="10vh"
			border="1px gray solid"
			borderRadius={10}
			bgColor="gray.200"
			onClick={() => handleOpenChat(senderUid ?? '', user.uid ?? '')}
		>
			<Text as="b" p={4} color="#040505eb">
				{user && user.displayName}
			</Text>
		</Box>
	)
}

export default AllUsersListElement
