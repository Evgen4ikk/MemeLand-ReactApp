import { FC, useEffect } from 'react'
import { IMemes } from '../types/IMemes'

interface RelatedMemeItemProps {
	meme: IMemes
}

const RelatedMemeItem: FC<RelatedMemeItemProps> = ({ meme }) => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [meme.id])

	return (
		<a href={`/meme/${meme.id}`}>
			<div className='w-[426px] flex'>
				<div>
					<img src={meme.image} className='w-[168px] h-[94px] mr-2' />
				</div>
				<div className='box-border flex flex-col pr-3'>
					<span className='max-h-[40px] overflow-hidden text-sm'>
						{meme.name}
					</span>
					<span className='text-xs text-[#AAA] py-1'>{meme.author}</span>
					<span className='text-xs text-[#AAA]'>{meme.views} просмотров</span>
				</div>
			</div>
		</a>
	)
}

export default RelatedMemeItem
