import { useUsers } from '../../hooks/useUsers'
import { userSignOut } from '../../services/authService'
import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserPannel = ({ userName }) => {
	const navigate = useNavigate()
	const goToUserSettings = () => {
		navigate('/userSettings')
	}
	const handleSignOut = () => {
		userSignOut()
		navigate('/auth', { replace: true })
	}
	const handleRegister = () => {
		navigate('/register', { replace: true })
	}

	return (
		<Box border="2px solid black" display="flex" justifyContent="space-between" h="4vh">
			<Box border="1px solid black" h="35px" w="160px" backgroundImage="logo.svg"></Box>
			<Box border="1px solid black" borderRadius={5} h="35px">
				<Text as="b" fontSize="20px" color="#000000">
					{userName ? userName : ''}
				</Text>
				{!localStorage.getItem('guestName') ? (
					<Button colorScheme="blue" size="xs" m={1} onClick={goToUserSettings}>
						Настройки
					</Button>
				) : (
					<Button colorScheme="green" size="xs" onClick={handleRegister}>
						Регистрация
					</Button>
				)}

				<Button onClick={handleSignOut} colorScheme="red" size="xs" m={1}>
					Выход
				</Button>
			</Box>
		</Box>
	)
}

export default UserPannel
