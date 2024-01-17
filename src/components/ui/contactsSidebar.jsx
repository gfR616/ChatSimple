import { getAllUsers } from '../../services/userService'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Button, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { TfiComment, TfiFaceSmile } from 'react-icons/tfi'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar'

const ContactsSidebar = () => {
	const [collapsed, setCollapsed] = useState(true)
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
		<Box h="100%" display="flex">
			<Sidebar collapsed={collapsed}>
				<Menu>
					<SubMenu label={collapsed ? <TfiFaceSmile size={30} /> : 'Все пользователи'}>
						{users &&
							users.map((user) => <MenuItem key={user.uid}>{user.displayName}</MenuItem>)}
					</SubMenu>
					<SubMenu
						label={collapsed ? <TfiComment size={30} /> : 'Мои контакты'}
					></SubMenu>
				</Menu>
				<Button
					checked={collapsed}
					colorScheme="blackAlpha"
					onClick={() => setCollapsed(!collapsed)}
					size="md"
					ml={4}
					mt="78vh"
				>
					{collapsed ? <ArrowRightIcon /> : <ArrowLeftIcon />}
				</Button>
			</Sidebar>
		</Box>
	)
}

export default ContactsSidebar
