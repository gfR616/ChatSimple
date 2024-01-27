import { useUsers } from '../../../hooks/useUsers'
import AllUsersListElement from './allUsersElement'
import { Box, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export const AllUsersList = ({ displayedUsers, senderUid }) => {
	const [searchQuery, setSearchQuery] = useState('')
	const { user } = useUsers()
	const handleInputChange = (event) => {
		setSearchQuery(event.target.value)
	}
	const filteredUsers = displayedUsers
		? displayedUsers.filter((el) => {
				return (
					el.displayName.toLowerCase().includes(searchQuery.toLowerCase()) &&
					el.displayName !== user.displayName
				)
			})
		: []

	return (
		<Box border="1px black solid" h="94.9vh" borderRadius={5} overflow="auto">
			{displayedUsers && (
				<Input
					onChange={handleInputChange}
					placeholder={'Поиск по всем пользователям'}
					value={searchQuery}
				/>
			)}
			{filteredUsers &&
				filteredUsers.map((user) => {
					return <AllUsersListElement key={user.uid} user={user} senderUid={senderUid} />
				})}
		</Box>
	)
}

export default AllUsersList
