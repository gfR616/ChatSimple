import {
	child,
	get,
	getDatabase,
	onValue,
	push,
	ref,
	set,
	update,
} from 'firebase/database'
import { customAlphabet } from 'nanoid'

// создаем рум
export const createNewRoom = async (key) => {
	const db = getDatabase()
	const messagesRef = ref(db, `base/rooms`)
	const newRoomRef = child(messagesRef, key)
	await set(newRoomRef, { messages: [] })
	console.log('Создан новый рум!', key)
	return key
}
//добавляем в рум месседжи из стора
export const addMessagesToRoom = async (commonKey, message) => {
	const db = getDatabase()
	const messageRef = ref(db, `base/rooms/${commonKey}`)
	await set(messageRef, message)
	console.log('Сообщение добавлено в рум!', commonKey, message)
}

//отправляем сообщения
export const sendMessageToRoom = async (commonKey, message) => {
	const db = getDatabase()
	const messageRef = ref(db, `base/rooms/${commonKey}/${message._id}`)
	await set(messageRef, message)
	console.log('Сообщение отправлено в рум!', commonKey, message)
}

//забираем все из рума
export const getMessagesFromRoom = (commonKey, callback) => {
	console.log('комон ки в getMessagesFromRoom', commonKey)
	const db = getDatabase()
	const messagesRef = ref(db, `base/rooms/${commonKey}`)
	onValue(messagesRef, callback)
	console.log('Сообщения запрошены забираем все из рума')
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
