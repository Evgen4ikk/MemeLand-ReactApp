import { IAnswer } from './IAnswer'

export interface IComments {
	id: number
	pinId: number
	username: string
	title: string
	time: string
	answer: IAnswer[]
}