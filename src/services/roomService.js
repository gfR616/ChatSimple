import { getDatabase, ref } from 'firebase/database'
import { customAlphabet } from 'nanoid'

const db = getDatabase()
const chatRoomsRef = db.ref('chatRooms')
const nanoid = customAlphabet('1234567890abcdef', 12)

const newChatRoomId = nanoid()
chatRoomsRef.child(newChatRoomId).set({
	messages: [],
})
