import {
	arrayUnion,
	collection,
	doc,
	getDoc,
	getFirestore,
	setDoc,
	updateDoc,
} from 'firebase/firestore'

const firestore = getFirestore()
const historyCollection = collection(firestore, 'history')

//добавляем в фаерстор
export const pushMessageInStore = async (message, senderUid, recipientUid) => {
	const messageDoc = doc(historyCollection, `${senderUid}_${recipientUid}`)
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

//получаем из фаерстора
export const getChatHistory = async (senderUid, recipientUid) => {
	const messageDoc = doc(historyCollection, `${senderUid}_${recipientUid}`)

	const docSnap = await getDoc(messageDoc)
	if (docSnap.exists()) {
		console.log('Chat history: ', docSnap.data())
		return docSnap.data()
	} else {
		console.log('history not found')
		return docSnap.data()
	}
}

//инициализируем переписку
export const initialHistory = async (senderUid, recipientUid) => {
	const messageDoc = doc(historyCollection, `${senderUid}_${recipientUid}`)
	await setDoc(messageDoc, {
		users: [senderUid, recipientUid],
		messages: [],
	})
}
