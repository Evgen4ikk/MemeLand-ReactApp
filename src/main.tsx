import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './store/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)