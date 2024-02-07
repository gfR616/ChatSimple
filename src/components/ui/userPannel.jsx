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
		<Box
			backgroundImage="linear-gradient(to right,  #1c5f90, gray.500, #994f4f)"
			h="5vh"
			w="100%"
			borderBottom="1px black solid"
			mix-blend-mode="normal"
		>
			<Grid h="100%" templateColumns="repeat(20, 1fr)" gap={1} alignItems="center">
				<GridItem>
					<Box h="36px" w="160px" backgroundImage="logo.svg" m={1} />
				</GridItem>
				<GridItem colStart={19} display="flex">
					<Avatar size="sm" name={userName ? userName : ''} />
					<Text as="b" fontSize="15px" color="#ffffff" m="5px" whiteSpace="nowrap">
						{userName ? userName : ''}
					</Text>
				</GridItem>
				{/* <GridItem>
					{!localStorage.getItem('guestName') ? (
						<Button colorScheme="blue" size="xs" onClick={goToUserSettings}>
							Настройки
						</Button>
					) : (
						<Button colorScheme="green" size="xs" onClick={handleRegister}>
							Регистрация
						</Button>
					)}
				</GridItem> */}
				<GridItem colStart={20}>
					<Button onClick={handleSignOut} colorScheme="BlackAlpha" size="xs">
						Выход
					</Button>
				</GridItem>
			</Grid>
		</Box>
	)
}

export default UserPannel
