import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyCQfZ-4mrkpgJHgFLqbOh4c0_KuLT04tho",
  authDomain: "chat-1eaa8.firebaseapp.com",
  databaseURL:
    "https://chat-1eaa8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-1eaa8",
  storageBucket: "chat-1eaa8.appspot.com",
  messagingSenderId: "239869217140",
  appId: "1:239869217140:web:e6b18b63a860cc7a5e4421"
}

const base = initializeApp(firebaseConfig)

export default base