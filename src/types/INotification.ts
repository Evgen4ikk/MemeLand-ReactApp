import { IMemes } from './IMemes'
import { IUsers } from './IUsers'

export interface INotification {
	id: number,
	description: string
	user?: IUsers[]
	meme?: IMemes
}