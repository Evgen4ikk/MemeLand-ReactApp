import { Avatar, IconButton } from '@mui/material'
import React, { useRef, useState } from 'react'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { GoKebabVertical } from 'react-icons/go'
import { useClickAway } from 'react-use'
import { memeAPI } from '../store/api/memeAPI'
import { IComments } from '../types/IComments'
import { IProfile } from '../types/IProfile'
import MemeAnswer from './MemeAnswer'

interface CommItemProps {
	memeId: number
	myProfile: IProfile | undefined
	comments: IComments[] | undefined
}

const CommItem: React.FC<CommItemProps> = ({ memeId, myProfile, comments }) => {
	const [deleteComment] = memeAPI.useDeleteCommentMutation()

	const [selectedCommentId, setSelectedCommentId] = useState<number>()

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

	const menuRef = useRef(null)

	useClickAway(menuRef, () => {
		setIsMenuOpen(false)
	})

	const handleDeleteComm = async (commentId: number) => {
		await deleteComment({ id: commentId } as IComments)
	}

	return (
		<div className='flex flex-col-reverse'>
			{comments?.map((comment: IComments) => (
				<div key={comment.id} className='my-6 flex relative'>
					<Avatar
						sx={{ height: '40px', width: '40px' }}
						src={myProfile?.avatar}
					/>
					<div className='absolute top-0 right-0'>
						<IconButton
							onClick={() => {
								setSelectedCommentId(comment?.id)
								setIsMenuOpen(!isMenuOpen)
							}}
						>
							<GoKebabVertical style={{ color: '#f1f1f1' }} size={16} />
						</IconButton>
					</div>
					{selectedCommentId === comment.id && isMenuOpen ? (
						<div
							ref={menuRef}
							className='absolute flex flex-col bg-[#282828] py-2 text-[#f1f1f1] right-[-100px] top-[35px] rounded-lg z-10'
						>
							<button className='hover:bg-[#535353] pr-4 py-1 flex items-center'>
								<span className='px-3'>
									<BsPencil size={18} />
								</span>
								Изменить
							</button>
							<button
								className='hover:bg-[#535353] pr-4 py-1 flex items-center'
								onClick={() => handleDeleteComm(comment.id)}
							>
								<span className='px-3'>
									<BsTrash size={18} />
								</span>
								Удалить
							</button>
						</div>
					) : null}
					<div className='ml-4'>
						<div className='flex items-center'>
							<h4 className='text-sm font-medium text-[#f1f1f1]'>
								{comment?.username}
							</h4>
							<p className='ml-2 text-sm text-[#aaaaaa]'>{comment?.time}</p>
						</div>
						<p className='text-sm text-[#f1f1f1] mt-1'>{comment?.title}</p>
						<div className='w-full'>
							<MemeAnswer comment={comment} memeId={memeId} />
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default CommItem
