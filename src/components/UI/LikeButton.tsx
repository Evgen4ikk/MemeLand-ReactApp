import { IconButton } from '@mui/material'
import React, { FC } from 'react'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'

interface LikeButtonProps {
	isLiked: boolean;
	onClick: () => void;
}

const LikeButton:FC <LikeButtonProps> = ({ isLiked, onClick}) => {
	return (
		<div className='hover:bg-[#3f3f3f] rounded-full'>
			<IconButton onClick={onClick}>
				{isLiked
					? <AiFillLike size={20} style={{color: '#f1f1f1'}}/>
					: <AiOutlineLike size={20} style={{color: '#f1f1f1'}}/>
				}
			</IconButton>
		</div>
	)
}

export default LikeButton