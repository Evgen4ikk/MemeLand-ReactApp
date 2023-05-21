import { Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Menu from '../../components/Menu'
import { api } from '../../store/api/api'
import classes from './userProfile.module.css'
import MemeItem from '../../components/MemeItem'

const UserProfile = () => {
	const { id } = useParams<{id: any}>();

	const { data: user , isLoading} = api.useFetchUserIdQuery(id)

	const { data: userMemes } = api.useFetchMemesUserIdQuery(id)


	const { data: subscriptions } = api.useFetchSubscriptionsQuery('');
	const [subOnUser] = api.useSubUserMutation();
	const [unSubUser] = api.useUnSubMutation();

	const [isSub, setIsSub] = useState<boolean>(false)

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
		<div className={`pl-[30px] mx-auto ${classes.container}`}>
			<Menu />
			{isLoading
				? <div>Loading...</div>
				: <div>
						<div className='flex pt-3 pb-4'>
							<div className='w-[196px] flex justify-center mb-2 items-center'>
								<Avatar
									src={user?.[0]?.avatar}
									sx={{ width: '102px', height: '102px', cursor: 'pointer' }}
								/>
							</div>
							<div className='text-[#f1f1f1] text-2xl pt-4 flex flex-1 pr-[10px]'>
								<div>
									<div className='max-w-[380px] overflow-hidden pb-2 cursor-pointer'>
										{user?.[0]?.username}
									</div>
									<div className='text-sm text-[#aaa]'>
										<span className='pr-2'>
											{user?.[0]?.subscribers} подписчиков
										</span>
										<span>
											{userMemes?.length} видео
										</span>
									</div>
								</div>
								<div 
									className='ml-auto pt-2 pr-3' 
									onLoad={subCheck}
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
						</div>
						<div className={`${classes.line} border-b border-[#3f3f3f] pt-4`}/>
						<div className='flex mx-auto'>
							{isLoading ? (
								<div>Загрузка...</div>
							) : userMemes ? (
								userMemes.map((meme) => (
									<div key={meme.id} className={`${classes.meme_container} pt-10 mx-auto`}>
										<MemeItem meme={meme}/>
									</div>
								))
							) : (
								<div>Ничего не найдено :(</div>
							)}
						</div>
					</div>
			}		
		</div>
	)
}

export default UserProfile