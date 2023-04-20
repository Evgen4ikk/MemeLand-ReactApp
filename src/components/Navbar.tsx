import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { api } from '../store/api/api'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { Avatar, Badge } from '@mui/material'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import IconButton from '@mui/material/IconButton';

const Navbar = () => {

	const { data: profile } = api.useFetchProfileDataQuery('')

	return (
		<div className='flex justify-between w-full px-6 items-center'>
			<Link to='/'>
				<img className='w-[70px]' src='/logo.png' />
			</Link>
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
							<AiOutlinePlusCircle style={{ color: '#fff' }} size={26}/>
						</IconButton>
					</div>
				</Link>
				<div className='rounded-full mr-5 text-[#f1f1f1] hover:bg-[#272727]'>
					<IconButton>
						<Badge badgeContent={1} color="primary">
								<NotificationsNoneOutlinedIcon style={{ color: '#fff' }} />
						</Badge>
					</IconButton>
				</div>
				<Link to='/profile'>
					<Avatar src={profile?.avatar} />
				</Link>
			</div>
		</div>
	)
}

export default Navbar