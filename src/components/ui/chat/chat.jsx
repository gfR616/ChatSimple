import React, { useState } from "react"
import ChatInput from "./chatInput"
import DialogScreen from "./dialogScreen"
import { useSelector } from "react-redux"
import { Box } from "@chakra-ui/react"

const Chat = () => {
  const userName = useSelector((state) => state.user.userName)

  const [inputState, setInputState] = useState("")

  const [displayState, setDisplayState] = useState([])

  const handleInputChange = (event) => {
    setInputState(event.target.value)
  }
  const handleSendMessage = () => {
    const addDisplayElement = {
      userName: userName,
      message: inputState,
      time: new Date().toLocaleTimeString()
    }
    setDisplayState([...displayState, addDisplayElement])
    setInputState("")
  }
  const handleClearScreen = () => {
    setDisplayState([])
  }

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
