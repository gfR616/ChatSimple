import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const ContactsPannel = () => {
	const userName = useSelector((state) => state.user.userName)

	return (
		<Box w="100%" minH="100vh" border="1px solid black" borderRadius={5}>
			<Box border="1px solid black" borderRadius={5}>
				<Text as="b" fontSize="3xl" color="#ff00f2">
					Hello, {userName}
				</Text>
			</Box>

			<Box>ContactsPannel. В разработке...</Box>
		</Box>
	)
}

export default ContactsPannel
