import React, { useEffect } from "react"
import Chat from "../ui/chat/chat"
import { Box } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ChatPage = () => {
  const navigate = useNavigate()
  const userName = useSelector((state) => state.user.userName)
  // useEffect(() => {
  //   if (!userName) {
  //     navigate("/auth")
  //   }
  // }, [navigate, userName])
  return (
    <Box>
      <Chat />
    </Box>
  )
}

export default ChatPage
