import { signIn } from '../../services/authService'
import { setUserName } from '../../store/task'
import fakeNames from '../../utils/fakeNames'
import {
	Box,
	Button,
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
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

const LoginPage = () => {
	localStorage.clear()
	let navigate = useNavigate()
	const dispatch = useDispatch()
	const [show, setShow] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSetEmail = (event) => {
		setEmail(event.target.value)
	}
	const handleSetPassword = (event) => {
		setPassword(event.target.value)
	}

	const showPassword = () => setShow(!show)

	const goRegisterPage = () => {
		navigate('/register')
	}

	const beGuest = () => {
		const randomNumber = () => {
			return Math.floor(Math.random() * 50) + 1
		}
		let randomName = fakeNames[randomNumber()].name
		dispatch(setUserName(randomName))
		navigate('/chat')
	}

	const handleLogin = async () => {
		try {
			const user = await signIn(email, password, navigate)
			dispatch(setUserName(user.displayName))
		} catch (error) {
			alert('Заполните данные!')
			console.log(error.message)
		}
	}

	return (
		<Box
			backgroundImage="/loginBg.jpg"
			bgSize="cover"
			w="100vw"
			h="100vh"
			overflow="hidden"
		>
			<Box
				borderRadius="5px"
				border="1px solid black"
				w="500px"
				h="auto"
				margin="auto"
				mt={10}
				overflow="hidden"
				bgColor="#2b312d"
				opacity={0.9}
			>
				<Box mt={3} mr={3} textAlign="center">
					<Text color="#f4f4f4fa" as="b" textAlign="center">
						Добро пожаловать в SimpleChat!
					</Text>
				</Box>

				<Box ml={3} mt={3}>
					<Text color="#fafafafa">Логиньтесь или будьте гостем</Text>
				</Box>

				<Box m={2} color="#fafafafa">
					<form>
						<FormControl>
							<FormLabel m={1}>Введите вашу почту:</FormLabel>
							<Input
								type="email"
								placeholder="Enter e-mail"
								pr="4.5rem"
								onChange={handleSetEmail}
								autoComplete="email"
							/>
						</FormControl>

						<FormControl>
							<FormLabel m={1}>Введите пароль:</FormLabel>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									type={show ? 'text' : 'password'}
									placeholder="Enter password"
									onChange={handleSetPassword}
									autoComplete="current-password"
								/>

								<InputRightElement width="4.5rem">
									<Button h="1.75rem" size="sm" onClick={showPassword}>
										{show ? 'Hide' : 'Show'}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
					</form>
					<Grid templateColumns="repeat(5, 1fr)" gap={2} m={5} mr={0} ml={0}>
						<GridItem>
							<Button
								w="110px"
								h="40px"
								colorScheme="green"
								onClick={() => handleLogin(email, password)}
							>
								Login
							</Button>
						</GridItem>
						<GridItem>
							<Button w="110px" h="40px" onClick={beGuest}>
								be a guest
							</Button>
						</GridItem>
						<GridItem colStart={5}>
							<Button
								w="110px"
								h="40px"
								colorScheme="whiteAlpha"
								onClick={goRegisterPage}
							>
								Register
							</Button>
						</GridItem>
					</Grid>
				</Box>
			</Box>
		</Box>
	)
}

export default LoginPage
