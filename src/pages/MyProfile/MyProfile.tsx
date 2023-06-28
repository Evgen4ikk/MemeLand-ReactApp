import { Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import { BsCheck, BsPencil } from 'react-icons/bs'
import { RiCloseFill } from 'react-icons/ri'
import MemeItem from '../../components/MemeItem'
import Menu from '../../components/Menu'
import CustomProgressBar from '../../components/UI/CustomProgressBar/CustomProgressBar'
import { memeAPI } from '../../store/api/memeAPI'
import { userAPI } from '../../store/api/userAPI'
import { IProfile } from '../../types/IProfile'
import classes from './myProfile.module.css'

const MyProfile = () => {
	const { data: myProfile, isLoading } = userAPI.useFetchProfileDataQuery('')

	const [editUsername, setEditUsername] = useState(false)

	const [usernameValue, setUsernameValue] = useState('');

	useEffect(() => {
		if (myProfile?.username) {
			setUsernameValue(myProfile.username);
		}
	}, [myProfile]);

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
								<div className='w-[196px] flex justify-center mb-2 items-center'>
									<Avatar
										src={myProfile?.avatar}
										sx={{ width: '142px', height: '142px', cursor: 'pointer' }}
									/>
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
