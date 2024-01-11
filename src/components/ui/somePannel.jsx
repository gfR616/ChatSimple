import { Box } from '@chakra-ui/react'
import React from 'react'

const SomePannel = () => {
	return (
		<Box w="100%" minH="100vh" border="1px solid black" borderRadius={5}>
			<Box border="1px solid black" borderRadius={5}>
				SomePannel
			</Box>
			<Box>В разработке...</Box>
		</Box>
	)
}

export default SomePannel
