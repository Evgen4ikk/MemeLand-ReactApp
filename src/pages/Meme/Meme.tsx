import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import MemeComm from '../../components/MemeComm'
import MemeLikes from '../../components/MemeLikes'
import MemeSub from '../../components/MemeSub'
import RelatedMemes from '../../components/RelatedMemes'
import CustomProgressBar from '../../components/UI/CustomProgressBar/CustomProgressBar'
import { memeAPI } from '../../store/api/memeAPI'
import { userAPI } from '../../store/api/userAPI'

const Meme: React.FC = () => {
	const { id } = useParams<{ id: any }>()

	const { data: memeData } = memeAPI.useFetchMemeIdQuery(id)

	const [authorId, setAuthorId] = useState<any>(null)

	useEffect(() => {
		setAuthorId(memeData?.userId)
	}, [memeData?.userId])

	const { data: authorData } = userAPI.useFetchUserIdQuery(authorId)

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false)
		}, 1000)

		return () => {
			clearTimeout(timeout)
		}
	}, [])

	return (
		<div className='w-[1100px] mx-auto'>
			{loading ? (
				<CustomProgressBar />
			) : (
				<div className='flex text-[#f1f1f1]'>
					<div>
						<div>
							<ReactPlayer
								url={memeData?.video}
								controls={true}
								width={760}
								height={400}
							/>
						</div>
						<div className='font-semibold text-[24px] py-2'>
							<h1>{memeData?.name}</h1>
						</div>
						<div className='flex items-center'>
							<div>
								{authorData && <MemeSub memeId={id} userId={authorId} />}
							</div>
							<div className='flex items-center ml-[15%]'>
								<MemeLikes memeId={id} />
							</div>
						</div>
						<div className='max-w-[800px]'>
							<MemeComm memeId={id} />
						</div>
					</div>
					<div className='pl-5'>
						<RelatedMemes memeId={parseInt(id)} />
					</div>
				</div>
			)}
		</div>
	)
}

export default Meme
