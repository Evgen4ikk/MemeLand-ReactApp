import React, { useState } from 'react'
import { api } from '../store/api/api'
import { IMemes } from '../types/IMemes'
import { useNavigate } from 'react-router-dom'

const CreateMeme: React.FC = () => {
	const navigate = useNavigate();
	const [createMeme ] = api.useCreateMemeMutation()
	const { data: myProfile } = api.useFetchProfileDataQuery('')
	const [isFormOpen, setIsFormOpen] = useState(false)
	const defaultValue = {
		myMeme: true,
		name: '',
		image: '',
		video: '',
		author: myProfile?.username,
		views: 0
	} as IMemes
	const [meme, setMeme] = useState(defaultValue)

	const handleSubmit = (e: any) => {
		e.preventDefault();
		createMeme(meme).then(() => {
			setMeme(defaultValue);
			navigate('/')
		})
	}

	return (
		<div>
			<div className='flex justify-center pt-16'>
				<div className='flex text-center text-white font-bold'>
					<img src='/Want_a_meme.png' width={400} alt='Want a meme'/>
					<div className='ml-6 font-bold text-[64px] my-auto'>
						<p>Хочешь мем?</p>
						<p>Так создай</p>
						<button
							onClick={() => setIsFormOpen(true)}
							className='text-xl px-4 py-2 border-2 hover:bg-white hover:text-[#0f0f0f] transition-all'
						>
							Создать мем
						</button>
					</div>
				</div>
			</div>
			{isFormOpen
				? (
					<div>
						<form onSubmit={handleSubmit}>
							<label>
								<input
									type='text'
									placeholder='Введите название'
									value={meme.name}
									onChange={e => setMeme({...meme, name: e.target.value})}
								/>
							</label>
							<label>
								<input
									type='text'
									placeholder='Вставьте URL картинки'
									value={meme.video}
									onChange={e => setMeme({...meme, video: e.target.value})}
								/>
							</label>
							<label>
								<input
									type='text'
									placeholder='Вставьте URL видео'
									value={meme.image}
									onChange={e => setMeme({...meme, image: e.target.value})}
								/>
							</label>
							<button type='submit'>
								Создать мем
							</button>
						</form>
					</div>
					)
				: (<></>)
			}
			
		</div>
	)
}

export default CreateMeme