import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<div className='shadow-md bg-gray-200 flex justify-between w-full px-6 items-center '>
			<Link to='/'>
				<img className='w-[80px]' src='/logo.png' />
			</Link>
			<input
				className='bg-gray-100 px-4 py-2 rounded-2xl w-2/4 search outline-none'
				type='text'
				placeholder='Поиск...'
				// value={search}
				// onChange={e => setSearch(e.target.value)}
			/>
			<div className='flex items-center'>
				<Link className='mr-4' to='/meme-create'>
					+
				</Link>
				<Link className='' to='/profile'>
					avatar
				</Link>
			</div>
		</div>
	)
}

export default Navbar