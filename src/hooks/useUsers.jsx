import { userStatusListener } from '../services/authService'
import { getAllUsers, getUserData } from '../services/userService'
import React, { useContext, useEffect, useState } from 'react'

const UsersContext = React.createContext()

export const useUsers = () => {
	return useContext(UsersContext)
}

//получаем пользователя и его данные
export const UsersProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [users, setUsers] = useState(null)

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
	const getUsers = async () => {
		const allUsers = await getAllUsers()
		setUsers(allUsers)
	}

	useEffect(() => {
		getUser()
		getUsers()
	}, [])

	return (
		<UsersContext.Provider value={{ user, getUser, users, getUsers }}>
			{children}
		</UsersContext.Provider>
	)
}
