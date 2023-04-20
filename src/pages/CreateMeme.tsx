import React, { useEffect, useRef, useState } from 'react'
import { api } from '../store/api/api'
import { IMemes } from '../types/IMemes'
import { useNavigate } from 'react-router-dom'

const CreateMeme: React.FC = () => {
	const navigate = useNavigate();
	const formRef = useRef<HTMLDivElement>(null);
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

	useEffect(() => {
		if (isFormOpen && formRef.current) {
			formRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [isFormOpen]);

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
					<div ref={formRef} className="max-w-md mx-auto py-[170px]">
						<form onSubmit={handleSubmit} className="bg-[#232323] shadow-md rounded px-8 pt-6 pb-8 mb-4 text-white">
							<div className="mb-4">
								<label className="block text-sm font-bold mb-2" htmlFor="name">
									Название мема
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
									id="name"
									type="text"
									placeholder="Введите название"
									value={meme.name}
									onChange={e => setMeme({ ...meme, name: e.target.value })}
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-bold mb-2" htmlFor="image">
									URL картинки
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="image"
									type="text"
									placeholder="Вставьте URL картинки"
									value={meme.image}
									onChange={e => setMeme({ ...meme, image: e.target.value })}
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-bold mb-2" htmlFor="video">
									URL видео
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="video"
									type="text"
									placeholder="Вставьте URL видео"
									value={meme.video}
									onChange={e => setMeme({ ...meme, video: e.target.value })}
								/>
							</div>
							<div className="flex items-center justify-center">
								<button
									type="submit"
									className="text-xl font-bold px-4 py-2 border-2 hover:bg-white hover:text-[#0f0f0f] transition-all"
								>
									Создать мем
								</button>
							</div>
						</form>
					</div>
					)
				: (<></>)
			}
			
		</div>
	)
}

export default CreateMeme