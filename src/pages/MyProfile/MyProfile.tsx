import { Avatar, Box, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { BiCameraOff } from 'react-icons/bi'
import { BsCamera, BsCheck, BsPencil } from 'react-icons/bs'
import { RiCloseFill } from 'react-icons/ri'
import MemeItem from '../../components/MemeItem'
import Menu from '../../components/Menu'
import CustomProgressBar from '../../components/UI/CustomProgressBar/CustomProgressBar'
import { memeAPI } from '../../store/api/memeAPI'
import { userAPI } from '../../store/api/userAPI'
import { IProfile } from '../../types/IProfile'
import classes from './myProfile.module.css'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 450,
	bgcolor: '#222222',
	p: 4,
}

const MyProfile = () => {
	const { data: myProfile, isLoading } = userAPI.useFetchProfileDataQuery('')

	const [isHovered, setIsHovered] = useState(false)

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const [imageUrl, setImageUrl] = useState('')

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setImageUrl(event.target.value)
	}

	const [editUsername, setEditUsername] = useState(false)

	const [usernameValue, setUsernameValue] = useState('')

	useEffect(() => {
		if (myProfile?.username) {
			setUsernameValue(myProfile.username)
		}
	}, [myProfile])

	const [updateProfile] = userAPI.useUpdateProfileMutation()

	const { data: memes } = memeAPI.useFetchAllMemesQuery('')

	const [loading, setLoading] = useState(true)

	const handleUpdateUsername = async (newUsername: string | undefined) => {
		if (!newUsername) {
			return
		}

		const updatedProfile = { ...myProfile, username: newUsername } as IProfile
		await updateProfile(updatedProfile)
		window.location.reload()
	}

	const handleUpdateAvatar = async (newAvatar: string | undefined) => {
		if (!newAvatar) {
			return
		}

		const updatedProfile = { ...myProfile, avatar: newAvatar } as IProfile
		await updateProfile(updatedProfile)
		window.location.reload()
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false)
		}, 500)

		return () => {
			clearTimeout(timeout)
		}
	}, [])

	const filteredMemes = memes && memes.filter(meme => meme.myMeme === true)

	return (
		<div className={`pl-[30px] mx-auto ${classes.container}`}>
			<Menu />
			{loading ? (
				<CustomProgressBar />
			) : (
				<>
					{isLoading ? (
						<div>Loading...</div>
					) : (
						<div>
							<div className='flex pt-3 pb-4'>
								<div
									onClick={handleOpen}
									className='w-[196px] flex justify-center mb-2 items-center relative'
									onMouseEnter={() => setIsHovered(true)}
									onMouseLeave={() => setIsHovered(false)}
								>
									<Avatar
										className={`absolute bg-black transition-opacity duration-300 hover:opacity-50 z-10 ${
											isHovered ? 'opacity-50' : ''
										}`}
										src={myProfile?.avatar}
										sx={{ width: '142px', height: '142px', cursor: 'pointer' }}
									/>
									{isHovered && (
										<div className='absolute flex justify-center items-center z-20 cursor-pointer'>
											<BsCamera className='text-white text-4xl' />
										</div>
									)}
								</div>
								<div>
									<Modal
										open={open}
										onClose={handleClose}
										aria-labelledby='modal-modal-title'
										aria-describedby='modal-modal-description'
									>
										<Box sx={style}>
											<div>
												<div className='flex flex-col items-center'>
													<div className='relative w-80 h-60'>
														{imageUrl ? (
															<img
																src={imageUrl}
																alt='Preview'
																className='object-cover w-full h-full'
															/>
														) : (
															<div className='flex items-center justify-center w-full h-full border border-gray-300'>
																<BiCameraOff
																	size={48}
																	className='text-gray-500'
																/>
															</div>
														)}
													</div>
													<input
														type='text'
														placeholder='Вставьте ссылку на фото'
														value={imageUrl}
														onChange={handleInputChange}
														className='mt-4 w-80 px-4 py-2 border border-[#303030]
														text-gray-300 placeholder-gray-300  outline-none rounded-xl bg-inherit'
														onKeyDown={e => {
															if (e.key === 'Enter') {
																handleUpdateAvatar(imageUrl)
															}
														}}
													/>
												</div>
												<div className='mt-4 flex justify-center'>
													<button
														className='px-4 py-2 mr-2 bg-blue-500 text-white rounded'
														onClick={() => handleUpdateAvatar(imageUrl)}
													>
														Сохранить
													</button>
													<button
														className='px-4 py-2 bg-gray-300 rounded'
														onClick={handleClose}
													>
														Закрыть
													</button>
												</div>
											</div>
										</Box>
									</Modal>
								</div>
								<div className='text-[#f1f1f1] text-2xl pt-4 flex flex-1 pr-[10px]'>
									<div>
										<div className='max-w-[680px] overflow-hidden pb-2 flex items-center'>
											{editUsername ? (
												<>
													<input
														className='outline-none bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl px-2 w-[150px]'
														defaultValue={usernameValue}
														onChange={e => setUsernameValue(e.target.value)}
														onKeyDown={e => {
															if (e.key === 'Enter') {
																handleUpdateUsername(usernameValue)
															}
														}}
													/>
													<div className='flex items-center pl-1'>
														<button
															className='mr-1'
															onClick={() =>
																handleUpdateUsername(usernameValue)
															}
														>
															<BsCheck size={26} />
														</button>
														<button onClick={() => setEditUsername(false)}>
															<RiCloseFill />
														</button>
													</div>
												</>
											) : (
												<>
													<span>{myProfile?.username || ''}</span>
													<button onClick={() => setEditUsername(true)}>
														<BsPencil size={17} className='ml-3 mt-1' />
													</button>
												</>
											)}
										</div>
										<div className='text-sm text-[#aaa]'>
											<span className='pr-2'>
												{myProfile?.subscribers} подписчиков
											</span>
											<span>0 видео</span>
										</div>
									</div>
								</div>
							</div>
							<div
								className={`${classes.line} border-b border-[#3f3f3f] pt-4`}
							/>
							<div className='flex mx-auto'>
								{isLoading ? (
									<div>Загрузка...</div>
								) : filteredMemes && filteredMemes.length > 0 ? (
									filteredMemes?.map(meme => (
										<div
											key={meme.id}
											className={`${classes.meme_container} pt-10 mx-auto`}
										>
											<MemeItem meme={meme} />
										</div>
									))
								) : (
									<div className='text-[#f1f1f1] text-4xl flex justify-center pt-5'>
										У вас нету видео :(
									</div>
								)}
							</div>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default MyProfile
