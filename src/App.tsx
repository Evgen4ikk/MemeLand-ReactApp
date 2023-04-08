import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { AuthContext } from './context/context'
import { useState } from 'react'
import Home from './pages/Home'
import Error from './pages/Error'

function App() {
  const [search, setSearch] = useState('')
  return (
		<div className='App'>
			<AuthContext.Provider value={{ search, setSearch }}>
				{/* <Navbar /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<Error />} />
          </Routes>
			</AuthContext.Provider>
		</div>
	)
}

export default App;