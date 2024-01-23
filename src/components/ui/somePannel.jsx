import { getFakeUsers } from '../../utils/fakeUsersGenerator'
import { Box, Button, Link } from '@chakra-ui/react'
import React from 'react'

const SomePannel = () => {
	const playSound = () => {
		const audio = new Audio('message.mp3')
		audio.addEventListener('canplaythrough', (event) => {
			audio.play()
		})
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
			<br></br>
			Для удобства добавляю ссылку на этот чат, пользуйтесь на здоровье.
			<br />
			<Link href="https://gfr616.github.io/ChatSimple/" color="coral" target="_blank">
				https://gfr616.github.io/ChatSimple/
			</Link>
			<br />
			Можешь нажать:
			<br />
			<Button
				isDisabled
				colorScheme="messenger"
				title="обойдешься"
				onClick={() => getFakeUsers(10)}
			>
				Добавить фейк юзерс{' '}
			</Button>
			<input></input>
		</Box>
	)
}

export default SomePannel
