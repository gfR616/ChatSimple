import { getAllUsers } from '../../services/userService'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react'
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
		<Box maxH="95vh" overflow="hidden">
			<Sidebar collapsed={collapsed}>
				<Grid gridTemplateRows="repeat(10, 1fr)">
					<GridItem>
						<Menu>
							<SubMenu
								label={collapsed ? <TfiFaceSmile size={30} /> : 'Все пользователи'}
							>
								{users &&
									users.map((user) => (
										<MenuItem key={user.uid} onClick={}>{user.displayName}</MenuItem>
									))}
							</SubMenu>
							<SubMenu
								label={collapsed ? <TfiComment size={30} /> : 'Мои контакты'}
							></SubMenu>
						</Menu>
					</GridItem>
					<GridItem rowEnd={3}>
						<Button
							checked={collapsed}
							colorScheme="blackAlpha"
							onClick={() => setCollapsed(!collapsed)}
							size="md"
							ml={4}
						>
							{collapsed ? <ArrowRightIcon /> : <ArrowLeftIcon />}
						</Button>
					</GridItem>
				</Grid>
			</Sidebar>
		</Box>
	)
}

export default ContactsSidebar
