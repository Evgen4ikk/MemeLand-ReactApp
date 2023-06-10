import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import { memeAPI } from '../store/api/memeAPI'
import { userAPI } from '../store/api/userAPI'
import { IMemes } from '../types/IMemes'

interface IMemeItem {
	meme: IMemes
}

const MemeItem: React.FC<IMemeItem> = ({ meme }) => {
	const { data: user } = userAPI.useFetchUserIdQuery(meme.userId)

	const { data: myProfile } = userAPI.useFetchProfileDataQuery('')

	if (meme.myMeme === true) {
		return (
			<div className='rounded-lg overflow-hidden w-[320px] h-[290px]'>
				<Link to={`/meme/${meme.id}`}>
					<img
						src={meme.image}
						alt={meme.name}
						className='h-[180px] w-full object-cover rounded-lg'
					/>
				</Link>
				<div className='flex pt-2'>
					<div className='px-2 py-1'>
						<Link to={`/myProfile`}>
							<Avatar src={myProfile?.avatar} />
						</Link>
					</div>
					<div className='pt-2 pl-1'>
						<Link to={`/meme/${meme.id}`}>
							<h3 className='leading-tight font-semibold text-[#f1f1f1] mb-1 overflow-hidden max-h-11 cursor-pointer'>
								{meme.name}
							</h3>
						</Link>
						<div className='text-[#AAAAAA] text-[14px]'>
							<Link to={`/myProfile`} className='hover:text-[#f1f1f1]'>
								{myProfile?.username}
							</Link>
							<div>{meme.views} просмотров</div>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div className='rounded-lg overflow-hidden w-[320px] h-[290px]'>
				<Link to={`/meme/${meme.id}`}>
					<img
						src={meme.image}
						alt={meme.name}
						className='h-[180px] w-full object-cover rounded-lg'
					/>
				</Link>
				<div className='flex pt-2'>
					<div className='px-2 py-1'>
						<Link to={`/user/${meme.userId}`}>
							<Avatar src={user?.[0].avatar} />
						</Link>
					</div>
					<div className='pt-2 pl-1'>
						<Link to={`/meme/${meme.id}`}>
							<h3 className='leading-tight font-semibold text-[#f1f1f1] mb-1 overflow-hidden max-h-11 cursor-pointer'>
								{meme.name}
							</h3>
						</Link>
						<div className='text-[#AAAAAA] text-[14px]'>
							<Link
								to={`/user/${meme.userId}`}
								className='hover:text-[#f1f1f1]'
							>
								{meme.author}
							</Link>
							<div>{meme.views} просмотров</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default MemeItem
