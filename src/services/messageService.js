import {
	getDatabase,
	limitToLast,
	onValue,
	orderByKey,
	push,
	query,
	ref,
	set,
} from 'firebase/database'

export const getMessagesBase = () => {
	const db = getDatabase()
	if (db) {
		const messagesRef = ref(db, 'base/messages')
		return messagesRef
	} else {
		console.log('Ошибка при инициализации базы')
	}
}

export const sendMessage = (message) => {
	const messagesRef = getMessagesBase()
	push(messagesRef, message)
	console.log('Сообщение отправлено:', message)
}

export const fetchAllMessages = (callback) => {
	const messagesRef = getMessagesBase()
	onValue(messagesRef, callback, { onlyOnce: true })
	console.log('Сообщения запрошены:')
}

export const fetchLatestMessage = (callback) => {
	const messagesRef = getMessagesBase()
	const latestMessageQuery = query(messagesRef, orderByKey(), limitToLast(1))
	onValue(latestMessageQuery, callback)
	console.log('Последнее сообщение запрошено:')
}

export const clearAllMeassages = () => {
	const messagesRef = getMessagesBase()
	set(messagesRef, [])
	console.log('Все сообщения удалены')
}
