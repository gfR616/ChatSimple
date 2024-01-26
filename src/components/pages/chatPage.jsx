import { firebaseConfig } from '../../base/fireBaseConfig'
import { ChatsProvider } from '../../hooks/useChats'
import { InitialChatProvider } from '../../hooks/useInitialChat'
import { MessagesProvider } from '../../hooks/useMessages'
import { UsersProvider, useUsers } from '../../hooks/useUsers'
import Chat from '../ui/chat/chat'
import AllUsersPannel from '../ui/chatsBar/allUsersPannel/allUsersPannel'
import ChatsBar from '../ui/chatsBar/chatsBar'
import UserPannel from '../ui/userPannel'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import { initializeApp } from 'firebase/app'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ChatPage = () => {
	useEffect(() => {
		initializeApp(firebaseConfig)
		console.log('base go')
	}, [])
	const { user } = useUsers()

	const guestName = useSelector((state) => state.all.guestName)
	guestName && localStorage.setItem('guestName', guestName)
	let userName
	if (!guestName && !localStorage.getItem('guestName')) {
		userName = user ? user.displayName : ''
	} else {
		userName = guestName || localStorage.getItem('guestName')
	}

	// находим uid
	const guestId = useSelector((state) => state.all.guestId)
	guestId && localStorage.setItem('guestId', guestId)
	let userUid
	if (!guestId && !localStorage.getItem('guestId')) {
		userUid = user && user.uid
	} else {
		userUid = guestId || localStorage.getItem('guestId')
	}

	return (
		<UsersProvider>
			<ChatsProvider>
				<MessagesProvider>
					<InitialChatProvider>
						<Box opacity={5}>
							<Box h="100vh">
								<Box>
									<UserPannel userName={userName} />
								</Box>
								<Grid templateColumns="repeat(9, 1fr)" alignItems="stretch">
									<GridItem colSpan={2}>
										<ChatsBar senderUid={userUid} />
									</GridItem>
									<GridItem colSpan={5}>
										<Chat userName={userName} senderUid={userUid} />
									</GridItem>
									<GridItem colSpan={2}>
										<AllUsersPannel />
									</GridItem>
								</Grid>
							</Box>
						</Box>
					</InitialChatProvider>
				</MessagesProvider>
			</ChatsProvider>
		</UsersProvider>
	)
}

export default ChatPage
