import React, { useState, useEffect, useRef } from 'react'
import { Badge, IconButton, Popover, Typography } from '@mui/material'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';


const notifications: string[] = [];

function Notifications() {
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleClick = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div className="rounded-full mr-5 text-[#f1f1f1] hover:bg-[#272727]">
        <IconButton onClick={handleClick}>
          <Badge badgeContent={notifications.length} color="primary">
            {showNotifications
              ? <NotificationsIcon style={{ color: '#fff' }} />
              : <NotificationsNoneOutlinedIcon style={{ color: '#fff' }} />
            }
          </Badge>
        </IconButton>
      </div>
      {showNotifications && (
        <div ref={notificationsRef} className="absolute right-[117px] top-[15px] mt-2 w-[250px] bg-[#282828] rounded-md shadow-lg z-10 text-[#f1f1f1]">
          <div className='pl-3 py-2 text-base'>
            Уведомления
          </div>
          <div className="py-2 border-t border-[#ffffff33] text-center">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <p key={notification} className="block px-4 py-2  hover:bg-[#3e3e3e] cursor-pointer">
                  {notification}
                </p>
              ))
            ) : (
              <p className="block px-4 py-2">Уведомлений нет</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
