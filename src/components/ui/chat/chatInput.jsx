import { Box, Button, Grid, GridItem, Input } from '@chakra-ui/react'
import React from 'react'

const ChatInput = ({ onInputChange, inputState, onSendMessage, onClearScreen }) => {
	return (
		<Grid templateColumns="repeat(10, 1fr)" gap={1} m="2">
			<GridItem colSpan={8}>
				<Input
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
			<GridItem colSpan={1}>
				<Button minH="4vh" w="100%" colorScheme="blue" onClick={onSendMessage}>
					Send
				</Button>
			</GridItem>
			<GridItem>
				<Button minH="4vh" w="100%" colorScheme="red" onClick={onClearScreen} colSpan={1}>
					Clear
				</Button>
			</GridItem>
		</Grid>
	)
}

export default ChatInput
