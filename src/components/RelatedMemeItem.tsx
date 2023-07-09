import { FC, useEffect } from 'react'
import { userAPI } from '../store/api/userAPI'
import { IMemes } from '../types/IMemes'
import { formatCount } from '../utils/formatViewsCount'

interface RelatedMemeItemProps {
	meme: IMemes
}

const RelatedMemeItem: FC<RelatedMemeItemProps> = ({ meme }) => {
	const { data: user } = userAPI.useFetchUserIdMemeQuery(meme.userId)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [meme.id])

	return (
		<a href={`/meme/${meme.id}`}>
			<div className='w-[426px] flex'>
				<img src={meme.image} className='w-[168px] h-[94px]' />
				<div className='box-border flex flex-col pr-3 ml-3'>
					<span className='max-h-[40px] overflow-hidden text-sm max-w-[230px]'>
						{meme.name}
					</span>
					<span className='text-xs text-[#AAA] py-1'>
						{user?.[0]?.username}
					</span>
					<span className='text-xs text-[#AAA]'>
						{formatCount(meme.views)} просмотров
					</span>
				</div>
			</div>
		</a>
	)
}

export default RelatedMemeItem
