import { IconButton } from '@mui/material'
import { FC } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { Link } from 'react-router-dom'


const ModalWindow: FC = () => {
	return (
		<div className='fixed top-0 left-0 bottom-0 bg-[#0f0f0f] w-[240px] z-20'>
			<div className='flex items-center'>
				<div className='ml-4 rounded-full mr-4 text-[#f1f1f1] hover:bg-[#272727]'>
					<IconButton>
						<AiOutlineMenu style={{ color: '#f1f1f1' }} size={24} />
					</IconButton>
				</div>
				<Link to='/'>
					<img className='w-[60px]' src='/logo.png' />
				</Link>
			</div>
		</div>
	)
}

export default ModalWindow
