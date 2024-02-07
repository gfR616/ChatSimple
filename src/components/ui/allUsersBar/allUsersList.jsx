import { useUsers } from '../../../hooks/useUsers'
import AllUsersListElement from './allUsersElement'
import { Box, Input, Text } from '@chakra-ui/react'
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
					<Text as="b" fontSize={15} p={1} color="#000000">
						Пользователи
					</Text>
					<Box p={1}>
						<Input
							fontSize={14}
							borderRadius={10}
							borderColor="black"
							onChange={handleInputChange}
							placeholder={'Поиск по всем пользователям'}
							sx={{
								'&::placeholder': {
									color: 'black',
								},
							}}
							value={searchQuery}
							color="black"
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
