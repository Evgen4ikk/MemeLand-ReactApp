import { FC, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import CustomProgressBar from './components/UI/CustomProgressBar/CustomProgressBar'
import { AuthContext } from './context/context'
import './index.css'
import CreateMeme from './pages/CreateMeme/CreateMeme'
import Error from './pages/Error/Error'
import History from './pages/History/History'
import Home from './pages/Home/Home'
import Library from './pages/Library/Library'
import Liked from './pages/Liked/Liked'
import Meme from './pages/Meme/Meme'
import MyProfile from './pages/MyProfile/MyProfile'
import Subscriptions from './pages/Subscriptions/Subscriptions'
import UserProfile from './pages/UserProfile/UserProfile'

const App: FC = () => {
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(false)
	const location = useLocation()

	useEffect(() => {
		const handleStart = () => setLoading(true)
		const handleComplete = () => setLoading(false)

		const timeout = setTimeout(handleComplete, 1000)

		handleStart()

		return () => {
			clearTimeout(timeout)
		}
	}, [location])

	return (
		<div className='App'>
			<AuthContext.Provider value={{ search, setSearch }}>
				{loading && <CustomProgressBar />}
				<div className='pb-[85px]'>
					<Navbar />
				</div>
				<div className='mb-10'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/meme/:id' element={<Meme />} />
						<Route path='/user/:id' element={<UserProfile />} />
						<Route path='/MyProfile' element={<MyProfile />} />
						<Route path='/create-meme' element={<CreateMeme />} />
						<Route path='/*' element={<Error />} />
						<Route path='/subscriptions' element={<Subscriptions />} />
						<Route path='/library' element={<Library />} />
						<Route path='/liked' element={<Liked />} />
						<Route path='/history' element={<History />} />
					</Routes>
				</div>
			</AuthContext.Provider>
		</div>
	)
}

export default App
