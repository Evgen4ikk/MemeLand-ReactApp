import { useEffect, useState } from 'react'
import { AiOutlineHistory, AiOutlineLike } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Menu from '../../components/Menu'
import CustomProgressBar from '../../components/UI/CustomProgressBar/CustomProgressBar'
import { memeAPI } from '../../store/api/memeAPI'
import { IMemes } from '../../types/IMemes'
import LibraryItem from './LibraryItem'
import classes from './library.module.css'

const Library = () => {
	const [loading, setLoading] = useState(true)

	const {
		data: likedData,
		isLoading: isLoadingLiked,
		refetch: refetchLiked,
	} = memeAPI.useFetchLikedQuery('')

	const {
		data: historyData,
		isLoading: isLoadingHistory,
		refetch: refetchHistory,
	} = memeAPI.useFetchAllHistoryQuery('')

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false)
		}, 1000)

		return () => {
			clearTimeout(timeout)
		}
	}, [])

	useEffect(() => {
		refetchLiked()
		refetchHistory()
	}, [likedData, historyData])

	return (
		<div className='pl-6 max-w-[1280px] mx-auto'>
			<Menu />
			{loading ? (
				<CustomProgressBar />
			) : (
				<>
					<div>
						<div className='w-full text-[#f1f1f1]'>
							<div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center'>
										<AiOutlineHistory size={24} className='mr-4 ' />
										<span className='text-base font-medium'>История</span>
									</div>
									<Link to='/history'>
										<button className='px-3 pb-1.5 pt-1 hover:bg-[#263850] text-[#3ea6ff] font-medium rounded-2xl cursor-pointer'>
											Ещё
										</button>
									</Link>
								</div>
								<div className='mt-5 pb-6'>
									<div
										className={`${classes.container} mx-auto border-b border-[#3f3f3f] max-h-[485px] overflow-hidden`}
									>
										{isLoadingHistory ? (
											<div>Загрузка...</div>
										) : historyData && historyData.length ? (
											historyData.map((history: IMemes) => (
												<div
													key={history.id}
													className={`${classes.grid_item}`}
												>
													<LibraryItem meme={history} />
												</div>
											))
										) : (
											<div className='text-[#f1f1f1] font-bold pb-4 text-lg'>
												Ничего не найдено :(
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className='text-[#f1f1f1]'>
							<div className='flex items-center justify-between pb-4'>
								<div className='flex items-center'>
									<AiOutlineLike size={24} className='mr-4 ' />
									<span className='text-base font-medium'>Понравившиеся</span>
								</div>
								<Link to='/liked'>
									<button className='px-3 pb-1.5 pt-1 hover:bg-[#263850] text-[#3ea6ff] font-medium rounded-2xl cursor-pointer'>
										Ещё
									</button>
								</Link>
							</div>
							<div
								className={`${classes.container} mx-auto max-h-[485px] overflow-hidden`}
							>
								{isLoadingLiked ? (
									<div>Загрузка...</div>
								) : likedData && likedData.length ? (
									likedData.map((liked: IMemes) => (
										<div key={liked.id} className={`${classes.grid_item}`}>
											<LibraryItem meme={liked} />
										</div>
									))
								) : (
									<div className='text-[#f1f1f1] font-bold pb-4 text-lg'>
										Ничего не найдено :(
									</div>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Library
