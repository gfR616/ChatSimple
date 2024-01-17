import { Box, Button, Grid, GridItem, Input, Textarea } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

const ChatInput = ({ onInputChange, inputState, onSendMessage }) => {
	return (
		<Grid templateColumns="repeat(10, 1fr)" gap={1} m={1}>
			<GridItem colSpan={9}>
				<Textarea
					resize="none"
					borderColor="#946d25"
					bgColor="#c0bcbc"
					minH="6vh"
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
				<Button minH="6vh" w="100%" colorScheme="blue" onClick={onSendMessage}>
					Send
				</Button>
			</GridItem>
		</Grid>
	)
}

export default ChatInput
