import { clearAllMeassages } from '../../services/messageService'
import { fetchUsers, getAllUsers, printUsers } from '../../services/userService'
import { Box, Button, Link } from '@chakra-ui/react'
import React from 'react'

const SomePannel = () => {
	const playSound = () => {
		const audio = new Audio('message.mp3')
		audio.addEventListener('canplaythrough', (event) => {
			audio.play()
		})
	}
	// удаляем все сообщения
	const handleClearScreen = () => {
		clearAllMeassages()
	}
	return (
		<Box w="100%" minH="95vh" border="1px solid black" borderRadius={5}>
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
			<br></br>А эта кнопка удаляет все сообщения из базы.<br></br> Не жми, подумой!
			<br></br>
			<Button colorScheme="yellow" onClick={handleClearScreen}>
				Clear
			</Button>
			<br></br>
			Для удобства добавляю ссылку на этот чат, пользуйтесь на здоровье.
			<br />
			<Link href="https://gfr616.github.io/ChatSimple/" color="coral" target="_blank">
				https://gfr616.github.io/ChatSimple/
			</Link>
		</Box>
	)
}

export default SomePannel
