import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../store/api/api'

interface MemeSubProps {
  memeId: number;
	userId: number
}

const MemeSub: React.FC<MemeSubProps> = ({ memeId, userId }) => {

	const { data } = api.useFetchMemeIdQuery(memeId);

  const { data: user } = api.useFetchUserIdMemeQuery(userId);

	const { data: myProfile } = api.useFetchProfileDataQuery('')

	const [isSub, setIsSub] = useState<boolean>(false);

	const { data: subscriptions } = api.useFetchSubscriptionsQuery('');
  const [subOnUser] = api.useSubUserMutation();
	const [unSubUser] = api.useUnSubMutation();

  const handleSub = async () => {
    await subOnUser({
			id: user?.[0]?.id,
			username: user?.[0]?.username,
			avatar: user?.[0]?.avatar,
			subscribers: user?.[0]?.subscribers
		});
    setIsSub(true);
  };

  const handleUnSub = async () => {
    await unSubUser(user?.[0]?.id);
    setIsSub(false);
  };

	useEffect(() => {
    subCheck()
  }, [subscriptions]);
	
	const subCheck = () => {
		const isUserSubscribed = subscriptions?.some((subscription) => {
			const userUsername = user?.[0]?.username;
			return userUsername && subscription.username === userUsername;
		}) || false;
		setIsSub(isUserSubscribed);
	};
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
						{!isSub
							? <span>0 подписчиков</span>
							: <span>1 подписчик</span>
						}
					</div>
				</div>
			</div>
			<div 
				onLoad={subCheck}
				className='flex items-center'
			>
				{!isSub
					? <button onClick={handleSub} className='h-[36px] px-4 text-sm bg-white text-[#0f0f0f] rounded-[18px] font-semibold cursor-pointer hover:bg-[#d9d9d9]'>
						Подписаться
					</button>
					: <button onClick={handleUnSub} className='h-[36px] px-4 text-sm bg-[#333] text-[#f1f1f1] rounded-[18px] font-semibold cursor-pointer hover:bg-[#454649]'>
						Вы подписаны
					</button>
				}
			</div>
		</div>
	)
}

export default MemeSub;