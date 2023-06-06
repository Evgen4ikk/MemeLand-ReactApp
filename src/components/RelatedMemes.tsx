import { FC } from 'react'
import { memeAPI } from '../store/api/memeAPI'
import { IMemes } from '../types/IMemes'
import RelatedMemeItem from './RelatedMemeItem'

interface RelatedMemesProps {
	memeId: number
}

const RelatedMemes: FC<RelatedMemesProps> = ({ memeId }) => {
	const { isLoading, data } = memeAPI.useFetchAllMemesQuery('')

	const filteredMemes = data && data.filter(meme => meme.id !== memeId)

	const [addToHistory] = memeAPI.useAddToHistoryMutation()

	const handleHistory = async (meme: IMemes, index: number) => {
		await addToHistory({
			id: index,
			memeId: meme.id,
			author: meme.author,
			image: meme.image,
			likes: meme.likes,
			myMeme: meme.myMeme,
			name: meme.name,
			userId: meme.userId,
			video: meme.video,
			views: meme.views,
		})
	}

	return (
		<div>
			{isLoading ? (
				<div>Загрузка...</div>
			) : filteredMemes && filteredMemes.length > 0 ? (
				filteredMemes.map((meme: IMemes,index: number) => (
					<div
						key={meme.id}
						className='pb-3'
						onClick={() => handleHistory(meme, index)}
					>
						<RelatedMemeItem meme={meme} />
					</div>
				))
			) : (
				<div>Ничего не найдено :(</div>
			)}
		</div>
	)
}

export default RelatedMemes
