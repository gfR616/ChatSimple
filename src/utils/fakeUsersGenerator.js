import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'
import { customAlphabet } from 'nanoid'
import { adjectives, animals, colors, uniqueNamesGenerator } from 'unique-names-generator'

const firestore = getFirestore()
const usersCollection = collection(firestore, 'fakeUsers')

export const getFakeUsers = (count) => {
	for (let i = 0; i < count; i++) {
		const randomName = uniqueNamesGenerator({
			dictionaries: [colors, animals],
			length: 2,
			separator: ' ',
		})
		const randomUid = customAlphabet('1234567890abcdef', 30)
		const fakeUid = randomUid()
		const randomEmail = customAlphabet('1234567890abcdef', 10)
		const fakeEmail = `${randomEmail()}@mail.com`
		const userRef = doc(usersCollection, fakeUid)
		setDoc(userRef, {
			chats: [],
			displayName: randomName,
			email: fakeEmail,
			uid: fakeUid,
		})
	}
}
