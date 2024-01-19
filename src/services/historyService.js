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
import { v4 } from 'uuid'

const firestore = getFirestore()
const historyCollection = collection(firestore, 'history')

//добавляем месседж в фаерстор
export const pushMessageInStore = async (message, senderUid, recipientUid, commonKey) => {
	const messageDoc = doc(historyCollection, commonKey)
	const docSnap = await getDoc(messageDoc)
	if (docSnap.exists()) {
		await updateDoc(messageDoc, {
			users: arrayUnion(senderUid, recipientUid),
			messages: arrayUnion(message),
		})
	} else {
		await setDoc(messageDoc, {
			users: [senderUid, recipientUid],
			messages: [message],
		})
	}
}

//получаем из хистори фаерстора
export const getChatHistory = async (commonKey) => {
	const messageDoc = doc(historyCollection, commonKey)
	const docSnap = await getDoc(messageDoc)
	if (docSnap.exists()) {
		console.log('Chat history: ', docSnap.data())
		return docSnap.data()
	} else {
		console.log('history not found')
		return docSnap.data()
	}
}

//инициализируем переписку/добавляем ключики
export const initialHistory = async (senderUid, recipientUid) => {
	const key = v4()
	const messageDoc = doc(historyCollection, key)
	await setDoc(messageDoc, {
		users: [senderUid, recipientUid],
		messages: [],
	})
	await addKeysToUsers(senderUid, recipientUid, key)
}
