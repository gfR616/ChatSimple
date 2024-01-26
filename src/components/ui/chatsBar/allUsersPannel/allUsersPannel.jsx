import { useUsers } from '../../../../hooks/useUsers'
import { getAllUsers } from '../../../../services/userService'
import { getFakeUsers } from '../../../../utils/fakeUsersGenerator'
import { Box, Button, Link } from '@chakra-ui/react'
import React, { useState } from 'react'

const AllUsersPannel = () => {
	const { users } = useUsers()

	return (
		<Box w="100%" minH="95vh" border="1px solid black" borderRadius={5}>
			<Box border="1px solid black" borderRadius={5} h="4vh">
				Все пользователи:
			</Box>
			<Box>{users}</Box>
		</Box>
	)
}

export default AllUsersPannel
