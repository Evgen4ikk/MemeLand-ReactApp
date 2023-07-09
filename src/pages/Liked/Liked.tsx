import { memeAPI } from '../../store/api/memeAPI'
import { IMemes } from '../../types/IMemes'
import LikedItem from './LikedItem'

const Liked = () => {
	const { data: liked, isLoading } = memeAPI.useFetchLikedQuery('')

	return (
		<div className='max-w-[1080px] mx-auto text-white'>
			<div className='border-b border-[#3f3f3f] pb-4 mb-4'>
				<p className='font-medium text-base'>Понравившиеся мемы</p>
			</div>
			<div>
				{isLoading ? (
					<div>Загрузка...</div>
				) : liked && liked.length ? (
					liked.map((likedMeme: IMemes, index: number) => (
						<div key={likedMeme.id}>
							<LikedItem likedMeme={likedMeme} index={index}/>
						</div>
					))
				) : (
					<div>Ничего не найдено :(</div>
				)}
			</div>
		</div>
	)
}

export default Liked
