import { addKeysToUsers } from './userService'
import {
	FieldPath,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore'
import { customAlphabet } from 'nanoid'

const firestore = getFirestore()
const historyCollection = collection(firestore, 'history')

//добавляем месседж в фаерстор
export const pushMessageInStore = async (commonKey, message) => {
	const messageDoc = doc(historyCollection, commonKey)
	const docSnap = await getDoc(messageDoc)
	if (docSnap.exists()) {
		await updateDoc(messageDoc, {
			...docSnap.data().messages,
			[message._id]: message,
		})
	} else {
		await setDoc(messageDoc, {
			[message._id]: message,
		})
	}
}

//получаем из хистори фаерстора
export const getChatHistory = async (commonKey) => {
	const messageDoc = doc(historyCollection, commonKey)
	const docSnap = await getDoc(messageDoc)
	const history = docSnap.data()
	if (docSnap.exists()) {
		console.log('Chat history: ', history)
		return history
	} else {
		console.log('history not found')
		return []
	}
}

//инициализируем переписку/добавляем ключики
export const initialHistory = async (senderUid, recipientUid) => {
	const nanoid = customAlphabet('1234567890abcdef', 28)
	const key = nanoid()
	console.log('key', key)
	const messageDoc = doc(historyCollection, key)
	await setDoc(messageDoc, {})
	await addKeysToUsers(senderUid, recipientUid, key)
}

//получаем всю хисторию по совпадению
export async function getAllUserHistory(userChats) {
	const messages = []
	for (const chat of userChats) {
		const q = query(historyCollection, where('__name__', '==', chat))
		const querySnapshot = await getDocs(q)
		querySnapshot.forEach((doc) => {
			const chatMessages = Object.values(doc.data())
			const latestMessage = chatMessages.reduce((latest, message) => {
				let latestTimestamp = latest && new Date(latest.isoDate)
				let messageTimestamp = message && new Date(message.isoDate)
				return messageTimestamp > latestTimestamp ? message : latest
			}, null)
			messages.push({ chat, latestMessage })
		})
	}
	return messages
}
