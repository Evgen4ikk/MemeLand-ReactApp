import { BsTrash } from 'react-icons/bs'
import { memeAPI } from '../../store/api/memeAPI'
import { IMemesHistory } from '../../types/IMemes'
import HistoryItem from './HistoryItem'

const History = () => {
	const { data: history, isLoading } = memeAPI.useFetchAllHistoryQuery('')

	return (
		<div className='max-w-[1080px] mx-auto text-white'>
			<div className='flex items-center justify-between border-b border-[#3f3f3f] pb-4 mb-4'>
				<p className='font-medium text-base'>История просмотра</p>
			</div>
			<div>
				{isLoading ? (
					<div>Загрузка...</div>
				) : history && history.length ? (
					history.map((historyMeme: IMemesHistory) => (
						<div key={historyMeme.id} className=''>
							<HistoryItem historyMeme={historyMeme} />
						</div>
					))
				) : (
					<div>Ничего не найдено :(</div>
				)}
			</div>
		</div>
	)
}

export default History
