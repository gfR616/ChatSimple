import { SearchIcon } from '@chakra-ui/icons'
import {
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react'
import { TfiComment, TfiFaceSmile, TfiIdBadge } from 'react-icons/tfi'

export const SearchWithDropdown = () => {
	return (
		<InputGroup>
			<InputLeftElement pointerEvents="none">
				<SearchIcon color="gray.300" />
			</InputLeftElement>
			<Input placeholder="Search" />
			<Menu>
				<MenuButton as={IconButton} aria-label="Options" icon={TfiIdBadge} />
				<MenuList>
					<MenuItem>Option 1</MenuItem>
					<MenuItem>Option 2</MenuItem>
					<MenuItem>Option 3</MenuItem>
				</MenuList>
			</Menu>
		</InputGroup>
	)
}

export default SearchWithDropdown
