import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'

const rootActions = {
}

export const useActions = () => {
	const dispatch = useDispatch()

	return useMemo(() => 
		bindActionCreators(rootActions, dispatch), [dispatch])
}
