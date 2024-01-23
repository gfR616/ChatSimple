import { addKeysToUsers } from './userService'
import {
	arrayUnion,
	collection,
	doc,
	getDoc,
	getFirestore,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import { customAlphabet } from 'nanoid'

const firestore = getFirestore()
const historyCollection = collection(firestore, 'history')

//добавляем месседж в фаерстор
export const pushMessageInStore = async (message, commonKey) => {
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
