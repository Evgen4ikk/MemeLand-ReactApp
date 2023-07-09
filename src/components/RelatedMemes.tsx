import { FC, useEffect } from 'react'
import { memeAPI } from '../store/api/memeAPI'
import { IMemes, IMemesHistory } from '../types/IMemes'
import RelatedMemeItem from './RelatedMemeItem'

interface RelatedMemesProps {
	memeId: number
}

const RelatedMemes: FC<RelatedMemesProps> = ({ memeId }) => {
	const { isLoading, data, refetch } = memeAPI.useFetchAllMemesQuery('')

	const filteredMemes = data && data.filter(meme => meme.id !== memeId)

	const [addToHistory] = memeAPI.useAddToHistoryMutation()

	const [updateMeme] = memeAPI.useUpdateMemeMutation()

	const handleUpdateMeme = (meme: IMemes) => {
		updateMeme(meme)
	}
	const handleUpdateViews = async (meme: IMemes) => {
		const updatedMeme = { ...meme, views: meme.views + 1 } as IMemes
		await handleUpdateMeme(updatedMeme)
	}

	const handleHistory = async (meme: IMemes) => {
		if (meme.myMeme === true) {
			await addToHistory({
				memeId: meme.id,
				image: meme.image,
				likes: meme.likes,
				myMeme: true,
				name: meme.name,
				userId: meme.userId,
				video: meme.video,
				views: meme.views,
			} as IMemesHistory)
		} else {
			await addToHistory({
				memeId: meme.id,
				image: meme.image,
				likes: meme.likes,
				myMeme: false,
				name: meme.name,
				userId: meme.userId,
				video: meme.video,
				views: meme.views,
			} as IMemesHistory)
		}
		handleUpdateViews(meme)
	}

	useEffect(() => {
		refetch()
	}, [data])

	return (
		<div>
			{isLoading ? (
				<div>Загрузка...</div>
			) : filteredMemes && filteredMemes.length > 0 ? (
				filteredMemes.map((meme: IMemes) => (
					<div
						key={meme.id}
						className='pb-3'
						onClick={() => handleHistory(meme)}
					>
						<RelatedMemeItem meme={meme}/>
					</div>
				))
			) : (
				<div>Ничего не найдено :(</div>
			)}
		</div>
	)
}

export default RelatedMemes
