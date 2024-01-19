import { getChatHistory, initialHistory } from '../../services/historyService'
import { clearAllMeassages, pushMessageInRTDB } from '../../services/messageService'
import { createNewRoom } from '../../services/roomService'
import { getAllUsers, getKeys } from '../../services/userService'
import { setCommonKey, setDisplayState, setRecipientUid } from '../../store/task'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { TfiComment, TfiFaceSmile } from 'react-icons/tfi'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar'
import { useDispatch } from 'react-redux'

const ContactsSidebar = ({ senderUid }) => {
	const dispatch = useDispatch()
	const [collapsed, setCollapsed] = useState(true)
	console.log('senderUid', senderUid)
	const [users, setUsers] = useState()

	useEffect(() => {
		const handleFetchUsers = async () => {
			const allUsers = await getAllUsers()
			setUsers(allUsers)
		}
		handleFetchUsers()
	}, [])

	const handleOpenChat = async (recipientUid) => {
		dispatch(setRecipientUid(recipientUid))
		console.log('чат иницииорван!', senderUid, recipientUid)
		const newRoom = createNewRoom()
		console.log('ROOOOOOOOOOOOOOOOOM', newRoom)
		
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
