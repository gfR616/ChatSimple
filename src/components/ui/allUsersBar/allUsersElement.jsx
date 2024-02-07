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
			p={1}
			m={-1}
			h="4vh"
			border="1px gray solid"
			borderRadius={10}
			bgColor="#e6d0a7"
			onClick={() => handleOpenChat(senderUid ?? '', user.uid ?? '')}
			_hover={{
				cursor: 'pointer',
				backgroundColor: 'gray.100',
			}}
			opacity="0.9"
		>
			<Text p={1} color="#040505" fontSize={12}>
				{user && user.displayName}
			</Text>
		</Box>
	)
}

export default AllUsersListElement
