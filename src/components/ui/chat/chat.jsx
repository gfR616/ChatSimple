import React, { useState } from "react"
import ChatInput from "./chatInput"
import DialogScreen from "./dialogScreen"
import { useSelector } from "react-redux"
import { Box } from "@chakra-ui/react"

const Chat = () => {
  const userName = useSelector((state) => state.user.userName)
  const [inputState, setInputState] = useState("")
  const [displayState, setDisplayState] = useState("")
  const handleInputChange = (event) => {
    setInputState(event.target.value)
  }
  const handleSendMessage = () => {
    setDisplayState((prevState) => prevState + inputState + "\n")
    setInputState("")
  }

  return (
    <>
      <DialogScreen displayState={displayState} />
      <ChatInput
        onInputChange={handleInputChange}
        onSendMessage={handleSendMessage}
        inputState={inputState}
      />
      <Box>Hello, {userName}</Box>
    </>
  )
}

export default Chat
