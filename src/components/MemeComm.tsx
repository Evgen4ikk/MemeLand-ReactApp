import React, { useState } from 'react'
import { api } from '../store/api/api'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useTypedSelector } from '../hooks/useTypedSelector'
import EmojiPicker from 'emoji-picker-react'
import { BiWinkSmile } from 'react-icons/bi'

interface MemeCommProps {
  memeId: number;
}

const MemeComm: React.FC<MemeCommProps> = ( { memeId } ) => {

	const dark:any = 'dark'

	const { data } = api.useFetchMemeIdQuery(memeId);

	const { data: comments } = api.useFetchCommentsMemeIdQuery(memeId);

	const { userId } = useTypedSelector(state => state.getUserId);

	const { data: user } = api.useFetchUserIdMemeQuery(userId);

  const { data: myProfile } = api.useFetchProfileDataQuery('');

  const [createComments] = api.useCreateCommentMutation();

  const [comment, setComment] = useState<string>('');

	const [isClicked, setIsClicked] = useState<boolean>(false)

	const [isEmojiClicked, setIsEmojiClicked] = useState<boolean>(false)

	const onEmojiClick = () => {

	}

	return (
		<div className='pt-4 max-w-[800px]'>
			<h1 className=' text-xl font-medium text-[#f1f1f1] pb-2'>{comments?.length} коменатриев</h1>
			<div className='flex '>
				<div className='mr-5'>
					<Link 
						to={`/MyProfile}`}
					>
						<Avatar sx={{ height: '50px', width: '50px' }} src={myProfile?.avatar}/>
					</Link>
				</div>
				<div className='w-full'>
					<input 
						className=' outline-none bg-inherit border-b border-[#717171] text-[#f1f1f1] placeholder-[#aaa] py-[2px] px-1 w-full'
						placeholder='Введите комментарий'
						onClick={() => setIsClicked(true)}
					/>
				</div>
			</div>
			<div className='flex'>
				{isClicked
						? <div className='rounded-full ml-16 text-    [#f1f1f1]'>
							<IconButton
								onClick={() => setIsEmojiClicked(!isEmojiClicked)}
							>
								<BiWinkSmile style={{ color: '#f1f1f1' }} size={24}/>
							</IconButton>
						</div>
						: <></>
				}
				<div>
				{isEmojiClicked && (
          <EmojiPicker
            width={600}
            height={400}
            theme={dark}
            onEmojiClick={onEmojiClick}
          />
        )}
				</div>
			</div>
		</div>
	)
}

export default MemeComm