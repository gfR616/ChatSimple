import React from "react"
import { Box, Text } from "@chakra-ui/react"

const DialogScreen = ({ displayState }) => {
  return (
    <Box bg='grey' w='100%' h='400px' p={4} color='white'>
      {displayState.split("\n").map((message, index) => (
        <Text key={index}>{message}</Text>
      ))}
    </Box>
  )
}

export default DialogScreen
