import { FC } from 'react'
import { Link } from 'react-router-dom'
import { userAPI } from '../../store/api/userAPI'
import { IMemes } from '../../types/IMemes'
import { formatCount } from '../../utils/formatViewsCount'

interface LibraryItemProps {
	meme: IMemes
}

const LibraryItem: FC<LibraryItemProps> = ({ meme }) => {
	const { data: user } = userAPI.useFetchUserIdMemeQuery(meme.userId)

	return (
		<div className='rounded-lg overflow-hidden pb-3'>
			<Link to={`/meme/${meme.id}`}>
				<img
					src={meme.image}
					alt={meme.name}
					className='h-[118px] w-full object-cover rounded-lg'
				/>
			</Link>
			<div className='flex'>
				<div className='pt-2'>
					<Link to={`/meme/${meme.id}`}>
						<h3 className='leading-tight font-semibold text-[#f1f1f1] mb-1 overflow-hidden max-h-9 cursor-pointer text-sm'>
							{meme.name}
						</h3>
					</Link>
					<div className='text-[#AAAAAA] text-xs'>
						<Link to={`/user/${meme.userId}`} className='hover:text-[#f1f1f1]'>
							{user?.[0]?.username}
						</Link>
						<div>{formatCount(meme.views)} просмотров</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LibraryItem
