import { signIn, userSignOut } from '../../services/authService'
import { setGuestId, setGuestName } from '../../store/task'
// import fakeNames from '../../utils/fakeNames'
import RepoLink from '../ui/repoLink'
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
import { customAlphabet } from 'nanoid'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

const LoginPage = () => {
	useEffect(() => {
		localStorage.clear()
		userSignOut()
	}, [])
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

	const handleLogin = async () => {
		try {
			await signIn(email, password, navigate)
		} catch (error) {
			alert('Заполните данные!')
			console.log(error.message)
		}
	}

	return (
		<Box
			backgroundImage="chatBg.webp"
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
				mt="100px"
				overflow="hidden"
				bgColor="#1a1725"
				// opacity={0.9}
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
								name="email"
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
									name="password"
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
								{/* <Button w="110px" h="40px" onClick={beGuest}>
									be a guest
								</Button> */}
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
					</form>
				</Box>
			</Box>
			<RepoLink />
		</Box>
	)
}

export default LoginPage
