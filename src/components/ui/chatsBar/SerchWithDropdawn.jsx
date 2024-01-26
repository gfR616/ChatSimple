import { getAllUsers } from '../../../services/userService'
import { useEffect, useState } from 'react'
import { TfiComment, TfiFaceSmile, TfiIdBadge } from 'react-icons/tfi'
import AsyncSelect from 'react-select/async'

export const SearchWithDropdown = ({ onOpenChat, setOpenChat }) => {
	const handleFetchUsers = async (inputValue, callback) => {
		try {
			let users = await getAllUsers()
			if (inputValue) {
				users = users.filter((user) =>
					user.displayName.toLowerCase().includes(inputValue.toLowerCase()),
				)
			}
			const formattedUsers = users.map((user) => ({
				value: user.uid,
				label: user.displayName,
			}))
			callback(formattedUsers)
		} catch (error) {
			console.log('Ошибка получения пользователей', error)
		}
	}

	const [selectedOption, setSelectedOption] = useState(null)
	const handleChange = (option) => {
		setSelectedOption(option)
		console.log(`Option selected:`, option)
		if (option) {
			onOpenChat(option.value)
			setOpenChat(option.value)
		}
	}

	return (
		<AsyncSelect
			value={selectedOption}
			onChange={handleChange}
			loadOptions={handleFetchUsers}
		/>
	)
}

export default SearchWithDropdown