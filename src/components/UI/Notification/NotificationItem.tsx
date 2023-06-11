import { Avatar } from '@mui/material'
import { FC } from 'react'
import { INotification } from '../../../types/INotification'

interface notificationProps {
	notification: INotification
}

const NotificationItem: FC<notificationProps> = ({ notification }) => {
	return (
		<div className='flex items-center justify-between'>
			<div className='w-[234px] mr-5'>{notification.description}</div>
			{notification.meme ? (
				<div className='w-[86px] h-[56px]'>
					<img src={notification.meme?.image} />
				</div>
			) : (
				<div className='mx-auto'>
					<Avatar src={notification.user?.[0]?.avatar} />
				</div>
			)}
		</div>
	)
}

export default NotificationItem
