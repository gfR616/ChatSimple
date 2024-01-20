import { doc, getDatabase, onValue, push, ref, set } from 'firebase/database'
import { customAlphabet } from 'nanoid'

//инициализируем базу
export const getMessagesBase = () => {
	const db = getDatabase()
	if (db) {
		const messagesRef = ref(db, 'base/rooms')
		return messagesRef
	} else {
		console.log('Ошибка при инициализации базы')
	}
}

//создаем рум
export const createNewRoom = async (messages) => {
	const db = getDatabase()
	const chatRoomsRef = ref(db, 'base/rooms')
	const nanoid = customAlphabet('1234567890abcdef', 15)
	const newChatRoomId = nanoid()
	const newRoomRef = push(chatRoomsRef)
	await set(newRoomRef, messages)
	console.log('Создан новый рум!', newChatRoomId)
	return newChatRoomId
}
//добавляем в рум меседжи
export const addMessageToRoom = (roomId, message) => {
	const db = getDatabase()
	const messagesRef = db.ref(`chatRooms/${roomId}/messages`)
	messagesRef.push(message)
	console.log('Сообщения добавлены в рум!', roomId, message)
}
//забираем все из рума
export const getMessagesFromRoom = (roomId) => {
	return new Promise((resolve, reject) => {
		const db = getDatabase()
		const messagesRef = db.ref(`chatRooms/${roomId}/messages`)
		messagesRef.once(
			'value',
			(snapshot) => {
				resolve(snapshot.val())
				console.log('Сообщения получены из рума!', roomId)
			},
			reject,
		)
	})
}
//чистим рум
export const clearRoom = (roomId) => {
	const db = getDatabase()
	const messagesRef = db.ref(`chatRooms/${roomId}/messages`)
	messagesRef.remove()
	console.log('Сообщения удалены из рума!', roomId)
}
//удаляем рум
export const deleteRoom = (roomId) => {
	const db = getDatabase()
	const roomRef = db.ref(`chatRooms/${roomId}`)
	roomRef.remove()
	console.log('Рум удален!', roomId)
}
