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
		<Box border="1px gray solid" h="94.9vh" overflow="auto">
			{displayedUsers && (
				<>
					<Box p={1} m={1}>
						<Input
							borderRadius={10}
							borderColor="gray"
							onChange={handleInputChange}
							placeholder={'Поиск по всем пользователям'}
							value={searchQuery}
						/>
					</Box>
				</>
			)}
			{filteredUsers &&
				filteredUsers.map((user) => {
					return (
						<>
							<Box p={1} ml={1} mr={1}>
								<AllUsersListElement key={user.uid} user={user} senderUid={senderUid} />
							</Box>
						</>
					)
				})}
		</Box>
	)
}

export default AllUsersList
