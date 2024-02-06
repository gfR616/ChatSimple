import { Link } from '@chakra-ui/react'
import React from 'react'

const RepoLink = () => {
	return (
		<Link
			color="#ecbb09"
			fontSize="15px"
			href="https://github.com/gfR616/ChatSimple"
			position="absolute"
			right={10}
			bottom={5}
		>
			Репозиторий проекта на GitHub
		</Link>
	)
}

export default RepoLink
