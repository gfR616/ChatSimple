import { Box, Button, Grid, GridItem, Input, Textarea } from '@chakra-ui/react'
import React from 'react'

const ChatInput = ({ onInputChange, inputState, onSendMessage }) => {
	return (
		<Grid templateColumns="repeat(10, 1fr)" gap={1} m="2">
			<GridItem colSpan={8}>
				<Textarea
					borderColor="#946d25"
					bgColor="#c0bcbc"
					minH="4vh"
					value={inputState}
					onChange={onInputChange}
					placeholder="Написать сообщение..."
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							onSendMessage()
						}
					}}
				/>
			</GridItem>
			<GridItem colSpan={2}>
				<Button minH="4vh" w="100%" colorScheme="blue" onClick={onSendMessage}>
					Send
				</Button>
			</GridItem>
		</Grid>
	)
}

export default ChatInput
