import { useUsers } from '../../../hooks/useUsers.jsx'
import { setRecipientUid } from '../../../store/task.js'
import AllUsersList from './allUsersList.jsx'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const AllUsersBar = ({ senderUid }) => {
	const { users } = useUsers()
	const [displayedUsers, setDisplayedUsers] = useState()

	useEffect(() => {
		setDisplayedUsers(users)
	}, [users])

	return (
		<Box w="100%" h="95vh" bgColor="gray.100" border="1px solid black" borderRadius={5}>
			<AllUsersList displayedUsers={displayedUsers} senderUid={senderUid} />
		</Box>
	)
}

export default AllUsersBar
