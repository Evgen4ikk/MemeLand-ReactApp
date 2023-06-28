import { Avatar, IconButton } from '@mui/material'
import React, { useRef, useState } from 'react'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { CiMenuKebab } from 'react-icons/ci'
import { useClickAway } from 'react-use'
import { IAnswers } from '../types/IAnswer'
import { IComments } from '../types/IComments'
import { IProfile } from '../types/IProfile'
import DislikeButton from './UI/DislikeButton'
import LikeButton from './UI/LikeButton'
import { memeAPI } from '../store/api/memeAPI'

interface AnswerItemProps {
  memeId: number;
	comment: IComments;
	myProfile: IProfile | undefined;
}

const AnswerItem: React.FC<AnswerItemProps> = ({memeId, comment, myProfile}) => {

	const { data: answers } = memeAPI.useFetchAnswersMemeIdQuery(memeId);

	const [deleteAnswer] = memeAPI.useDeleteAnswerMutation()

	const handleDeleteAnswer = async (answerId: number) => {
    await deleteAnswer({ id: answerId } as IAnswers);
	}

	const filteredAnswers = answers?.filter((a: any) => a.commentId === comment.id);

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const menuRef = useRef(null);
	
	useClickAway(menuRef, () => {
		setIsMenuOpen(false);
	});

	const [selectedAnswerId, setSelectedAnswerId] = useState<number>();

	const [likedAnswers, setLikedAnswers] = useState<any>({});

	const handleAnswerLikeClick = (answerId: number) => {
		setLikedAnswers({
			...likedAnswers,
			[answerId]: {
				isLiked: !likedAnswers[answerId]?.isLiked,
				isDisliked: false,
			},
		});
	};

	const handleAnswerDislikeClick = (answerId: number) => {
		setLikedAnswers({
			...likedAnswers,
			[answerId]: {
				isLiked: false,
				isDisliked: !likedAnswers[answerId]?.isDisliked,
			},
		});
	};

	return (
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
									<CiMenuKebab style={{ color: "#f1f1f1" }} size={16} />
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
							<LikeButton 
								onClick={() => handleAnswerLikeClick(answer.id)}
								isLiked={likedAnswers[answer.id]?.isLiked}
							/>
							<span className='mr-2 text-[#aaa] text-sm'>
								{likedAnswers[answer.id]?.isLiked ? 1 : 0}
							</span>
							<DislikeButton
								onClick={() => handleAnswerDislikeClick(answer.id)}
								isDisliked={likedAnswers[answer.id]?.isDisliked}
							/>
						</div>
					</div>
			))}
		</div>
	)
}

export default AnswerItem