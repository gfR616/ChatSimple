import { child, get, getDatabase, onValue, once, push, ref, set } from 'firebase/database'
import { customAlphabet } from 'nanoid'

// //инициализируем базу
// export const getMessagesBase = () => {
// 	const db = getDatabase()
// 	if (db) {
// 		const messagesRef = ref(db, 'base/rooms')
// 		return messagesRef
// 	} else {
// 		console.log('Ошибка при инициализации базы')
// 	}
// }

// создаем рум
export const createNewRoom = async (key) => {
	const db = getDatabase()
	const messagesRef = ref(db, `base/rooms`)
	const newRoomRef = child(messagesRef, key)
	await set(newRoomRef, { messages: [] })
	console.log('Создан новый рум!', key)
	return key
}
//добавляем в рум месседжи
export const addMessageToRoom = async (commonKey, message) => {
	const db = getDatabase()
	const messagesRef = ref(db, `base/rooms/${commonKey}`)
	// Проверяем, существует ли такой рум
	const snapshot = await get(messagesRef)
	const data = snapshot.val()
	if (data && data[message._id]) {
		console.log('Сообщение с таким ID уже существует')
		return
	}
	// Добавляем сообщение, если не существует
	const messageRef = ref(db, `base/rooms/${commonKey}/${message._id}`)
	await set(messageRef, message)
	console.log('Сообщение добавлено в рум!', commonKey, message)
}

//забираем все из рума
export const getMessagesFromRoom = (commonKey, callback) => {
	const db = getDatabase()
	const messagesRef = ref(db, `base/rooms/${commonKey}`)
	onValue(messagesRef, callback)
	console.log('Сообщения запрошены')
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
