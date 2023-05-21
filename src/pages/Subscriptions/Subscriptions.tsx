import { FaRegSadTear } from 'react-icons/fa'
import { api } from '../../store/api/api'
import Menu from '../../components/Menu'
import SubItem from '../../components/SubItem'
import classes from './/subscriptions.module.css'

const Subscriptions = () => {
	const { data: subscriptions, isLoading } = api.useFetchSubscriptionsQuery('')

	if (subscriptions && subscriptions?.length > 0) {
		return (
			<div className='max-w-[1280px] mx-auto'>
				<Menu />
				<div className={`${classes.container} mx-auto pl-6`}>
				{isLoading ? (
					<div>Загрузка...</div>
				) : subscriptions ? (
					subscriptions.map((subscribe) => (
						<div key={subscribe.id}>
							<SubItem subscriptions={subscribe}/>
						</div>
					))
				) : (
					<div>Ничего не найдено :(</div>
				)}
				</div>
			</div>
		)
	} else {
		return (
			<div>
				<Menu />
				<div className='mt-20 flex flex-col justify-center items-center'>
					<FaRegSadTear className='text-gray-400 w-20 h-20' />
					<h1 className='text-gray-400 text-center font-bold text-xl mt-4'>
						Нет людей
						<br />
						на которых вы подписаны
					</h1>
				</div>
			</div>
		)
	}
}

export default Subscriptions