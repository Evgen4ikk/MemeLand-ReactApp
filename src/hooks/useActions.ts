import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { memeIdAction } from '../store/slice/getMemeId'
import { userIdAction } from '../store/slice/getUserId'

const actions = {
	...memeIdAction,
	...userIdAction
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}
