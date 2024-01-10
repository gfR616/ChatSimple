import { Box, Button, Input } from '@chakra-ui/react'
import React from 'react'

const ChatInput = ({ onInputChange, inputState, onSendMessage, onClearScreen }) => {
	return (
		<Box h="80vh" w="auto">
			<Input
				h="10vh"
				width="30vw"
				value={inputState}
				onChange={onInputChange}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						onSendMessage()
					}
				}}
			/>
			<Button colorScheme="blue" onClick={onSendMessage}>
				Send
			</Button>
			<Button colorScheme="red" onClick={onClearScreen}>
				Clear
			</Button>
		</Box>
	)
}

export default ChatInput
