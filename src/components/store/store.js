import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./task"

function createStore() {
  return configureStore({
    reducer: {
      user: userReducer
    }
  })
}

export default createStore
