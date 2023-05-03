import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { AuthContext } from './context/context'
import './index.css'
import CreateMeme from './pages/CreateMeme/CreateMeme'
import Error from './pages/Error/Error'
import Home from './pages/Home/Home'
import Meme from './pages/Meme/Meme'
import MyProfile from './pages/MyProfile/MyProfile'
import Subscriptions from './pages/Subscriptions/Subscriptions'
import UserProfile from './pages/UserProfile/UserProfile'
import Liked from './pages/Liked/Liked'

function App() {
	const [search, setSearch] = useState('')
  return (
		<div className='App'>
			<AuthContext.Provider value={{ search, setSearch }}>
        <Navbar />
          <div className='px-10 mb-10'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/meme/:id' element={<Meme />} />
              <Route path='/user/:id' element={<UserProfile />} />
              <Route path='/MyProfile' element={<MyProfile />} />
              <Route path='/create-meme' element={<CreateMeme />} />
              <Route path='/*' element={<Error />} />
              <Route path='/subscriptions' element={<Subscriptions />} />
              <Route path='/liked' element={<Liked />} />
            </Routes>
          </div>
			</AuthContext.Provider>
		</div>
	)
}

export default App;