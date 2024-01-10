import App from './App'
import rootReducer from './store/rootReducer'
import createStore from './store/store'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

let persistedState = {}
const store = createStore(rootReducer, persistedState)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<App />
	</Provider>,
)
