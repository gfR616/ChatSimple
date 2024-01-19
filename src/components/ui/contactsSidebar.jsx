import { useUsers } from '../../hooks/useUsers'
import { getChatHistory, initialHistory } from '../../services/historyService'
import { clearAllMeassages } from '../../services/messageService'
import { getAllUsers } from '../../services/userService'
import { setDisplayState, setRecipientUid } from '../../store/task'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { TfiComment, TfiFaceSmile } from 'react-icons/tfi'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar'
import { useDispatch } from 'react-redux'

const ContactsSidebar = () => {
	const dispatch = useDispatch()
	const [collapsed, setCollapsed] = useState(true)
	const { user } = useUsers()
	const senderUid = user && user.uid
	console.log('senderUid', senderUid)
	const [users, setUsers] = useState()

	useEffect(() => {
		const handleFetchUsers = async () => {
			const allUsers = await getAllUsers()
			setUsers(allUsers)
		}
		handleFetchUsers()
	}, [])

	const handleOpenChat = async (uid) => {
		clearAllMeassages()
		dispatch(setRecipientUid(uid))
		console.log('чат иницииорван!', senderUid, uid)

		try {
			const chatHistory = await getChatHistory(senderUid, uid)
			if (!chatHistory) {
				initialHistory(senderUid, uid)
				dispatch(setDisplayState([]))
				console.log('чат создан, истории еще нет')
			} else {
				dispatch(setDisplayState(chatHistory.messages))
			}
		} catch (error) {
			console.error('Error fetching chat history:', error)
		}
	}
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
									users.map((user) => {
										return (
											<MenuItem key={user.uid} onClick={() => handleOpenChat(user.uid)}>
												{user.displayName}
											</MenuItem>
										)
									})}
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
