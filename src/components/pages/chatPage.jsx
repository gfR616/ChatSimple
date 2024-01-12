import { firebaseConfig } from '../../base/fireBaseConfig'
import Chat from '../ui/chat/chat'
import ContactsPannel from '../ui/contactsPannel/contactsPannel'
import SomePannel from '../ui/somePannel'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import { initializeApp } from 'firebase/app'
import React, { useEffect } from 'react'

const ChatPage = () => {
	useEffect(() => {
		initializeApp(firebaseConfig)
	}, [])
	return (
		<Box bgImage="loginBg.webp" opacity={5}>
			<Box>
				<Grid templateColumns="repeat(9, 1fr)" alignItems="stretch">
					<GridItem colSpan={2}>
						<ContactsPannel />
					</GridItem>
					<GridItem colSpan={5}>
						<Chat />
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
