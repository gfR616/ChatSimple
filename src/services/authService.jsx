import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth'

const auth = getAuth()

export const signIn = async (email, password, navigate) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password)
		const user = userCredential.user.displayName
		navigate('/chat')
	} catch (error) {
		const errorCode = error.code
		const errorMessage = error.message
		console.log(`Ошибка авторизации: ${(errorCode, errorMessage)}`)
	}
}

export const register = async (email, password, displayName, navigate) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password)
		const user = userCredential.user
		await updateProfile(user, { displayName: displayName })
		navigate('/chat')
	} catch (error) {
		const errorCode = error.code
		const errorMessage = error.message
		console.log(`Ошибка регистрации: ${(errorCode, errorMessage)}`)
	}
}
