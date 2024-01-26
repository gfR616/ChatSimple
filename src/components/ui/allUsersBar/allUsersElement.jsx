import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const AllUsersListElement = ({ user }) => {
	return (
		<Box h="10vh" border="1px black solid" borderRadius={5} bgColor="blue.100">
			<Text as="b" style={{ fontStyle: 'italic' }} color={'#172c69eb'}>
				{user && user.displayName}
			</Text>
			<Text isTruncated={true}>{user.displayName}</Text>
			<Text fontSize="xs" color="#2d4812f3">
				{user.displayName}
			</Text>
		</Box>
	)
}

export default AllUsersListElement
