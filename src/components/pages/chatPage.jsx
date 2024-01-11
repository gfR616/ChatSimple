import Chat from '../ui/chat/chat'
import ContactsPannel from '../ui/contactsPannel/contactsPannel'
import SomePannel from '../ui/somePannel'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

const ChatPage = () => {
	return (
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
	)
}

export default ChatPage
