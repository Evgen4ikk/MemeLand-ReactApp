import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IMemes } from '../../../types/IMemes'

interface LibraryHistoryProps {
	history: IMemes
}
const LibraryHistoryItem: FC<LibraryHistoryProps> = ({ history }) => {
	return (
		<div className='w-[210px] h-[210px]'>
			<div className='rounded-lg overflow-hidden pb-3'>
				<Link to={`/meme/${history.id}`}>
					<img
						src={history.image}
						alt={history.name}
						className='h-[118px] w-full object-cover rounded-lg'
					/>
				</Link>
				<div className='flex'>
					<div className='pt-2'>
						<Link to={`/meme/${history.id}`}>
							<h3 className='leading-tight font-semibold text-[#f1f1f1] mb-1 overflow-hidden max-h-9 cursor-pointer text-sm'>
								{history.name}
							</h3>
						</Link>
						<div className='text-[#AAAAAA] text-xs'>
							<Link
								to={`/user/${history.userId}`}
								className='hover:text-[#f1f1f1]'
							>
								{history.author}
							</Link>
							<div>{history.views} просмотров</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LibraryHistoryItem
