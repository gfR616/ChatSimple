import React from "react"
import { Button, Input } from "@chakra-ui/react"

const ChatInput = ({ onInputChange, inputState, onSendMessage }) => {
  return (
    <>
      <Input
        h='10vh'
        width='30vw'
        value={inputState}
        onChange={onInputChange}
      />
      <Button colorScheme='blue' onClick={onSendMessage}>
        Send
      </Button>
      <Button colorScheme='red'>Clear</Button>
    </>
  )
}

export default ChatInput
