export interface IMemes { 
	id: number
	userId: number
	myMeme: boolean
	author: string
	name: string
	image: string
	video: string
	views: number
	likes: any
}

export interface IMemesHistory extends IMemes{
	memeId: number
}