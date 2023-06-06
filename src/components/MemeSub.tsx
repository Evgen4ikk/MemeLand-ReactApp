import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { memeAPI } from '../store/api/memeAPI'
import { userAPI } from '../store/api/userAPI'

interface MemeSubProps {
	memeId: number
	userId: any
}

const MemeSub: React.FC<MemeSubProps> = ({ memeId, userId }) => {
	// Получаем данные мема
	const { data } = memeAPI.useFetchMemeIdQuery(memeId)

	// Получаем данные пользователя
	const { data: user } = userAPI.useFetchUserIdMemeQuery(userId)

	// Получаем данные моего профиля
	const { data: myProfile } = userAPI.useFetchProfileDataQuery('')

	// Получаем список подписок
	const { data: subscriptions, refetch } = userAPI.useFetchSubscriptionsQuery('')

	// Функция подписки на пользователя
	const [subOnUser] = userAPI.useSubUserMutation()

	// Функция отписки от пользователя
	const [unSubUser] = userAPI.useUnSubUserMutation()
	// Обработчик подпискиx
	const handleSub = async () => {
		await subOnUser({
			id: user?.[0]?.id,
			username: user?.[0]?.username,
			avatar: user?.[0]?.avatar,
			subscribers: user?.[0]?.subscribers,
		})

		setIsSub(true)
	}

	// Обработчик отписки
	const handleUnSub = async () => {
		await unSubUser(user?.[0]?.id)
		setIsSub(false)
	}

	const subCheck = () => {
		return subscriptions && subscriptions.some(sub => sub.id === user?.[0]?.id)
	}

	const [isSub, setIsSub] = useState(subCheck())

	useEffect(() => {
		setIsSub(subCheck())
		refetch()
	}, [subscriptions, user?.[0]?.id])

	return (
		<div className='flex'>
			<div className='px-2 py-1'>
				<Link to={`/user/${data?.userId}`}>
					<Avatar src={user && user[0]?.avatar} />
				</Link>
			</div>
			<div className='ml-2 mr-7'>
				<div className='text-[#AAAAAA] text-[14px]'>
					<Link
						to={`/user/${data?.userId}`}
						className='text-[#f1f1f1] text-base font-bold'
					>
						{data?.author}
					</Link>
					<div>{user?.[0]?.subscribers} подписчиков</div>
				</div>
			</div>
			<div className='flex items-center'>
				{!isSub ? (
					<button
						onClick={handleSub}
						className='h-[36px] px-4 text-sm bg-white text-[#0f0f0f] rounded-[18px] font-semibold cursor-pointer hover:bg-[#d9d9d9]'
					>
						Подписаться
					</button>
				) : (
					<button
						onClick={handleUnSub}
						className='h-[36px] px-4 text-sm bg-[#333] text-[#f1f1f1] rounded-[18px] font-semibold cursor-pointer hover:bg-[#454649]'
					>
						Вы подписаны
					</button>
				)}
			</div>
		</div>
	)
}

export default MemeSub
