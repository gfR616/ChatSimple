import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth'

const auth = getAuth()

export const signIn = async (email, password, navigate) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password)
		console.log(userCredential)
		const user = userCredential.user
		console.log(user)
		localStorage.setItem('user', JSON.stringify(user))
		// navigate('/chat')
	} catch (error) {
		const errorCode = error.code
		const errorMessage = error.message
		console.log(`Ошибка авторизации: ${(errorCode, errorMessage)}`)
	}
}

export const register = async (email, password, displayName, navigate) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
			displayName,
		)
		console.log(userCredential.user)
		const user = userCredential.user
		console.log(user)
		localStorage.setItem('user', JSON.stringify(user))
	} catch (error) {
		const errorCode = error.code
		const errorMessage = error.message
		console.log(`Ошибка регистрации: ${(errorCode, errorMessage)}`)
	}
}
