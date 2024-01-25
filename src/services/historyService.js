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
export const getAllUserHistory = async (userChats) => {
	try {
		const messages = []
		// Для каждого ключа в userChats выполним отдельный запрос
		for (const chat of userChats) {
			const q = query(historyCollection, where('__name__', '==', chat))
			const querySnapshot = await getDocs(q)
			// Добавим данные из каждого документа в массив messages
			querySnapshot.forEach((doc) => {
				Object.values(doc.data()).forEach((message) => {
					messages.push(message)
				})
			})
		}
		return messages
	} catch (error) {
		console.log('Не удалось получить совпадении в хистории', error)
	}
}
