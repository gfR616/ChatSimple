import {
	Box,
	Button,
	Checkbox,
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
	const [show, setShow] = useState(false)
	const showPassword = () => setShow(!show)
	const navigate = useNavigate()
	const goBack = () => {
		navigate('/auth')
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
				position="absolute"
				top="50%"
				left="50%"
				transform="translate(-50%, -70%)"
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
					<Text color="#fafafafa">Здесь обычно регистрируются</Text>
				</Box>

				<Box m={2} color="#fafafafa">
					<Text m={1}>Введите вашу почту:</Text>
					<Input
						// onChange={handleChange}
						placeholder="Enter e-mail"
						pr="4.5rem"
					/>
					<Box h="2rem" w="10px"></Box>

					<Text m={1}>Введите пароль:</Text>
					<InputGroup size="md">
						<Input
							pr="4.5rem"
							type={show ? 'text' : 'password'}
							placeholder="Введите пароль:"
						/>
						<InputRightElement width="4.5rem">
							<Button h="1.75rem" size="sm" onClick={showPassword}>
								{show ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
					</InputGroup>

					<Text m={1}>Повторите пароль:</Text>
					<InputGroup size="md">
						<Input
							pr="4.5rem"
							type={show ? 'text' : 'password'}
							placeholder="Repeat password"
						/>
						<InputRightElement width="4.5rem">
							<Button h="1.75rem" size="sm" onClick={showPassword}>
								{show ? 'Hide' : 'Show'}
							</Button>
						</InputRightElement>
					</InputGroup>

					<Box h="2rem" w="10px"></Box>

					<Text m={1}>Укажите ваш никнейм:</Text>
					<InputGroup size="md">
						<Input pr="4.5rem" placeholder="Your nickname" />
						<InputRightElement width="4.5rem"></InputRightElement>
					</InputGroup>

					<Checkbox mt={3}>Я согласен(на) на все. Не бойся, жми! ; )</Checkbox>

					<Grid templateColumns="repeat(5, 1fr)" gap={2} m={5} mr={0} ml={0}>
						<GridItem colStart={1}>
							<Button w="110px" h="40px" colorScheme="whiteAlpha" onClick={goBack}>
								Back
							</Button>
						</GridItem>
						<GridItem colStart={5}>
							<Button w="110px" h="40px" colorScheme="green">
								Register!
							</Button>
						</GridItem>
					</Grid>
				</Box>
			</Box>
		</Box>
	)
}

export default RegistrationPage
