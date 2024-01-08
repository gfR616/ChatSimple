import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import createStore from "./components/store/store"
import rootReducer from "./components/store/rootReducer"

let persistedState = {}
const store = createStore(rootReducer, persistedState)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
)
