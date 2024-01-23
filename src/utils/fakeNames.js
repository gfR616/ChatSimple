import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'

const firestore = getFirestore()
const usersCollection = collection(firestore, 'users')
let uid = nanoid()
const fakedisplayNames = [
	{
		chats: [],
		displayName: 'Синяк',
		email: '',
		uid: uid,
	},
	{
		chats: [],
		displayName: 'Красавчик',
		email: '',
		uid: uid,
	},
	{
		chats: [],
		displayName: 'Котик',
		email: '',
		uid: uid,
	},
	{
		chats: [],
		displayName: 'Шрек',
		email: '',
		uid: uid,
	},
]

export const getFakeUsers = () => {
	fakedisplayNames.forEach((user) => {
		let uid = nanoid()
		const userRef = doc(usersCollection, uid)
		setDoc(userRef, {
			chats: user.chats,
			displayName: user.displayName,
			email: uid,
			uid: uid,
		})
	})
}
// chats
// (array)

// displayName
// "Мухоморная фея"
// (string)

// email
// "realing29@gmail.com"
// (string)

// uid
// "vfdgqnA8JLTrxIJUt06jT4Vo6Hw1"
