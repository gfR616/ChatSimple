import { addNewUser } from './userService'
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'

const auth = getAuth()
//логиним
export const signIn = async (email, password, navigate) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)
		navigate('/chat', { replace: true })
	} catch (error) {
		const errorCode = error.code
		const errorMessage = error.message
		console.log(`Ошибка авторизации: ${(errorCode, errorMessage)}`)
	}
}
//регистрируем и добавляем в фаерстор
export const register = async (email, password, displayName, navigate) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password)
		const user = userCredential.user
		const uid = user.uid
		await addNewUser(displayName, email, uid)
		navigate('/chat', { replace: true })
		return user
	} catch (error) {
		const errorCode = error.code
		const errorMessage = error.message
		console.log(`Ошибка регистрации: ${(errorCode, errorMessage)}`)
		throw error
	}
}
//выходим из логина
export const userSignOut = async () => {
	await signOut(auth)
		.then(() => {
			console.log('Пользователь вышел из системы')
		})
		.catch((error) => {
			console.error('Ошибка при выходе из системы: ', error)
		})
}
//слушаем статус юзера
export const userStatusListener = (callback) => {
	return onAuthStateChanged(auth, callback)
}
