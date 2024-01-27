import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RecipientNamePannel = () => {
	// const [displayedName, setDisplayedName] = useState()
	const chatDisplayName = useSelector((state) => state.all.displayChatName)

	// useEffect(() => {
	// 	setDisplayedName(chatDisplayName)
	// 	console.log(
	// 		'chatDisplayNamechatDisplayNamechatDisplayNamechatDisplayNamechatDisplayNamechatDisplayName',
	// 		chatDisplayName,
	// 	)
	// }, [])
	return (
		<Box w="100%" h="4vh" border="1px solid black" borderRadius={5}>
			<Text>
				{chatDisplayName ? `Чат с ${chatDisplayName}` : 'Выберите кому написать'}
			</Text>
		</Box>
	)
}
export default RecipientNamePannel
