import { Avatar, IconButton } from '@mui/material'
import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'
import { BiWinkSmile } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { api } from '../store/api/api'
import { IComments } from '../types/IComments'
import CommItem from './CommItem'

interface MemeCommProps {
  memeId: number;
}

const MemeComm: React.FC<MemeCommProps> = ({ memeId }) => {

	const dark:any = 'dark'

	const { data: comments } = api.useFetchCommentsMemeIdQuery(memeId);

  const { data: myProfile } = api.useFetchProfileDataQuery('');

  const [createComments] = api.useCreateCommentMutation();

  const [comment, setComment] = useState<string>('');

	const [isCommClicked, setIsCommClicked] = useState<boolean>(false)

	const [isEmojiClicked, setIsEmojiClicked] = useState<boolean>(false)

	const [selectedEmoji, setSelectedEmoji] = useState<null>(null);

	const [disableSend, setDisableSend] = useState<boolean>(true);	
	
	const handleEmojiClick = (emojiObject: any) => {
		setSelectedEmoji(emojiObject);
		setComment((prevComment) => prevComment + emojiObject.emoji);
		setDisableSend(comment.trim().length === 0);
	};

	const handleChangeComm = (e: React.ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value);
		setDisableSend(!e.target.value.trim());
	};

	const handleCreateComm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (comment.trim()) {
			const now = new Date();
			const formattedDate = now.toLocaleString();
			await createComments({
				memeId: memeId,
				username: myProfile?.username,
				title: comment,
				time: formattedDate,
			} as IComments);
			setComment('');
			setIsCommClicked(false)
			setDisableSend(true);
			setIsEmojiClicked(false)
		}
	};

	return (
		<div className='pt-4 w-full'>
			<h1 className=' text-xl font-medium text-[#f1f1f1] pb-2'>
			{comments?.length} 
			{comments?.length === 1 ? ' комментарий' : (
				comments?.length && comments?.length > 1 && comments?.length < 5 ? ' комментария' : ' комментариев'
			)}
			</h1>
			<form onSubmit={handleCreateComm}>
				<div className="flex">
					<div className="mr-5">
						<Link to={`/MyProfile}`}>
							<Avatar sx={{ height: "40px", width: "40px" }} src={myProfile?.avatar} />
						</Link>
					</div>
					<div className="w-full">
						<input
							className={`outline-none bg-inherit border-b ${
								isCommClicked ? "border-white" : "border-[#717171]"
							} text-[#f1f1f1] placeholder-[#aaa] py-[2px] px-1 w-full`}
							placeholder="Введите комментарий"
							value={comment}
							onChange={handleChangeComm}
							onClick={() => setIsCommClicked(true)}
						/>
					</div>
				</div>
				{isCommClicked && (
					<div className="flex justify-between items-center">
						<div className="rounded-full ml-16 text-[#f1f1f1] hover:bg-[#272727]">
							<IconButton onClick={() => setIsEmojiClicked(!isEmojiClicked)}>
								<BiWinkSmile style={{ color: "#f1f1f1" }} size={24} />
							</IconButton>
						</div>
						<div>
							<div className="relative">
								<div className="absolute left-[-400px] top-[45px] z-10">
									{isEmojiClicked && <EmojiPicker width={600} height={400} theme={dark} onEmojiClick={handleEmojiClick}/>}
								</div>
							</div>
							<div>
								<button 
									className="text-white px-4 py-2 rounded-full hover:bg-[#272727]"
									onClick={() => setIsCommClicked(false)}
								>
									Отмена
								</button>
								<button
									type="submit"
									disabled={disableSend}
									className={`${disableSend ? 'text-[#717171] bg-[#272727] px-4 py-2 rounded-full ml-2' : 'bg-[#3ea6ff] text-[#0f0f0f] px-4 py-2 rounded-full ml-2 hover:bg-[#65b8ff]'} `}
									>
									Оставить комментарий
								</button>
							</div>
						</div>
					</div>
				)}
			</form>
			<CommItem 
				memeId={memeId}
				myProfile={myProfile}
				comments={comments}
			/>
		</div>
	)
}

export default MemeComm