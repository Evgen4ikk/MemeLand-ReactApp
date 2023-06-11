import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { Badge, IconButton } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { INotification } from '../../../types/INotification'
import NotificationItem from './NotificationItem'
import scrollbar from './notification.module.css'

function Notifications() {
	const notificationsRef = useRef<HTMLDivElement>(null)
	const [showNotifications, setShowNotifications] = useState(false)
	const [readNotifications, setReadNotifications] = useState(0)
	const notifications = useTypedSelector(
		state => state.notification.notification
	)

	const handleClick = () => {
		setReadNotifications(notifications.length)
		setShowNotifications(!showNotifications)
	}

	useEffect(() => {
    const storedReadNotifications = localStorage.getItem('readNotifications');
    if (storedReadNotifications) {
      setReadNotifications(parseInt(storedReadNotifications));
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('readNotifications', readNotifications.toString());
  }, [readNotifications]);

	return (
		<div>
			<div className='rounded-full mr-5 text-[#f1f1f1] hover:bg-[#272727]'>
				<IconButton onClick={handleClick}>
					<Badge
						badgeContent={notifications.length - readNotifications}
						color='primary'
					>
						{showNotifications ? (
							<NotificationsIcon style={{ color: '#fff' }} />
						) : (
							<NotificationsNoneOutlinedIcon style={{ color: '#fff' }} />
						)}
					</Badge>
				</IconButton>
			</div>
			{showNotifications && (
				<div
					ref={notificationsRef}
					className={`absolute right-[117px] top-[15px] mt-2 w-[360px] max-h-[542px] bg-[#282828] rounded-md shadow-lg z-10 text-[#f1f1f1] overflow-auto ${scrollbar.container}`}
				>
					<div className='pl-3 py-2 text-base'>Уведомления</div>
					<div className='py-2 border-t border-[#ffffff33] text-center'>
						{notifications.length > 0 ? (
							notifications.map((notification: INotification) => (
								<div
									key={notification.id}
									className={`block px-2 py-2 hover:bg-[#3e3e3e] cursor-pointer ${
										notification.id > readNotifications && ''
									}`}
								>
									<NotificationItem notification={notification} />
								</div>
							))
						) : (
							<p className='block px-4 py-2'>Уведомлений нет</p>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default Notifications
