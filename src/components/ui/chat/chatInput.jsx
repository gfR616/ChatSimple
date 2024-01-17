import { Box, Button, Grid, GridItem, Textarea } from '@chakra-ui/react'
import { useRef } from 'react'

const ChatInput = ({ onInputChange, inputState, onSendMessage, textAreaRef }) => {
	return (
		<Grid templateColumns="repeat(10, 1fr)" gap={1} m={1}>
			<GridItem colSpan={9}>
				<Textarea
					ref={textAreaRef}
					resize="none"
					borderColor="#946d25"
					bgColor="#c0bcbc"
					minH="6vh"
					value={inputState}
					onChange={onInputChange}
					placeholder="Написать сообщение..."
					onKeyDown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault()
							onSendMessage()
						}
					}}
				/>
			</GridItem>
			<GridItem colSpan={1}>
				<Button minH="6vh" w="100%" colorScheme="blue" onClick={onSendMessage}>
					Send
				</Button>
			</GridItem>
		</Grid>
	)
}

export default ChatInput
