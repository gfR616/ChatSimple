import { Box, Button, Grid, GridItem, Textarea } from '@chakra-ui/react'

const ChatInput = ({ onInputChange, inputState, onSendMessage, textAreaRef }) => {
	return (
		<Box
			bgColor="gray.400"
			w="100%"
			h="7vh"
			border="1px gray solid"
			borderTopRadius={5}
			overflow="hidden"
		>
			<Grid templateColumns="repeat(10, 1fr)" gap={1} m={1}>
				<GridItem colSpan={9}>
					<Textarea
						ref={textAreaRef}
						resize="none"
						borderRadius={10}
						borderColor="gray"
						bgColor="gray.100"
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
					<Button
						minH="6vh"
						w="100%"
						colorScheme="blue"
						onClick={onSendMessage}
						borderRadius={10}
					>
						Send
					</Button>
				</GridItem>
			</Grid>
		</Box>
	)
}

export default ChatInput
