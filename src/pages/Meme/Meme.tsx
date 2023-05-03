import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { api } from '../../store/api/api'
import { IMemes } from '../../types/IMemes'

interface Subscription {
	username: string;
}

interface Liked {
	id: number;
}

const Meme: React.FC = () => {
  const { memeId } = useTypedSelector(state => state.getMemeId);

  const [isSub, setIsSub] = useState<boolean>(false);

  const { userId } = useTypedSelector(state => state.getUserId);

  const { data } = api.useFetchMemeIdQuery(memeId);

  const { data: comments } = api.useFetchCommentsMemeIdQuery(memeId);

  const { data: user } = api.useFetchUserIdMemeQuery(userId);

  const { addLiked, removeLiked } = useActions();

  const { data: myProfile } = api.useFetchProfileDataQuery('');

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisLiked, setIsDisLiked] = useState<boolean>(false);

  const [createComments] = api.useCreateCommentMutation();

  const [comment, setComment] = useState<string>('');

  const { getUserId } = useActions();

  const { data: subscriptions } = api.useFetchSubscriptionsQuery('');
  const [subOnUser] = api.useSubUserMutation();
	const [unSubUser] = api.useUnSubMutation();

	const { data: liked } = api.useFetchLikedQuery('');
	const [ likedMeme ] = api.useLikedMemeMutation();
	const [ unLikedMeme ] = api.useUnLikedMemeMutation();

	const handleLiked = async () => {
		await likedMeme({
			id: data?.id,
			userId: data?.userId,
			author: data?.author,
			name: data?.name,
			image: data?.image,
			video: data?.video,
			views: data?.views,
			myMeme: false,
		}as IMemes);
		setIsLiked(true);
	};

	const handleUnLiked = async () => {
		await unLikedMeme(data?.id)
		setIsLiked(false)
	}

	useEffect(() => {
    likedCheck()
  }, [liked]);

	const likedCheck = () => {
		const isVideoLiked = liked?.some(
			(liked: Liked) => liked?.id === data?.id
		) || false;
		setIsLiked(isVideoLiked);
	};

  const handleSub = async () => {
    await subOnUser({
			id: user?.[0]?.id,
			username: user?.[0]?.username,
			avatar: user?.[0]?.avatar,
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
		const isUserSubscribed = subscriptions?.some(
			(subscription: Subscription) => subscription.username === user?.[0]?.username
		) || false;
		setIsSub(isUserSubscribed);
	};
	
	return (
		<div className='w-[1100px] mx-auto pt-8'>
			<div className='flex text-[#f1f1f1]'>
				<div>
					<div>
						<ReactPlayer
							url={data?.video}
							controls={true}
							width={760}
							height={400}
						/>
					</div>
					<div className='font-semibold text-[24px] py-2'>
						<h1>
							{data?.name}
						</h1>
					</div>
					<div className='flex pt-2'>
						<div className='px-2 py-1'>
							<Link 
								to={`/user/${data?.userId}`}
							>
								<Avatar src={user?.[0].avatar}/>
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
						<div className='flex items-center'>
							<div onLoad={likedCheck}>
								{!isLiked
									? <button onClick={handleLiked}>
										<AiOutlineLike />
									</button>
									:	<button onClick={handleUnLiked}>
											<AiFillLike />
									</button>
								}
							</div>
						</div>
					</div>
				</div>
				<div>
					sd;fls'dfl
				</div>
			</div>
		</div>
	)
}

export default Meme