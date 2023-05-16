import { IconButton } from '@mui/material'
import React, { FC } from 'react'
import { AiFillDislike, AiOutlineDislike } from 'react-icons/ai'

interface DislikeButtonProps {
	isDisliked: boolean;
	onClick: () => void;
}

const DislikeButton:FC <DislikeButtonProps> = ({isDisliked, onClick}) => {
	return (
		<div className='hover:bg-[#3f3f3f] rounded-full'>
			<IconButton onClick={onClick}>
				{isDisliked
					? <AiFillDislike size={20} style={{color: '#f1f1f1'}}/>
					: <AiOutlineDislike size={20} style={{color: '#f1f1f1'}}/>
				}
			</IconButton>
		</div>
	)
}

export default DislikeButton