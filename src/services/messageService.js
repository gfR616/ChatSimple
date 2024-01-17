import { getDatabase, onValue, push, ref, set } from 'firebase/database'

export const getMessagesBase = () => {
	const db = getDatabase()
	if (db) {
		const messagesRef = ref(db, 'base/messages')
		return messagesRef
	} else {
		console.log('Ошибка при инициализации базы')
	}
}

export const pushMessageInRTDB = (message) => {
	const messagesRef = getMessagesBase()
	push(messagesRef, message)
	console.log('Сообщение отправлено:', message)
}

export const fetchAllMessages = (callback) => {
	const messagesRef = getMessagesBase()
	onValue(messagesRef, callback)
	console.log('Сообщения запрошены:')
}

export const clearAllMeassages = () => {
	const messagesRef = getMessagesBase()
	set(messagesRef, [])
	console.log('Все сообщения удалены')
}
