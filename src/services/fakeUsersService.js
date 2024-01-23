import {
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	updateDoc,
} from 'firebase/firestore'

const firestore = getFirestore()
//запрашиваем данные текущего юзера из фаерстора
export const getFakeUserData = async (uid) => {
	const userDoc = doc(firestore, 'fakeUsers', uid)
	const userSnapshot = await getDoc(userDoc)
	if (userSnapshot.exists()) {
		console.log('User data: ', userSnapshot.data())
		return userSnapshot.data()
	} else {
		console.log('No such document!')
	}
}
//получаем всех юзеров, получаем промис
export const getAllFakeUsers = async () => {
	try {
		const usersCollection = collection(firestore, 'fakeUsers')
		const snapshot = await getDocs(usersCollection)
		const usersList = snapshot.docs.map((doc) => doc.data())
		return usersList
	} catch (error) {
		console.error('Error fetching users: ', error)
		throw error
	}
}
// добавляем уникальный ключ к переписке в пользователей
export const addKeysToFakeUsers = async (senderUid, recipientUid, key) => {
	const senderDoc = doc(firestore, 'fakeUsers', senderUid)
	const recipientDoc = doc(firestore, 'fakeUsers', recipientUid)
	await updateDoc(senderDoc, {
		chats: arrayUnion(key),
	})
	await updateDoc(recipientDoc, {
		chats: arrayUnion(key),
	})
}
//получаем ключи
export const getKeysFakeUser = async (uid) => {
	const userDoc = doc(firestore, 'fakeUsers', uid)
	const userSnapshot = await getDoc(userDoc)
	if (userSnapshot.exists()) {
		const userData = userSnapshot.data()
		return userData.chats
	} else {
		console.log('Не удалось получить ключи!')
		return []
	}
}
