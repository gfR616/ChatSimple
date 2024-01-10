import ChatPage from './components/pages/chatPage'
import LoginPage from './components/pages/loginPage'
import RegistrationPage from './components/pages/registrationPage'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
	return (
		<ChakraProvider>
			<Router>
				<Routes>
					<Route exact path="/auth" element={<LoginPage />} />
					<Route path="/register" element={<RegistrationPage />} />
					<Route exact path="/chat" element={<ChatPage />} />
					<Route path="/" element={<Navigate to="/auth" />} />
				</Routes>
			</Router>
		</ChakraProvider>
	)
}

export default App
