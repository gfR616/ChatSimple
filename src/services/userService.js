import {
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	setDoc,
	updateDoc,
} from 'firebase/firestore'

const firestore = getFirestore()
const usersCollection = collection(firestore, 'users')

//добавляем в фаерстор
export const addNewUser = async (displayName, email, uid) => {
	const userDoc = doc(usersCollection, uid)
	await setDoc(userDoc, {
		displayName: displayName,
		email: email,
		uid: uid,
		chats: [],
	})
		.then((uid) => {
			console.log('Document written with ID: ', uid)
		})
		.catch((error) => {
			console.error('Error adding document: ', error)
		})
}
//запрашиваем данные текущего юзера из фаерстора
export const getUserData = async (uid) => {
	const userDoc = doc(firestore, 'users', uid)
	const userSnapshot = await getDoc(userDoc)
	if (userSnapshot.exists()) {
		console.log('User data: ', userSnapshot.data())
		return userSnapshot.data()
	} else {
		console.log('No such document!')
	}
}
//получаем всех юзеров, получаем промис
export const getAllUsers = async () => {
	try {
		const usersCollection = collection(firestore, 'users')
		const snapshot = await getDocs(usersCollection)
		const usersList = snapshot.docs.map((doc) => doc.data())
		return usersList
	} catch (error) {
		console.error('Error fetching users: ', error)
		throw error
	}
}
// добавляем уникальный ключ к переписке в пользователей
export const addKeysToUsers = async (senderUid, recipientUid, key) => {
	const senderDoc = doc(firestore, 'users', senderUid)
	const recipientDoc = doc(firestore, 'users', recipientUid)
	await updateDoc(senderDoc, {
		chats: arrayUnion(key),
	})
	await updateDoc(recipientDoc, {
		chats: arrayUnion(key),
	})
}
//получаем ключи
export const getKeys = async (senderUid) => {
	const userDoc = doc(firestore, 'users', senderUid)
	const userSnapshot = await getDoc(userDoc)
	if (userSnapshot.exists()) {
		const userData = userSnapshot.data()
		return userData.chats
	} else {
		console.log('Не удалось получить ключи!')
		return []
	}
}
