import {
  Box,
  Button,
  Input,
  Text,
  Grid,
  GridItem,
  InputGroup,
  InputRightElement,
  Checkbox
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { setUserName } from "../store/task"
import fakeNames from "../../utils/fakeNames"


const LoginPage = () => {
  localStorage.clear()
  let navigate = useNavigate()
  const goRegisterPage = () => {
    navigate("/register")
  }
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const showPassword = () => setShow(!show)

  const beGuest = () => {
    const randomNumber = () =>  {
      return Math.floor(Math.random() * 50) + 1;
    }
    let randomName = fakeNames[randomNumber()].name
    dispatch(setUserName(randomName))
    navigate("/chat")

  }

  return (
    <Box
      backgroundImage='/loginBg.jpg'
      bgSize='cover'
      w='100vw'
      h='100vh'
      overflow='hidden'
    >
      <Box
        position='absolute'
        top='50%'
        left='50%'
        transform='translate(-50%, -126%)'
        borderRadius='5px'
        border='1px solid black'
        w='500px'
        h='auto'
        margin='auto'
        mt={10}
        overflow='hidden'
        bgColor='#2b312d'
        opacity={0.9}
      >
        <Box mt={3} mr={3} textAlign='center'>
          <Text color='#f4f4f4fa' as='b' textAlign='center'>
            Добро пожаловать в SimpleChat!
          </Text>
        </Box>

        <Box ml={3} mt={3}>
          <Text color='#fafafafa'>Логиньтесь или будьте гостем</Text>
        </Box>

        <Box m={2} color='#fafafafa'>
          <Text m={1}>Введите вашу почту:</Text>
          <Input
            // onChange={handleChange}
            placeholder='Enter e-mail'
            pr='4.5rem'
          />

          <Text m={1}>Введите пароль:</Text>
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              type={show ? "text" : "password"}
              placeholder='Enter password'
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={showPassword}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Grid templateColumns='repeat(5, 1fr)' gap={2} m={5} mr={0} ml={0}>
            <GridItem>
              <Button w='110px' h='40px' colorScheme='green'>
                Login
              </Button>
            </GridItem>
            <GridItem>
              <Button w='110px' h='40px' onClick={beGuest}>
                be a guest
              </Button>
            </GridItem>
            <GridItem colStart={5}>
              <Button
                w='110px'
                h='40px'
                colorScheme='whiteAlpha'
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
