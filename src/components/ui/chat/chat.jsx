import React, { useState } from "react"
import ChatInput from "./chatInput"
import DialogScreen from "./dialogScreen"

const Chat = () => {
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
    </>
  )
}

export default Chat
