export interface IMemes { 
	id: number
	userId: number
	myMeme: boolean | null
	author: string
	name: string
	image: string
	video: string
	views: number
}