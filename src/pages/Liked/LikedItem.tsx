import { IconButton } from '@mui/material'
import { FC } from 'react'
import { MdClose } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { memeAPI } from '../../store/api/memeAPI'
import { userAPI } from '../../store/api/userAPI'
import { IMemes } from '../../types/IMemes'
import { formatCount } from '../../utils/formatViewsCount'

interface LikedItemProps {
	likedMeme: IMemes
	index: number
}

const LikedItem: FC<LikedItemProps> = ({ likedMeme, index }) => {
	const { data: user } = userAPI.useFetchUserIdMemeQuery(likedMeme.userId)

	const [unLikedMeme] = memeAPI.useUnLikedMemeMutation()
	const [updateMeme] = memeAPI.useUpdateMemeMutation()

	const handleUpdateMeme = (meme: IMemes) => {
		updateMeme(meme)
	}

	const handleUnLiked = async () => {
		await unLikedMeme(likedMeme?.id)
		const updatedMeme = { ...likedMeme, likes: likedMeme?.likes - 1 } as IMemes
		await handleUpdateMeme(updatedMeme)
	}

	return (
		<div className='py-2 flex justify-between hover:bg-[#272727] rounded-xl'>
			<div className='flex'>
				<div className='my-auto pl-2 pr-4 text-[#aaa] text-sm'>{index + 1}</div>
				<Link to={`/meme/${likedMeme.id}`}>
					<img
						src={`${likedMeme.image}`}
						className='w-[200px] h-[118px] rounded-xl'
					/>
				</Link>
				<div className='pl-4'>
					<Link to={`/meme/${likedMeme.id}`}>
						<div className='cursor-pointer text-lg text-[#f1f1f1] max-w-[600px] max-h-[60px]'>
							{likedMeme.name}
						</div>
					</Link>
					<div className='text-[#aaa] text-sm flex items-center max-w-[350px] overflow-hidden'>
						<Link
							to={`/user/${likedMeme.userId}`}
							className='hover:text-[#f1f1f1] transition-colors'
						>
							<span>{user?.[0]?.username}</span>
						</Link>
						<span className='px-1'>•</span>
						<span className=''>{formatCount(likedMeme.views)} просмотров</span>
					</div>
				</div>
			</div>
			<div className='my-auto'>
				<div className='rounded-full'>
					<IconButton onClick={handleUnLiked}>
						<MdClose className='text-[#f1f1f1] ' />
					</IconButton>
				</div>
			</div>
		</div>
	)
}

export default LikedItem
