import { Avatar, IconButton } from '@mui/material'
import EmojiPicker from 'emoji-picker-react'
import React, { useRef, useState } from 'react'
import { BiWinkSmile } from 'react-icons/bi'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { CiMenuKebab } from 'react-icons/ci'
import { Link } from 'react-router-dom'
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
	const dark: any = 'dark'
	const [deleteComment] = memeAPI.useDeleteCommentMutation()
	const [selectedCommentId, setSelectedCommentId] = useState<number>()
	const [editCommMap, setEditCommMap] = useState<Record<number, boolean>>({})
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
	const [commValue, setCommValue] = useState('')

	const [updateComm] = memeAPI.useUpdateCommentMutation()
	const menuRef = useRef(null)

	const [isEmojiClicked, setIsEmojiClicked] = useState<boolean>(false)

	const [selectedEmoji, setSelectedEmoji] = useState<null>(null)

	const [disableSend, setDisableSend] = useState<boolean>(true)

	const handleEmojiClick = (emojiObject: any) => {
		setSelectedEmoji(emojiObject)
		setCommValue(prevComment => prevComment + emojiObject.emoji)
		setDisableSend(commValue.trim().length === 0)
	}

	useClickAway(menuRef, () => {
		setIsMenuOpen(false)
	})

	const handleUpdateComm = async (
		newComm: string | undefined,
		commentId: number
	) => {
		if (!newComm) {
			return
		}

		const updatedComm = { ...comments, title: newComm } as IComments
		await updateComm(updatedComm)
		window.location.reload()

		const updatedEditCommMap = { ...editCommMap }
		updatedEditCommMap[commentId] = false
		setEditCommMap(updatedEditCommMap)
	}

	const handleDeleteComm = async (commentId: number) => {
		await deleteComment({ id: commentId } as IComments)
	}

	const handleEditComm = (commentId: number) => {
		const updatedEditCommMap = { ...editCommMap }
		updatedEditCommMap[commentId] = true
		setEditCommMap(updatedEditCommMap)
		setIsMenuOpen(false)
	}

	const handleCancelEdit = (commentId: number) => {
		const updatedEditCommMap = { ...editCommMap }
		updatedEditCommMap[commentId] = false
		setEditCommMap(updatedEditCommMap)
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCommValue(event.target.value)
	}

	return (
		<div className='flex flex-col-reverse'>
			{comments?.map((comment: IComments) => (
				<div key={comment.id} className='my-6 flex relative'>
					{editCommMap[comment.id] ? (
						<>
							<div className='flex'>
								<div className='mr-5'>
									<Link to={`/MyProfile}`}>
										<Avatar
											sx={{ height: '40px', width: '40px' }}
											src={myProfile?.avatar}
										/>
									</Link>
								</div>
								<input
									className={`outline-none bg-inherit border-b border-white
										text-[#f1f1f1] placeholder-[#aaa] py-[2px] px-1 w-full`}
									placeholder='Введите комментарий'
									value={commValue}
									onChange={handleInputChange}
								/>
							</div>
							<div className='flex justify-between items-center'>
								<div className='rounded-full ml-16 text-[#f1f1f1] hover:bg-[#272727]'>
									<IconButton
										onClick={() => setIsEmojiClicked(!isEmojiClicked)}
									>
										<BiWinkSmile style={{ color: '#f1f1f1' }} size={24} />
									</IconButton>
								</div>
								<div>
									<div className='relative'>
										<div className='absolute left-[-400px] top-[45px] z-10'>
											{isEmojiClicked && (
												<EmojiPicker
													width={600}
													height={400}
													theme={dark}
													onEmojiClick={handleEmojiClick}
												/>
											)}
										</div>
									</div>
									<div>
										<button
											className='text-white px-4 py-2 rounded-full hover:bg-[#272727]'
											onClick={() => handleCancelEdit(comment.id)}
										>
											Отмена
										</button>
										<button
											type='submit'
											disabled={disableSend}
											className={`${
												disableSend
													? 'text-[#717171] bg-[#272727] px-4 py-2 rounded-full ml-2'
													: 'bg-[#3ea6ff] text-[#0f0f0f] px-4 py-2 rounded-full ml-2 hover:bg-[#65b8ff]'
											} `}
										>
											Изменить комментарий
										</button>
									</div>
								</div>
							</div>
						</>
					) : (
						<>
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
									<CiMenuKebab style={{ color: '#f1f1f1' }} size={16} />
								</IconButton>
							</div>
							{selectedCommentId === comment.id && isMenuOpen ? (
								<div
									ref={menuRef}
									className='absolute flex flex-col bg-[#282828] py-2 text-[#f1f1f1] right-[-100px] top-[35px] rounded-lg z-10'
								>
									<button
										className='hover:bg-[#535353] pr-4 py-1 flex items-center'
										onClick={() => handleEditComm(comment.id)}
									>
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
						</>
					)}
				</div>
			))}
		</div>
	)
}

export default CommItem
