import { Avatar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'
import { BiWinkSmile } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { api } from '../store/api/api'
import { IComments } from '../types/IComments'

interface MemeCommProps {
  memeId: number;
}

const MemeComm: React.FC<MemeCommProps> = ({ memeId }) => {

	const dark:any = 'dark'

	const { data: comments } = api.useFetchCommentsMemeIdQuery(memeId);

  const { data: myProfile } = api.useFetchProfileDataQuery('');

  const [createComments] = api.useCreateCommentMutation();

  const [comment, setComment] = useState<string>('');

	const [commentDate, setCommentDate] = useState<string>('');

	const [isClicked, setIsClicked] = useState<boolean>(false)

	const [isEmojiClicked, setIsEmojiClicked] = useState<boolean>(false)

	const [selectedEmoji, setSelectedEmoji] = useState(null);

	const [disableSend, setDisableSend] = useState<boolean>(true);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value);
		setDisableSend(!e.target.value.trim());
	};

	const handleEmojiClick = (emojiObject: any) => {
    setSelectedEmoji(emojiObject);
    setComment((prevComment) => prevComment + emojiObject.emoji);
    setDisableSend(comment.trim().length === 0);
	};

	const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
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
			setCommentDate(formattedDate);
			setComment('');
			setDisableSend(true);
			setIsEmojiClicked(false)
		}
	};

	return (
		<div className='pt-4 max-w-[800px]'>
			<h1 className=' text-xl font-medium text-[#f1f1f1] pb-2'>{comments?.length} комментариев</h1>
			<form onSubmit={handleCreate}>
				<div className="flex">
					<div className="mr-5">
						<Link to={`/MyProfile}`}>
							<Avatar sx={{ height: "50px", width: "50px" }} src={myProfile?.avatar} />
						</Link>
					</div>
					<div className="w-full">
						<input
							className={`outline-none bg-inherit border-b ${
								isClicked ? "border-white" : "border-[#717171]"
							} text-[#f1f1f1] placeholder-[#aaa] py-[2px] px-1 w-full`}
							placeholder="Введите комментарий"
							value={comment}
							onChange={handleChange}
							onClick={() => setIsClicked(true)}
						/>
					</div>
				</div>
				{isClicked ? (
					<div className="flex justify-between items-center">
						<div className="rounded-full ml-16 text-[#f1f1f1] hover:bg-[#272727]">
							<IconButton onClick={() => setIsEmojiClicked(!isEmojiClicked)}>
								<BiWinkSmile style={{ color: "#f1f1f1" }} size={24} />
							</IconButton>
						</div>
						<div>
							<div className="relative">
								<div className="absolute left-[-400px] top-[45px]">
									{isEmojiClicked && <EmojiPicker width={600} height={400} theme={dark} onEmojiClick={handleEmojiClick}/>}
								</div>
							</div>
							<div>
								<button 
									className="text-white px-4 py-2 rounded-full hover:bg-[#272727]"
									onClick={() => setIsClicked(false)}
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
				) : (
					<></>
				)}
			</form>
			<div className="">
				{comments?.map((comment: IComments) => (
					<div key={comment.id} className="py-4 flex">
						<img
							className="h-10 w-10 rounded-full"
							src={myProfile?.avatar}
							alt="Profile Avatar"
						/>
						<div className="ml-4">
							<div className="flex items-center">
								<h4 className="text-sm font-medium text-[#f1f1f1]">
									{comment?.username}
								</h4>
								<p className="ml-2 text-sm text-[#aaaaaa]">
									{comment?.time}
								</p>
							</div>
							<p className="text-sm text-[#f1f1f1] mt-1">
								{comment?.title}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default MemeComm