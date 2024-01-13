import { userStatusListener } from '../services/authService'
import { getUserData } from '../services/userService'
import React, { useContext, useEffect, useState } from 'react'

const UsersContext = React.createContext()

export const useUsers = () => {
	return useContext(UsersContext)
}

export const UsersProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	const getUser = async () => {
		const userData = userStatusListener(async (currentUser) => {
			if (currentUser) {
				const data = await getUserData(currentUser.uid)
				setUser(data)
			} else {
				setUser(null)
			}
		})
		return () => userData()
	}

	useEffect(() => {
		getUser()
	}, [])

	return (
		<UsersContext.Provider value={{ user, getUser }}>{children}</UsersContext.Provider>
	)
}
