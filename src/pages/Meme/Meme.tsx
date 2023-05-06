import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import MemeLikes from '../../components/MemeLikes'
import MemeSub from '../../components/MemeSub'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { api } from '../../store/api/api'
import MemeComm from '../../components/MemeComm'

const Meme: React.FC = () => {
  const { memeId } = useTypedSelector(state => state.getMemeId);

  const { data } = api.useFetchMemeIdQuery(memeId);

  const { data: myProfile } = api.useFetchProfileDataQuery('');

	return (
		<div className='w-[1100px] mx-auto pt-8'>
			<div className='flex text-[#f1f1f1]'>
				<div>
					<div>
						<ReactPlayer
							url={data?.video}
							controls={true}
							width={760}
							height={400}
						/>
					</div>
					<div className='font-semibold text-[24px] py-2'>
						<h1>
							{data?.name}
						</h1>
					</div>
					<div className='flex items-center'>
						<div>
							<MemeSub memeId={memeId}/>
						</div>
						<div className='flex items-center ml-[15%]'>
							<MemeLikes memeId={memeId}/>
						</div>
					</div>
					<div className='max-w-[800px]'>
						<MemeComm memeId={memeId}/>
					</div>
				</div>
			<div>
				asdasdasd
			</div>
			</div>
		</div>
	)
}

export default Meme