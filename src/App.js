import ChatPage from './components/pages/chatPage'
import LoginPage from './components/pages/loginPage'
import RegistrationPage from './components/pages/registrationPage'
import UserSettingsPage from './components/pages/userSettingsPage'
import { UsersProvider } from './hooks/useUsers'
import './scrollBar.css'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'

function App() {
	return (
		<ChakraProvider>
			<UsersProvider>
				<Router>
					<Routes>
						<Route exact path="/auth" element={<LoginPage />} />
						<Route path="/register" element={<RegistrationPage />} />
						<Route exact path="/chat" element={<ChatPage />} />
						<Route exact path="/userSettings" element={<UserSettingsPage />} />
						<Route path="/" element={<Navigate to="/auth" />} />
					</Routes>
				</Router>
			</UsersProvider>
		</ChakraProvider>
	)
}

export default App
