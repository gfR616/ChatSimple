import { getAllUsers } from '../../../services/userService'
import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const ContactsPannel = () => {
	const [users, setUsers] = useState()

	useEffect(() => {
		const handleFetchUsers = async () => {
			const allUsers = await getAllUsers()
			setUsers(allUsers)
		}
		handleFetchUsers()
	}, [])
	console.log('Юзеры запрошены:', users)
	return (
		<Box w="100%" minH="96vh" border="2px solid black" borderRadius={5}>
			<Box border="1px black solid">
				All Users:
				{users &&
					users.map((user) => (
						<Box key={user.uid} border="1px solid black">
							{user.displayName}
						</Box>
					))}
			</Box>
		</Box>
	)
}

export default ContactsPannel
