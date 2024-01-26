import { useInitialChat } from '../../../hooks/useInitialChat.jsx'
import { useUsers } from '../../../hooks/useUsers.jsx'
import { setRecipientUid } from '../../../store/task.js'
// import SearchInput from '../../coomon/serchInput.jsx'
import AllUsersList from './allUsersList.jsx'
import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const AllUsersBar = ({ senderUid }) => {
	const dispatch = useDispatch()
	const { users } = useUsers()
	const { InitialChat } = useInitialChat()
	const [displayedUsers, setDisplayedUsers] = useState()

	useEffect(() => {
		setDisplayedUsers(users)
	}, [users])

	const handleOpenChat = async (recipientUid) => {
		console.log(senderUid, recipientUid)
		dispatch(setRecipientUid(recipientUid))
		InitialChat(senderUid, recipientUid)
	}
	return (
		<Box w="100%" h="95vh" bgColor="gray.100" border="1px solid black" borderRadius={5}>
			<AllUsersList users={displayedUsers} />
		</Box>
	)
}

export default AllUsersBar
