import { collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

const firestore = getFirestore()

const usersCollection = collection(firestore, 'users')
//добавляем в фаерстор
export async function addNewUser(displayName, email, uid) {
	const userDoc = doc(usersCollection, uid)
	await setDoc(userDoc, {
		displayName: displayName,
		email: email,
	})
		.then((uid) => {
			console.log('Document written with ID: ', uid)
		})
		.catch((error) => {
			console.error('Error adding document: ', error)
		})
}
//запрашиваем данные из фаерстора
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
