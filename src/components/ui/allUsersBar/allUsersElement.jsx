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
			h="10vh"
			border="1px black solid"
			borderRadius={5}
			bgColor="blue.100"
			onClick={() => handleOpenChat(senderUid ?? '', user.uid ?? '')}
		>
			<Text as="b" p={4} style={{ fontStyle: 'italic' }} color={'#172c69eb'}>
				{user && user.displayName}
			</Text>
		</Box>
	)
}

export default AllUsersListElement
