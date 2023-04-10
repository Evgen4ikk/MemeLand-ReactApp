import { useState } from 'react'
import Navbar from './components/Navbar'
import { AuthContext } from './context/context'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'


function App() {
	const [search, setSearch] = useState('')
  return (
		<div className='App'>
			<AuthContext.Provider value={{ search, setSearch }}>
				<Navbar />
				<div className='px-10 mainContainer mb-10'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/*' element={<Error />} />
					</Routes>
				</div>
			</AuthContext.Provider>
		</div>
	)
}

export default App;