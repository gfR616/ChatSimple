import React, { useEffect, useState } from "react"
import ChatInput from "./chatInput"
import DialogScreen from "./dialogScreen"
import { useDispatch, useSelector } from "react-redux"
import { Box } from "@chakra-ui/react"
import { setUserName } from "../../store/task"

const Chat = () => {
  const dispatch = useDispatch()
  const userName = useSelector((state) => state.user.userName)
  const [inputState, setInputState] = useState("")
  const [displayState, setDisplayState] = useState([])

  useEffect(() => {
    let storedUserName = localStorage.getItem("userName")
    if (!userName && storedUserName) {
      dispatch(setUserName(storedUserName))
    } else if (userName) {
      localStorage.setItem("userName", userName)
    }
  }, [dispatch, userName])

  useEffect(() => {
    let storedState = localStorage.getItem("displayState")
    if (storedState) setDisplayState(JSON.parse(storedState))
  }, [])

  const handleInputChange = (event) => {
    setInputState(event.target.value)
  }

  const handleSendMessage = () => {
    const addDisplayElement = {
      userName: userName,
      message: inputState,
      time: new Date().toLocaleTimeString()
    }
    setDisplayState((prevState) => {
      const newState = [...prevState, addDisplayElement]
      localStorage.setItem("displayState", JSON.stringify(newState))
      return newState
    })
    setInputState("")
  }

  const handleClearScreen = () => {
    setDisplayState([])
    localStorage.removeItem("displayState")
  }

  console.log(localStorage)
  return (
    <>
      <DialogScreen
        displayState={displayState}
        onClearScreen={handleClearScreen}
      />
      <ChatInput
        onInputChange={handleInputChange}
        onSendMessage={handleSendMessage}
        onClearScreen={handleClearScreen}
        inputState={inputState}
      />
      <Box>Hello, {userName}</Box>
    </>
  )
}

export default Chat
