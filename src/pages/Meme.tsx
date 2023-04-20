import { useTypedSelector } from '../hooks/useTypedSelector'

const Meme = () => {
	const { memeId } = useTypedSelector(state => state.getMemeId)
	
	return (
		<div>Meme{memeId}</div>
	)
}

export default Meme