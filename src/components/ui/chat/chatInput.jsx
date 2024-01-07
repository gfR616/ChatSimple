import React from "react"
import { Button, Input } from "@chakra-ui/react"

const ChatInput = ({
  onInputChange,
  inputState,
  onSendMessage,
  onClearScreen
}) => {
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
      <Button colorScheme='red' onClick={onClearScreen}>
        Clear
      </Button>
    </>
  )
}

export default ChatInput
