import { firebaseConfig } from '../../base/fireBaseConfig'
import { MessagesProvider } from '../../hooks/useMessages'
import { UsersProvider, useUsers } from '../../hooks/useUsers'
import Chat from '../ui/chat/chat'
import ContactsSidebar from '../ui/contactsSidebar'
import SomePannel from '../ui/somePannel'
import UserPannel from '../ui/userPannel'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import { initializeApp } from 'firebase/app'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ChatPage = () => {
	useEffect(() => {
		initializeApp(firebaseConfig)
	}, [])
	const { user } = useUsers()
	const [displayState, setDisplayState] = useState([])
	console.log('displayState', displayState)
	// находим userName
	const guestName = useSelector((state) => state.all.setGuestName)
	guestName && localStorage.setItem('guestName', guestName)
	console.log('stored:', localStorage.getItem('guestName'))
	let userName
	if (!guestName && !localStorage.getItem('guestName')) {
		userName = user ? user.displayName : ''
		console.log('userName:', userName)
	} else {
		userName = guestName || localStorage.getItem('guestName')
	}

	// находим uid
	const guestId = useSelector((state) => state.all.setGuestId)
	guestId && localStorage.setItem('guestId', guestId)
	let userUid
	if (!guestId && !localStorage.getItem('guestId')) {
		userUid = user && user.uid
	} else {
		userUid = guestId || localStorage.getItem('guestId')
	}

	return (
		<UsersProvider>
			<MessagesProvider>
				<Box opacity={5}>
					<Box h="100vh">
						<Box>
							<UserPannel userName={userName} />
						</Box>
						<Grid templateColumns="repeat(9, 1fr)" alignItems="stretch">
							<GridItem colSpan={2}>
								<ContactsSidebar setDisplayState={setDisplayState} />
							</GridItem>
							<GridItem colSpan={5}>
								<Chat
									userName={userName}
									senderUid={userUid}
									displayState={displayState}
									setDisplayState={setDisplayState}
								/>
							</GridItem>
							<GridItem colSpan={2}>
								<SomePannel setDisplayState={setDisplayState} />
							</GridItem>
						</Grid>
					</Box>
				</Box>
			</MessagesProvider>
		</UsersProvider>
	)
}

export default ChatPage
