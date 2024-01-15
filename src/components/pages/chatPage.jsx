import { firebaseConfig } from '../../base/fireBaseConfig'
import { MessagesProvider } from '../../hooks/useMessages'
import { UsersProvider, useUsers } from '../../hooks/useUsers'
import Chat from '../ui/chat/chat'
import ContactsPannel from '../ui/contactsPannel/contactsPannel'
import SomePannel from '../ui/somePannel'
import UserPannel from '../ui/userPannel'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import { initializeApp } from 'firebase/app'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ChatPage = () => {
	useEffect(() => {
		initializeApp(firebaseConfig)
	}, [])
	// Находим userName
	const guestName = useSelector((state) => state.guest.guestName)
	guestName && localStorage.setItem('guestName', guestName)
	console.log('stored:', localStorage.getItem('guestName'))
	let userName
	if (!guestName && !localStorage.getItem('guestName')) {
		const { user } = useUsers()
		userName = user ? user.displayName : ''
		console.log('userName:', userName)
	} else {
		userName = guestName || localStorage.getItem('guestName')
	}

	return (
		<Box opacity={5}>
			<Box h="100vh">
				<Box>
					<UsersProvider>
						<UserPannel userName={userName} />
					</UsersProvider>
				</Box>
				<Grid templateColumns="repeat(9, 1fr)" alignItems="stretch">
					<GridItem colSpan={2}>
						<ContactsPannel />
					</GridItem>
					<GridItem colSpan={5}>
						<MessagesProvider>
							<Chat userName={userName} />
						</MessagesProvider>
					</GridItem>
					<GridItem colSpan={2}>
						<SomePannel />
					</GridItem>
				</Grid>
			</Box>
		</Box>
	)
}

export default ChatPage
