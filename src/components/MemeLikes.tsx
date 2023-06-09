import React, { useEffect, useState } from 'react'
import {
	AiFillDislike,
	AiFillLike,
	AiOutlineDislike,
	AiOutlineLike,
} from 'react-icons/ai'
import { useActions } from '../hooks/useActions'
import { memeAPI } from '../store/api/memeAPI'
import { IMemes } from '../types/IMemes'
import { INotification } from '../types/INotification'
import { formatCount } from '../utils/formatViewsCount'

interface MemeLikesProps {
	memeId: number
}

interface Liked {
	id: number
}

const MemeLikes: React.FC<MemeLikesProps> = ({ memeId }) => {
	const { data } = memeAPI.useFetchMemeIdQuery(memeId)
	const [isLiked, setIsLiked] = useState<boolean>(false)
	const [disliked, setDisliked] = useState(false)
	const { data: liked } = memeAPI.useFetchLikedQuery('')
	const [likedMeme] = memeAPI.useLikedMemeMutation()
	const [unLikedMeme] = memeAPI.useUnLikedMemeMutation()
	const [updateMeme] = memeAPI.useUpdateMemeMutation()

	const { addNotification } = useActions()

	const LikeNotification = {
		id: Date.now(),
		meme: data,
		description: `Вы поставили лайк на видео "${data?.name}"`,
	} as INotification

	const DislikeNotification = {
		id: Date.now(),
		meme: data,
		description: `Вы поставили дизлайк на видео "${data?.name}"`,
	} as INotification

	const handleUpdateMeme = (meme: IMemes) => {
		updateMeme(meme)
	}

	const addToDis = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setDisliked(true)
		if (isLiked) {
			const updatedMeme = { ...data, likes: data?.likes - 1 } as IMemes
			await handleUpdateMeme(updatedMeme)
		}
		setIsLiked(false)
		addNotification(DislikeNotification)
		await unLikedMeme(data?.id)
	}

	const removeToDis = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setDisliked(false)
	}

	const handleLiked = async () => {
		if (data?.myMeme === true) {
			const updatedMeme = { ...data, likes: data?.likes + 1 } as IMemes
			await handleUpdateMeme(updatedMeme)
			await likedMeme({
				id: data?.id,
				userId: data?.userId,
				name: data?.name,
				image: data?.image,
				video: data?.video,
				views: data?.views,
				likes: data?.likes + 1,
				myMeme: true,
			} as IMemes)
			addNotification(LikeNotification)
			setIsLiked(true)
			setDisliked(false)
		} else {
			const updatedMeme = { ...data, likes: data?.likes + 1 } as IMemes
			await handleUpdateMeme(updatedMeme)
			await likedMeme({
				id: data?.id,
				userId: data?.userId,
				name: data?.name,
				image: data?.image,
				video: data?.video,
				views: data?.views,
				likes: data?.likes + 1,
				myMeme: false,
			} as IMemes)
			addNotification(LikeNotification)
			setIsLiked(true)
			setDisliked(false)
		}
	}

	const handleUnLiked = async () => {
		await unLikedMeme(data?.id)
		const updatedMeme = { ...data, likes: data?.likes - 1 } as IMemes
		await handleUpdateMeme(updatedMeme)
		setIsLiked(false)
	}

	useEffect(() => {
		likedCheck()
	}, [liked])

	const likedCheck = () => {
		const isVideoLiked =
			liked?.some((liked: Liked) => liked?.id === data?.id) || false
		setIsLiked(isVideoLiked)
	}

	return (
		<div className='flex items-center ml-[15%]'>
			<div
				onLoad={likedCheck}
				className='bg-[#272727] rounded-s-[40px] px-1 py-1'
			>
				{!isLiked ? (
					<button
						onClick={handleLiked}
						className='flex items-center px-2 py-[6px] border-e border-[#525252] whitespace-nowrap'
					>
						<AiOutlineLike />
						<span className='pl-2 pr-1 font-medium text-sm'>
							{formatCount(data?.likes)}
						</span>
					</button>
				) : (
					<button
						onClick={handleUnLiked}
						className='flex items-center px-2 py-[6px] rounded-s-[40px] border-e border-[#525252] whitespace-nowrap'
					>
						<AiFillLike />
						<span className='pl-2 pr-1 font-medium text-sm'>
							{formatCount(data?.likes)}
						</span>
					</button>
				)}
			</div>
			<div className='bg-[#272727] rounded-e-[40px] pl-1 pr-2 py-1'>
				{!disliked ? (
					<button onClick={addToDis} className='px-2 py-2 rounded-e-[40px]'>
						<AiOutlineDislike />
					</button>
				) : (
					<button onClick={removeToDis} className='px-2 py-2 rounded-e-[40px]'>
						<AiFillDislike />
					</button>
				)}
			</div>
		</div>
	)
}

export default MemeLikes
