import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { HashRouter as Router, Route, Navigate, Routes } from "react-router-dom"
import RegistrationPage from "./components/pages/registrationPage"
import LoginPage from "./components/pages/loginPage"
import ChatPage from "./components/pages/chatPage"

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path='/register' element={<RegistrationPage />} />
          <Route exact path='/auth' element={<LoginPage />} />
          <Route exact path='/chat' element={<ChatPage />} />
          <Route path='/' element={<Navigate to='/auth' />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
