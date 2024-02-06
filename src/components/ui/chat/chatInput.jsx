import { Box, Button, Grid, GridItem, Textarea } from '@chakra-ui/react'

const ChatInput = ({ onInputChange, inputState, onSendMessage, textAreaRef }) => {
	return (
		<Box
			bgColor="gray.300"
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
						backgroundColor="gray.500"
						color="white"
						onClick={onSendMessage}
						borderRadius={10}
					>
						Отправить
					</Button>
				</GridItem>
			</Grid>
		</Box>
	)
}

export default ChatInput
