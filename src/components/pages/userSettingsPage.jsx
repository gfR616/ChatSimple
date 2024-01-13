import { useUsers } from '../../hooks/useUsers'
import { Box } from '@chakra-ui/react'
import React from 'react'

const UserSettingsPage = () => {
	const { user } = useUsers()
	return (
		<>
			<Box>{user ? `Отображаемое имя: ${user.displayName}` : 'Loading...'}</Box>
			<Box>{user ? `Email: ${user.email}` : 'Loading...'}</Box>
		</>
	)
}

export default UserSettingsPage
