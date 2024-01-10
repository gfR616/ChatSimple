import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth()

export const signIn = (email, password) => {
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user
			// ...
		})
		.catch((error) => {
			const errorCode = error.code
			const errorMessage = error.message
		})
}
