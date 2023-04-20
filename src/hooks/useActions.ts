import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { memesActions } from '../store/slice/memes'
import { memeIdAction } from '../store/slice/getMemeId'
import { userIdAction } from '../store/slice/getUserId'

const actions = {
	...memesActions,
	...memeIdAction,
	...userIdAction
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}
