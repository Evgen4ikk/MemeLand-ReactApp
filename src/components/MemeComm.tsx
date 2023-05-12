import { Avatar, IconButton } from '@mui/material'
import EmojiPicker from 'emoji-picker-react'
import React, { useRef, useState } from 'react'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { BiWinkSmile } from 'react-icons/bi'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { GoKebabVertical } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { useClickAway } from 'react-use'
import { api } from '../store/api/api'
import { IComments } from '../types/IComments'
import MemeAnswer from './MemeAnswer'

interface MemeCommProps {
  memeId: number;
}

const MemeComm: React.FC<MemeCommProps> = ({ memeId }) => {

	const dark:any = 'dark'

	const { data: comments } = api.useFetchCommentsMemeIdQuery(memeId);

  const { data: myProfile } = api.useFetchProfileDataQuery('');

  const [createComments] = api.useCreateCommentMutation();

	const [deleteComment] = api.useDeleteCommentMutation(); 

  const [comment, setComment] = useState<string>('');

	const [isCommClicked, setIsCommClicked] = useState<boolean>(false)

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const menuRef = useRef(null);
	
	useClickAway(menuRef, () => {
		setIsMenuOpen(false);
	});

	const [selectedCommentId, setSelectedCommentId] = useState<number>();

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

	const handleDeleteComm = async (commentId: number) => {
    await deleteComment({ id: commentId } as IComments);
}

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
				{isCommClicked ? (
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
				) : (
					<></>
				)}
			</form>
			<div className='flex flex-col-reverse'>
				{comments?.map((comment: IComments) => (
					<div
						key={comment.id}
						className="my-6 flex relative"
					>
						<Avatar sx={{ height: "40px", width: "40px" }} src={myProfile?.avatar} />
						<div className="absolute top-0 right-0">
								<IconButton 
									onClick={() => {
										setSelectedCommentId(comment?.id);
										setIsMenuOpen(!isMenuOpen);
									}}
								>
									<GoKebabVertical style={{ color: "#f1f1f1" }} size={16} />
								</IconButton>
						</div>
						{selectedCommentId === comment.id && isMenuOpen ? (
							<div ref={menuRef} className='absolute flex flex-col bg-[#282828] py-2 text-[#f1f1f1] right-[-100px] top-[35px] rounded-lg z-10'
							>
								<button
									className='hover:bg-[#535353] pr-4 py-1 flex items-center'
								>
									<span className='px-3'><BsPencil size={18}/></span>
									Изменить
								</button>
								<button
									className='hover:bg-[#535353] pr-4 py-1 flex items-center'
									onClick={() => handleDeleteComm(comment.id)}
								>
									<span className='px-3'><BsTrash size={18}/></span>
									Удалить
								</button>
							</div>
						) : null}
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
								<div className='w-full'>
									<MemeAnswer 
										comment={comment} 
										memeId={memeId}
									/>
								</div>
								</div>
						</div>
				))}
			</div>
		</div>
	)
}

export default MemeComm