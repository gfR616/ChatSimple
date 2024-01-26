import AllUsersListElement from './allUsersElement'
import { Box, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export const AllUsersList = ({ users }) => {
	const [searchQuery, setSearchQuery] = useState('')

	const handleInputChange = (event) => {
		setSearchQuery(event.target.value)
	}
	const filteredUsers = users
		? users.filter((el) => {
				return el.displayName.toLowerCase().includes(searchQuery.toLowerCase())
			})
		: []

	return (
		<Box border="1px black solid" h="94.9vh" borderRadius={5} overflow="auto">
			{users && (
				<Input
					onChange={handleInputChange}
					placeholder={'Поиск по всем пользователям'}
					value={searchQuery}
				/>
			)}
			{filteredUsers &&
				filteredUsers.map((user) => {
					return <AllUsersListElement key={user.uid} user={user} />
				})}
		</Box>
	)
}

export default AllUsersList
