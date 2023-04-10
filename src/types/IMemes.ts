export interface IMemes { 
	id: number
	userId: number
	myPin: boolean
	author: string
	name: string
	image: string
	video: string
}

export interface iMemesData extends Omit<IMemes, 'id'>{}