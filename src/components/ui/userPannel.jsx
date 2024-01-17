import { useUsers } from '../../hooks/useUsers'
import { userSignOut } from '../../services/authService'
import { Avatar, Box, Button, Grid, GridItem, Text } from '@chakra-ui/react'
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
		<Box border="1px solid black" h="5vh" w="100%">
			<Grid h="100%" templateColumns="repeat(20, 1fr)" gap={1} alignItems="center">
				<GridItem colSpan={1}>
					<Box h="36px" w="160px" backgroundImage="logo.svg" m={1} />
				</GridItem>
				<GridItem colStart={18}>
					<Avatar size="sm" name={userName ? userName : ''} />
					<Text as="b" fontSize="15px" color="#000000" m={1}>
						{userName ? userName : ''}
					</Text>
				</GridItem>
				<GridItem>
					{!localStorage.getItem('guestName') ? (
						<Button colorScheme="blue" size="xs" onClick={goToUserSettings}>
							Настройки
						</Button>
					) : (
						<Button colorScheme="green" size="xs" onClick={handleRegister}>
							Регистрация
						</Button>
					)}
				</GridItem>
				<GridItem>
					<Button onClick={handleSignOut} colorScheme="red" size="xs">
						Выход
					</Button>
				</GridItem>
			</Grid>
		</Box>
	)
}

export default UserPannel
