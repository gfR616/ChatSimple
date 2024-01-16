import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	setDoc,
} from 'firebase/firestore'

const firestore = getFirestore()

const usersCollection = collection(firestore, 'users')
//добавляем в фаерстор
export async function addNewUser(displayName, email, uid) {
	const userDoc = doc(usersCollection, uid)
	await setDoc(userDoc, {
		displayName: displayName,
		email: email,
		uid: uid,
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
