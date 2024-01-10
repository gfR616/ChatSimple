import { Link } from '@chakra-ui/react'
import React from 'react'

const RepoLink = () => {
	return (
		<Link
			color="#fffefe"
			href="https://gfr616.github.io/ChatSimple/"
			position="absolute"
			right={10}
			bottom={5}
		>
			Репозиторий проекта на GitHub
		</Link>
	)
}

export default RepoLink
