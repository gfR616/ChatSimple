import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'

const firestore = getFirestore()
const historyCollection = collection(firestore, 'history')

//добавляем в фаерстор
export const pushMessageInStore = async (senderUid, recipientUid) => {
	const messageDoc = doc(historyCollection, senderUid, recipientUid)
	await setDoc(messageDoc, {
		users: [senderUid, recipientUid],
		messages: [],
	})
}
