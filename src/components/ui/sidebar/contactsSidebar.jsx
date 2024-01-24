import { useInitialChat } from '../../../hooks/useInitialChat'
import { getAllFakeUsers } from '../../../services/fakeUsersService'
import { getAllUsers } from '../../../services/userService'
import { setRecipientUid } from '../../../store/task'
import SearchWithDropdown from './SerchWithDropdawn'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Button, Grid, GridItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { TfiComment, TfiFaceSmile, TfiIdBadge } from 'react-icons/tfi'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar'
import { useDispatch } from 'react-redux'

const ContactsSidebar = ({ senderUid }) => {
	const dispatch = useDispatch()
	const [collapsed, setCollapsed] = useState(true)
	console.log('senderUid', senderUid)
	const [users, setUsers] = useState()
	const [fakeUsers, setFakeUsers] = useState()

	useEffect(() => {
		const handleFetchUsers = async () => {
			const allUsers = await getAllUsers()
			setUsers(allUsers)
		}
		const handleFetchFakeUsers = async () => {
			const allFakeUsers = await getAllFakeUsers()
			setFakeUsers(allFakeUsers)
		}
		handleFetchUsers()
		handleFetchFakeUsers()
	}, [])

	const { InitialChat } = useInitialChat()

	const handleOpenChat = async (recipientUid) => {
		dispatch(setRecipientUid(recipientUid))
		InitialChat(senderUid, recipientUid)
	}
	return (
		<Box position="fixed" display="flex" alignItems="flex-end">
			<Box maxH="95vh">
				<Sidebar collapsed={collapsed}>
					<Grid gridTemplateRows="repeat(10, 1fr)">
						<GridItem>
							<SearchWithDropdown />
							<Menu>
								<Box>1231</Box>
								{/* <SubMenu
									label={collapsed ? <TfiFaceSmile size={30} /> : 'Все пользователи'}
									style={{ overflow: 'auto', maxHeight: '200px' }}
								>
									{users &&
										users.map((user) => {
											return (
												<MenuItem key={user.uid} onClick={() => handleOpenChat(user.uid)}>
													{user.displayName}
												</MenuItem>
											)
										})}
								</SubMenu> */}
								<SubMenu
									label={collapsed ? <TfiIdBadge size={30} /> : 'Фейковые пользователи'}
								>
									{fakeUsers &&
										fakeUsers.map((fakeUser) => {
											return (
												<MenuItem
													key={fakeUser.uid}
													onClick={() => handleOpenChat(fakeUser.uid)}
												>
													{fakeUser.displayName}
												</MenuItem>
											)
										})}
								</SubMenu>
								<SubMenu
									label={collapsed ? <TfiComment size={30} /> : 'Мои контакты'}
								></SubMenu>
							</Menu>
						</GridItem>
						<GridItem rowEnd={3}></GridItem>
					</Grid>
				</Sidebar>
			</Box>
			<Button
				checked={collapsed}
				colorScheme="blackAlpha"
				onClick={() => setCollapsed(!collapsed)}
				size="md"
				ml={0}
			>
				{collapsed ? <ArrowRightIcon /> : <ArrowLeftIcon />}
			</Button>
		</Box>
	)
}

export default ContactsSidebar
