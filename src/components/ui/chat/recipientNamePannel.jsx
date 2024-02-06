import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RecipientNamePannel = () => {
	const chatDisplayName = useSelector((state) => state.all.displayChatName)

	return (
		<Box w="100%" h="4vh" p={1} border="1px solid black" borderRadius={5}>
			<Text>
				{chatDisplayName ? `Чат с ${chatDisplayName}` : 'Выберите кому написать'}
			</Text>
		</Box>
	)
}
export default RecipientNamePannel
