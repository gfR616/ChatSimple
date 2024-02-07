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
		<Box
			w="100%"
			h="95vh"
			backgroundImage="linear-gradient(45deg, #5b6a75,  gray.500, #895e4c )"
		>
			<AllUsersList displayedUsers={displayedUsers} senderUid={senderUid} />
		</Box>
	)
}

export default AllUsersBar
