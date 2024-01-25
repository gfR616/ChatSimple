import { getAllUsers } from '../../../services/userService'
import { useEffect, useState } from 'react'
import { TfiComment, TfiFaceSmile, TfiIdBadge } from 'react-icons/tfi'
import AsyncSelect from 'react-select/async'

export const SearchWithDropdown = () => {
	const handleFetchUsers = async (inputValue, callback) => {
		try {
			const users = await getAllUsers()
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

/* <GridItem>
							<SearchWithDropdown users={users} />
							<Menu>
								<Box></Box>
								<SubMenu
									label={collapsed ? <TfiFaceSmile size={30} /> : 'Все пользователи'}
									style={{ overflow: 'auto', maxHeight: '200px' }}
								>
									{users &&
										users.map((user) => {
											return (
												<MenuItem key={user.uid} onClick={() => handleOpenChat(user.uid)}>
													{user.displayName}
												</MenuItem>
											)
										})}
								</SubMenu>
								<SubMenu
									label={collapsed ? <TfiComment size={30} /> : 'Мои контакты'}
								></SubMenu>
							</Menu>
						</GridItem>
						<GridItem rowEnd={3}></GridItem>
					</Grid> */
