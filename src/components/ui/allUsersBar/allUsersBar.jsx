import { useUsers } from '../../../hooks/useUsers.jsx'
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
		<Box w="100%" h="95vh" bgColor="#f1f1f1" border="1px solid gray">
			<AllUsersList displayedUsers={displayedUsers} senderUid={senderUid} />
		</Box>
	)
}

export default AllUsersBar
