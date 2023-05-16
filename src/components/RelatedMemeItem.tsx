import React, { FC } from 'react'
import { IMemes } from '../types/IMemes'

interface RelatedMemeItemProps { 
	meme: IMemes
}

const RelatedMemeItem:FC <RelatedMemeItemProps> = ({meme}) => {
	return (
		<div>
			{meme.id}
		</div>
	)
}

export default RelatedMemeItem