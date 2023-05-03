import { FaRegSadTear } from 'react-icons/fa'
import { api } from '../../store/api/api'

const Subscriptions = () => {
	const { data: subscriptions } = api.useFetchSubscriptionsQuery('')

	if (subscriptions?.length > 0) {
		return (
			<div>
				<ul className='flex items-center justify-center mt-10'>
					user
				</ul>
			</div>
		)
	} else {
		return (
			<div className='mt-20 flex flex-col justify-center items-center'>
				<FaRegSadTear className='text-gray-400 w-20 h-20' />
				<h1 className='text-gray-400 text-center font-bold text-xl mt-4'>
					Нет людей
					<br />
					на которых вы подписаны
				</h1>
			</div>
		)
	}
}

export default Subscriptions