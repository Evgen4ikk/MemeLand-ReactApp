import { useTypedSelector } from '../../hooks/useTypedSelector'

const UserProfile = () => {
	const { userId } = useTypedSelector(state => state.getUserId)
	
	return (
		<div>
			User {userId}
		</div>
	)
}

export default UserProfile