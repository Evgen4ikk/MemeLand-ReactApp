import { Avatar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { AiOutlineMenu, AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { api } from '../store/api/api'
import Notifications from './Notifications'

const Navbar = () => {

	const { data: profile } = api.useFetchProfileDataQuery('')

	return (
		<div className='flex justify-between w-full px-4 items-center'>
			<div className='flex items-center'>
				<div className='rounded-full mr-2 text-[#f1f1f1] hover:bg-[#272727]'>
					<IconButton>
						<AiOutlineMenu style={{ color: '#f1f1f1' }} size={24}/>
					</IconButton>
				</div>
				<Link to='/'>
					<img className='w-[60px]' src='/logo.png' />
				</Link>
			</div>
			<form className='flex w-2/4'>
				<input
					className='bg-[#121212] text-gray-300 placeholder-gray-300  border border-[#303030] pl-4 pr-1 rounded-s-[40px] w-full outline-none'
					type='text'
					placeholder='Поиск...'
					// value={search}
					// onChange={e => setSearch(e.target.value)}
				/>
				<button className=' bg-[#222222] py-2 pl-4 pr-5 rounded-e-[40px] border border-[#303030] text-gray-300'>
					<AiOutlineSearch size={24}/>
				</button>
			</form>
			<div className='flex items-center'>
				<Link to='/create-meme'>
					<div className='rounded-full mr-2 text-[#f1f1f1] hover:bg-[#272727]'>
						<IconButton>
							<AiOutlinePlusCircle style={{ color: '#fff' }} size={26} />
						</IconButton>
					</div>
				</Link>
				<Notifications />
				<Link to='/MyProfile'>
					<Avatar src={profile?.avatar} />
				</Link>
			</div>
		</div>
	)
}

export default Navbar