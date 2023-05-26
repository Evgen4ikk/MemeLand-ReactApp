import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../store/api/api'
import { IUsers } from '../types/IUsers'

interface MemeSubProps {
  memeId: number;
	userId: any
}

const MemeSub: React.FC<MemeSubProps> = ({ memeId, userId }) => {
  // Получаем данные мема
	const { data } = api.useFetchMemeIdQuery(memeId);

  // Получаем данные пользователя
	const { data: user } = api.useFetchUserIdMemeQuery(userId);

	// Получаем данные моего профиля
	const { data: myProfile } = api.useFetchProfileDataQuery('')

	// Состояние подписки
	const [isSub, setIsSub] = useState<boolean>(false);

	// Получаем список подписок
	const { data: subscriptions, refetch } = api.useFetchSubscriptionsQuery('');
  
	// Функция подписки на пользователя
	const [subOnUser] = api.useSubUserMutation();
  
	// Функция отписки от пользователя
	const [unSubUser] = api.useUnSubUserMutation();
  
	// Функция обновления данных пользователя
	const [userUpdate] = api.useUpdateUserMutation()

	// Обновление данных пользователя
	const handleUpdateUser = (user: IUsers) => {
    userUpdate(user);
  };

  // Обработчик подписки
  const handleSub = async () => {
		// Увеличиваем количество подписчиков на 1
		const updatedUser: IUsers = {
			...user?.[0],
			subscribers: (user?.[0]?.subscribers || 0) + 1
		};

		await handleUpdateUser(updatedUser);

		// Выполняем подписку на пользователя
    await subOnUser({
			id: user?.[0]?.id,
			username: user?.[0]?.username,
			avatar: user?.[0]?.avatar,
			subscribers: updatedUser.subscribers
		});
    
    // Устанавливаем состояние подписки на true
    setIsSub(true);
  };

  // Обработчик отписки
  const handleUnSub = async () => {
		// Уменьшаем количество подписчиков на 1
		const updatedUser: IUsers = {
			...user?.[0],
			subscribers: (user?.[0]?.subscribers || 0) - 1
		};

		await handleUpdateUser(updatedUser);

		// Выполняем отписку от пользователя
		await unSubUser(user?.[0]?.id);

    // Устанавливаем состояние подписки на false
    setIsSub(false);
  };

	// Проверяем, подписан ли текущий пользователь на пользователя
	useEffect(() => {
    if (subscriptions && subscriptions.some((sub) => sub.id === userId)) {
      setIsSub(true);
    } else {
      setIsSub(false);
    }
  }, [subscriptions, userId]);

	return (
		<div className='flex'>
			<div className='px-2 py-1'>
				<Link 
					to={`/user/${data?.userId}`}
				>
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
					<div>
						{user?.[0]?.subscribers} подписчиков
					</div>
				</div>
			</div>
			<div 
				className='flex items-center'
			>
				{!isSub ? (
					<button onClick={handleSub} className='h-[36px] px-4 text-sm bg-white text-[#0f0f0f] rounded-[18px] font-semibold cursor-pointer hover:bg-[#d9d9d9]'>
						Подписаться
					</button>
				) : (
					<button onClick={handleUnSub} className='h-[36px] px-4 text-sm bg-[#333] text-[#f1f1f1] rounded-[18px] font-semibold cursor-pointer hover:bg-[#454649]'>
						Вы подписаны
					</button>
				)}
			</div>
		</div>
	)
}

export default MemeSub;
