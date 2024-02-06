import { register } from '../../services/authService'
import RepoLink from '../ui/repoLink'
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

const RegistrationPage = () => {
	const navigate = useNavigate()
	const [showOnePassword, setShowOnePassword] = useState(false)
	const [showSecondPassword, setShowSecondPassword] = useState(false)
	const [email, setEmail] = useState('')
	const [firstEnterPassword, setFirstEnterPassword] = useState('')
	const [repeatPassword, setRepeatPasswordl] = useState('')
	const [displayName, setDisplayName] = useState('')
	const [chekApprove, setChekApprove] = useState(false)

	const handleShowPasswordOne = () => setShowOnePassword(!showOnePassword)
	const handlehowPasswordTwo = () => setShowSecondPassword(!showSecondPassword)

	const goBack = () => {
		navigate('/auth')
	}

	const handleRegister = async () => {
		if (!firstEnterPassword || !repeatPassword || !displayName || !chekApprove) {
			alert('Заполните данные!')
			return
		} else if (firstEnterPassword !== repeatPassword) {
			alert('Пароли не совпадают!')
			return
		}
		try {
			await register(email, repeatPassword, displayName, navigate)
		} catch (error) {
			alert('Регистрация не удалась, проверьте данные')
			console.log(error.message)
		}
	}

	const handleSetFirstEnterPassword = (event) => {
		setFirstEnterPassword(event.target.value)
	}
	const handleSetRepeatPassword = (event) => {
		setRepeatPasswordl(event.target.value)
	}
	const handleSetEmail = (event) => {
		setEmail(event.target.value)
	}
	const handleDisplayName = (event) => {
		setDisplayName(event.target.value)
	}
	const handleSetApprove = () => {
		setChekApprove(!chekApprove)
	}
	return (
		<Box backgroundImage="bg.webp" bgSize="cover" w="100vw" h="100vh" overflow="hidden">
			<Box
				borderRadius="5px"
				border="1px solid black"
				w="500px"
				h="auto"
				margin="auto"
				mt="100px"
				overflow="hidden"
				bgColor="#1a1725"
			>
				<Box mt={3} mr={3} textAlign="center">
					<Text color="#f4f4f4fa" as="b" textAlign="center">
						Добро пожаловать в SimpleChat!
					</Text>
				</Box>

				<Box ml={3} mt={3}>
					<Text color="#fafafafa">Здесь обычно регистрируются</Text>
				</Box>

				<Box m={2} color="#fafafafa">
					<form>
						<FormControl isRequired>
							<FormLabel m={1}>Введите вашу почту:</FormLabel>
							<Input
								placeholder="Enter e-mail"
								pr="4.5rem"
								autoComplete="off"
								onChange={handleSetEmail}
							/>
						</FormControl>

						<Box h="2rem" w="10px"></Box>

						<FormControl isRequired>
							<FormLabel m={1}>Введите пароль:</FormLabel>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									type={showOnePassword ? 'text' : 'password'}
									placeholder="Введите пароль:"
									autoComplete="off"
									onChange={handleSetFirstEnterPassword}
								/>
								<InputRightElement width="4.5rem">
									<Button h="1.75rem" size="sm" onClick={handleShowPasswordOne}>
										{showOnePassword ? 'Hide' : 'Show'}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>

						<FormControl isRequired>
							<FormLabel m={1}>Повторите пароль:</FormLabel>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									type={showSecondPassword ? 'text' : 'password'}
									placeholder="Repeat password"
									autoComplete="off"
									onChange={handleSetRepeatPassword}
								/>
								<InputRightElement width="4.5rem">
									<Button h="1.75rem" size="sm" onClick={handlehowPasswordTwo}>
										{showSecondPassword ? 'Hide' : 'Show'}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>

						<Box h="2rem" w="10px"></Box>

						<FormControl isRequired>
							<FormLabel m={1}>Укажите ваш никнейм:</FormLabel>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									placeholder="Your nickname"
									onChange={handleDisplayName}
								/>
								<InputRightElement width="4.5rem"></InputRightElement>
							</InputGroup>
						</FormControl>
					</form>

					<Checkbox mt={3} onChange={handleSetApprove}>
						Я согласен(на) на все. Не бойся, жми! ; )
					</Checkbox>

					<Grid templateColumns="repeat(5, 1fr)" gap={2} m={5} mr={0} ml={0}>
						<GridItem colStart={1}>
							<Button w="110px" h="40px" colorScheme="whiteAlpha" onClick={goBack}>
								Back
							</Button>
						</GridItem>
						<GridItem colStart={5}>
							<Button w="110px" h="40px" colorScheme="green" onClick={handleRegister}>
								Register!
							</Button>
						</GridItem>
					</Grid>
				</Box>
			</Box>
			<RepoLink />
		</Box>
	)
}

export default RegistrationPage
