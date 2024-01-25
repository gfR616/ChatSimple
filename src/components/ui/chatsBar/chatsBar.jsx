import { useInitialChat } from '../../../hooks/useInitialChat'
import { getAllUsers } from '../../../services/userService'
import { setRecipientUid } from '../../../store/task'
import SearchWithDropdown from './SerchWithDropdawn'
import ChatsList from './chatsList/chatsList'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Button, Menu, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { TfiComment, TfiFaceSmile, TfiIdBadge } from 'react-icons/tfi'
import { useDispatch } from 'react-redux'

const ChatsBar = ({ senderUid }) => {
	const dispatch = useDispatch()
	const [collapsed, setCollapsed] = useState(true)
	console.log('senderUid', senderUid)
	const [users, setUsers] = useState()

	useEffect(() => {
		const handleFetchUsers = async () => {
			const allUsers = await getAllUsers()
			setUsers(allUsers)
		}

		handleFetchUsers()
	}, [])

	const { InitialChat } = useInitialChat()

	const handleOpenChat = async (recipientUid) => {
		dispatch(setRecipientUid(recipientUid))
		InitialChat(senderUid, recipientUid)
	}
	return (
		<Box h="95vh" bgColor="green.100" border="1px black solid" borderRadius={5}>
			<Box h="8vh" border="1px black solid" borderRadius={5} p={1}>
				<Text>Поиск по всем пользоваетлям:</Text>
				<SearchWithDropdown />
			</Box>
			<ChatsList />
		</Box>
	)
}

export default ChatsBar
