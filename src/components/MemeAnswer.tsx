import React, { useRef, useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
import { api } from '../store/api/api'
import { IAnswers } from '../types/IAnswer'
import { Link } from 'react-router-dom'
import { IComments } from '../types/IComments'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import EmojiPicker from 'emoji-picker-react'
import { BiWinkSmile } from 'react-icons/bi'
import { useClickAway } from 'react-use'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { GoKebabVertical, GoTriangleDown, GoTriangleUp } from 'react-icons/go'

interface MemeAnswerProps {
  memeId: number;
	comment: IComments
}

const MemeAnswer: React.FC<MemeAnswerProps> = ( {memeId, comment }) => {

	const dark:any = 'dark'

  const { data: myProfile } = api.useFetchProfileDataQuery('');

	const { data: answers } = api.useFetchAnswersMemeIdQuery(memeId);

	const { data: answersById = []} = api.useFetchCommentAnswersQuery(comment.id);
	
	const [createAnswers] = api.useCreateAnswerMutation()

	const [deleteAnswer] = api.useDeleteAnswerMutation()

	const [ answer, setAnswer ] = useState<string>('')

	const [isAnswerClicked, setIsAnswerClicked] = useState<boolean>(false)

	const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false)

	const [isAnswerInputClicked, setIsAnswerInputClicked] = useState<boolean>(false)

	const [selectedCommentId, setSelectedCommentId] = useState<number>(comment.id);

	const [disableSend, setDisableSend] = useState<boolean>(true);

	const [likedComments, setLikedComments] = useState<any>({});

	const [likedAnswers, setLikedAnswers] = useState<any>({});

	const [isEmojiClicked, setIsEmojiClicked] = useState<boolean>(false)

	const [selectedEmoji, setSelectedEmoji] = useState<null>(null);

	const handleCommLikeClick = (commentId: number) => {
		setLikedComments({
			...likedComments,
			[commentId]: {
				isLiked: !likedComments[commentId]?.isLiked,
				isDisliked: false,
			},
		});
	};

	const handleCommDislikeClick = (commentId: number) => {
		setLikedComments({
			...likedComments,
			[commentId]: {
				isLiked: false,
				isDisliked: !likedComments[commentId]?.isDisliked,
			},
		});
	};

	const handleAnswerLikeClick = (answerId: number) => {
		setLikedAnswers({
			...likedComments,
			[answerId]: {
				isLiked: !likedAnswers[answerId]?.isLiked,
				isDisliked: false,
			},
		});
	};

	const handleAnswerDislikeClick = (answerId: number) => {
		setLikedAnswers({
			...likedComments,
			[answerId]: {
				isLiked: false,
				isDisliked: !likedAnswers[answerId]?.isDisliked,
			},
		});
	};

	const handleEmojiClick = (emojiObject: any) => {
		setSelectedEmoji(emojiObject);
		setAnswer((prevAnswer) => prevAnswer + emojiObject.emoji);
		setDisableSend(answer.trim().length === 0);
	};

	const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAnswer(e.target.value)
		setDisableSend(!e.target.value.trim())
	}

	const handleCreateAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (answer.trim()) {
			const now = new Date();
			const formattedDate = now.toLocaleString();
			await createAnswers({
				memeId: memeId,
				commentId: selectedCommentId,
				username: myProfile?.username,
				title: answer,
				time: formattedDate,
			} as IAnswers);
			setAnswer('');
			setIsAnswerClicked(false)
			setDisableSend(true);
			setIsEmojiClicked(false)
		}
	}

	const handleDeleteAnswer = async (answerId: number) => {
    await deleteAnswer({ id: answerId } as IAnswers);
	}

	const filteredAnswers = answers?.filter((a: any) => a.commentId === comment.id);

	const [selectedAnswerId, setSelectedAnswerId] = useState<number>();

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const menuRef = useRef(null);
	
	useClickAway(menuRef, () => {
		setIsMenuOpen(false);
	});

	return (
		<div className='w-full'>
			<div className='flex items-center pt-2'>
				<div className='hover:bg-[#3f3f3f] rounded-full'>
					<IconButton onClick={() => handleCommLikeClick(comment.id)}>
						{likedComments[comment.id]?.isLiked
							? <AiFillLike size={20} style={{color: '#f1f1f1'}}/>
							: <AiOutlineLike size={20} style={{color: '#f1f1f1'}}/>
						}
					</IconButton>
				</div>
				<span className='mr-2 text-[#aaa] text-sm'>
					{likedComments[comment.id]?.isLiked ? 1 : 0}
				</span>
				<div className='hover:bg-[#3f3f3f] rounded-full'>
					<IconButton onClick={() => handleCommDislikeClick(comment.id)}>
						{likedComments[comment.id]?.isDisliked
							? <AiFillDislike size={20} style={{color: '#f1f1f1'}}/>
							: <AiOutlineDislike size={20} style={{color: '#f1f1f1'}}/>
						}
					</IconButton>
				</div>
				<div>
					<div className='hover:bg-[#3f3f3f] rounded-full ml-2'>
						<IconButton
							onClick={() => {
								setIsAnswerClicked(true);
								setSelectedCommentId(comment.id);
							}}
						>
							<span className='text-[#f1f1f1] text-xs font-medium'>Ответить</span>
						</IconButton>
					</div>
				</div>
			</div>
			<div className='w-[700px]'>
				{isAnswerClicked && (
					<form onSubmit={handleCreateAnswer}
					className='w-full'>
						<div className="flex">
							<div className="mr-5">
								<Link to={`/MyProfile`}>
									<Avatar sx={{ height: "30px", width: "30px" }} src={myProfile?.avatar} />
								</Link>
							</div>
							<div className='w-full'>
								<input
									className={`outline-none bg-inherit border-b w-full ${
										isAnswerClicked ? "border-white" : "border-[#717171]"
									} text-[#f1f1f1] placeholder-[#aaa] py-[2px] px-1`}
									placeholder="Введите ответ"
									value={answer}
									onChange={handleChangeAnswer}
									onClick={() => setIsAnswerInputClicked(true)}
								/>
							</div>
						</div>
						{isAnswerClicked ? (
							<div className="flex justify-between items-center pt-2">
								<div className="rounded-full ml-12 text-[#f1f1f1] hover:bg-[#272727]">
									<IconButton onClick={() => setIsEmojiClicked(!isEmojiClicked)}>
										<BiWinkSmile style={{ color: "#f1f1f1" }} size={24} />
									</IconButton>
								</div>
								<div>
									<div className="relative">
										<div className="absolute left-[-460px] top-[45px] z-10">
											{isEmojiClicked && <EmojiPicker width={600} height={400} theme={dark} onEmojiClick={handleEmojiClick}/>}
										</div>
									</div>
									<div>
										<button 
											className="text-white px-4 py-2 rounded-full hover:bg-[#272727]"
											onClick={() => setIsAnswerClicked(false)}
										>
											Отмена
										</button>
										<button
											type="submit"
											disabled={disableSend}
											className={`${disableSend ? 'text-[#717171] bg-[#272727] px-4 py-2 rounded-full ml-2' : 'bg-[#3ea6ff] text-[#0f0f0f] px-4 py-2 rounded-full ml-2 hover:bg-[#65b8ff]'} `}
											>
											Ответить
										</button>
									</div>
								</div>
							</div>
						) : (
							<></>
						)}
					</form>
				)
				}
			</div>
			<div className='flex flex-col-reverse'>
				<div>
					{answersById.length > 0
						? 
							<button 
								className='flex items-center text-[#3ea6ff] px-3 py-1.5 rounded-full hover:bg-[#263850]'
								onClick={() => setIsAnswerOpen(!isAnswerOpen)}
							>
								{isAnswerOpen
									? <GoTriangleUp size={18} className='pr-2' />
									:	<GoTriangleDown size={18} className='pr-2'/>
								}
								{answersById.length}
								{answersById.length === 1 ? ' ответ' : (
									answersById.length && answersById.length > 1 && answersById.length < 5 ? ' ответа' : ' ответов'
								)}
							</button>
						: <></>
					}
					{isAnswerOpen && (
						<div>
							{filteredAnswers?.map((answer: IAnswers) => (
								<div
									key={answer.id}
								>
									<div className="mt-3 flex relative">
										<Avatar sx={{ height: "40px", width: "40px" }} src={myProfile?.avatar} />
										<div className="absolute top-0 right-0">
												<IconButton 
													onClick={() => {
														setSelectedAnswerId(answer.id);
														setIsMenuOpen(!isMenuOpen);
													}}
												>
													<GoKebabVertical style={{ color: "#f1f1f1" }} size={16} />
												</IconButton>
										</div>
										{selectedAnswerId === answer.id && isMenuOpen ? (
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
													onClick={() => handleDeleteAnswer(answer.id)}
												>
													<span className='px-3'><BsTrash size={18}/></span>
													Удалить
												</button>
											</div>
										) : null}
										<div className="ml-4">
											<div className="flex items-center">
												<h4 className="text-sm font-medium text-[#f1f1f1]">
													{answer.username}
												</h4>
												<p className="ml-2 text-sm text-[#aaaaaa]">
													{answer.time}
												</p>
											</div>
												<p className="text-sm text-[#f1f1f1] mt-1">
													{answer.title}
												</p>
											</div>
										</div>
										<div className='flex items-center pt-1 ml-[45px]'>
											<div className='hover:bg-[#3f3f3f] rounded-full'>
												<IconButton onClick={() => handleAnswerLikeClick(answer.id)}>
													{likedAnswers[answer.id]?.isLiked
														? <AiFillLike size={20} style={{color: '#f1f1f1'}}/>
														: <AiOutlineLike size={20} style={{color: '#f1f1f1'}}/>
													}
												</IconButton>
											</div>
											<span className='mr-2 text-[#aaa] text-sm'>
												{likedAnswers[answer.id]?.isLiked ? 1 : 0}
											</span>
											<div className='hover:bg-[#3f3f3f] rounded-full'>
												<IconButton onClick={() => handleAnswerDislikeClick(answer.id)}>
													{likedAnswers[answer.id]?.isDisliked
														? <AiFillDislike size={20} style={{color: '#f1f1f1'}}/>
														: <AiOutlineDislike size={20} style={{color: '#f1f1f1'}}/>
													}
												</IconButton>
											</div>
										</div>
									</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default MemeAnswer