import { fetchUsers, getAllUsers, printUsers } from '../../services/userService'
import { Box, Button } from '@chakra-ui/react'
import React from 'react'

const SomePannel = () => {
	const playSound = () => {
		const audio = new Audio('message.mp3')
		audio.addEventListener('canplaythrough', (event) => {
			audio.play()
		})
	}
	const handleFetchUsers = async () => {
		const users = await getAllUsers()
		console.log(users)
	}
	return (
		<Box w="100%" minH="96vh" border="1px solid black" borderRadius={5}>
			<Box border="1px solid black" borderRadius={5}>
				SomePannel
			</Box>
			<Box>В разработке...</Box>
			Пока что звук не воспроизвдится автоматически, поэтому при получении входящего
			сообщения нажмите кнопку.
			<br />
			<Button colorScheme="red" onClick={playSound}>
				MessageSound
			</Button>
			<br></br>
			<Button colorScheme="blue" onClick={handleFetchUsers}>
				getAllUsers
			</Button>
		</Box>
	)
}

export default SomePannel
