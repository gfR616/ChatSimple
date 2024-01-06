import { Box, Button, Input } from "@chakra-ui/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { setUserName } from "../store/task"

const LoginPage = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const userName = useSelector((state) => state.user.userName)
  const handleSetUserName = (event) => {
    dispatch(setUserName(event.target.value))
  }

  const goNext = () => {
    if (userName) {
      navigate("/chat")
    } else {
      toast.error("GIVE ME YOUR NAME!")
    }
  }

  return (
    <Box>
      <Box>give your name, please</Box>
      <Input onChange={handleSetUserName} />
      <Button colorScheme='teal' size='lg' onClick={goNext}>
        go next
      </Button>
      <ToastContainer position='top-center' />
    </Box>
  )
}

export default LoginPage
