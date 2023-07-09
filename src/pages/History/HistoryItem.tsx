import { IconButton } from '@mui/material'
import { FC } from 'react'
import { MdClose } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { memeAPI } from '../../store/api/memeAPI'
import { userAPI } from '../../store/api/userAPI'
import { IMemesHistory } from '../../types/IMemes'
import { formatCount } from '../../utils/formatViewsCount'

interface HistoryItemProps {
	historyMeme: IMemesHistory
}

const HistoryItem: FC<HistoryItemProps> = ({ historyMeme }) => {
	const [deleteMeme] = memeAPI.useRemoveHistoryMemeMutation()

	const { data: user } = userAPI.useFetchUserIdMemeQuery(historyMeme.userId)

	const handleDeleteMeme = async (id: number) => {
		await deleteMeme({ id: id } as IMemesHistory)
	}

	return (
		<div className='pb-4 flex justify-between'>
			<div className='flex'>
				<Link to={`/meme/${historyMeme.memeId}`}>
					<img
						src={`${historyMeme.image}`}
						className='w-[200px] h-[118px] rounded-xl'
					/>
				</Link>
				<div className='pl-4'>
					<Link to={`/meme/${historyMeme.memeId}`}>
						<div className='cursor-pointer text-lg text-[#f1f1f1] max-w-[600px] max-h-[60px]'>
							{historyMeme.name}
						</div>
					</Link>
					<div className='text-[#aaa] text-sm flex items-center max-w-[350px] overflow-hidden'>
						<Link
							to={`/user/${historyMeme.userId}`}
							className='hover:text-[#f1f1f1] transition-colors'
						>
							<span>{user?.[0]?.username}</span>
						</Link>
						<span className='px-1'>•</span>
						<span className=''>
							{formatCount(historyMeme.views)} просмотров
						</span>
					</div>
				</div>
			</div>
			<div className='pr-5'>
				<div className='hover:bg-[#3f3f3f] rounded-full'>
					<IconButton onClick={() => handleDeleteMeme(historyMeme.id)}>
						<MdClose className='text-[#f1f1f1] ' />
					</IconButton>
				</div>
			</div>
		</div>
	)
}

export default HistoryItem
