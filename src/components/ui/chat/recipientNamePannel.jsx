import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RecipientNamePannel = () => {
	const chatDisplayName = useSelector((state) => state.all.displayChatName)

	return (
		<>
			{chatDisplayName ? (
				<Box
					w="100%"
					h="4vh"
					p={1}
					border="1px solid gray"
					borderBottomRadius={5}
					bg="gray.200"
				>
					Чат с <b>{chatDisplayName}</b>
				</Box>
			) : (
				<Box
					w="100%"
					h="95vh"
					p={1}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Text
						textAlign="center"
						bg="#dfdfdfe7"
						borderRadius={25}
						p={3}
						fontWeight="semibold"
					>
						Выберите, кому хотели бы написать
					</Text>
				</Box>
			)}
		</>
	)
}
export default RecipientNamePannel
