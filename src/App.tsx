import { useState } from 'react'
import Navbar from './components/Navbar'
import { AuthContext } from './context/context'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import Meme from './pages/Meme'
import UserProfile from './pages/UserProfile'
import './index.css';
import CreateMeme from './pages/CreateMeme'
import MyProfile from './pages/MyProfile'

function App() {
	const [search, setSearch] = useState('')
  return (
		<div className='App'>
			<AuthContext.Provider value={{ search, setSearch }}>
        <Navbar />
          <div className='px-10 mainContainer mb-10'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/meme/:id' element={<Meme />} />
              <Route path='/user/:id' element={<UserProfile />} />
              <Route path='/MyProfile' element={<MyProfile />} />
              <Route path='/create-meme' element={<CreateMeme />} />
              <Route path='/*' element={<Error />} />
            </Routes>
          </div>
			</AuthContext.Provider>
		</div>
	)
}

export default App;