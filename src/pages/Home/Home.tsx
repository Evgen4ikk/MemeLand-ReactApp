import { useEffect, useState } from 'react'
import MemeItem from '../../components/MemeItem'
import Menu from '../../components/Menu'
import CustomProgressBar from '../../components/UI/CustomProgressBar/CustomProgressBar'
import { memeAPI } from '../../store/api/memeAPI'
import { IMemes, IMemesHistory } from '../../types/IMemes'
import classes from './home.module.css'

const Home = () => {
	const { isLoading, data: memes } = memeAPI.useFetchAllMemesQuery('')

	const [loading, setLoading] = useState(true)

	const [addToHistory] = memeAPI.useAddToHistoryMutation()

	const handleHistory = async (meme: IMemes) => {
		if(meme.myMeme === true){
			await addToHistory({
				memeId: meme.id,
				author: meme.author,
				image: meme.image,
				likes: meme.likes,
				myMeme: true,
				name: meme.name,
				userId: meme.userId,
				video: meme.video,
				views: meme.views,
			}as IMemesHistory)
		} else {
			await addToHistory({
				memeId: meme.id,
				author: meme.author,
				image: meme.image,
				likes: meme.likes,
				myMeme: false,
				name: meme.name,
				userId: meme.userId,
				video: meme.video,
				views: meme.views,
			}as IMemesHistory)
		}
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false)
		}, 1000)

		return () => {
			clearTimeout(timeout)
		}
	}, [])

	return (
		<div className='mx-auto flex'>
			<Menu />
			{loading ? (
				<CustomProgressBar />
			) : (
				<>
					<div className={`${classes.container} mx-auto pl-6`}>
						{isLoading ? (
							<div>Загрузка...</div>
						) : memes ? (
							memes.map((meme: IMemes) => (
								<div key={meme.id} className={classes.grid_item}>
									<div onClick={() => handleHistory(meme)}>
										<MemeItem meme={meme} />
									</div>
								</div>
							))
						) : (
							<div>Ничего не найдено :(</div>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default Home
