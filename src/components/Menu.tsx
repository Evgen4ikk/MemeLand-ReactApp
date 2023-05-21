import { useState } from 'react';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const location = useLocation();

  const [home, setHome] = useState<boolean>(location.pathname === '/');
  const [sub, setSub] = useState<boolean>(location.pathname === '/subscriptions');
  const [lib, setLib] = useState<boolean>(location.pathname === '/library');

  const changeIcon = () => {
    setHome(!home);
    setSub(!sub);
		setLib(!lib)
  };

  return (
    <div className='fixed left-0 top-[60px] mx-1 z-10 text-white'>
      <Link to='/'>
        <div className='flex items-center flex-col justify-center outline-none rounded-lg pt-4 pb-3.5 hover:bg-[#272727] text-[10px] px-3'>
          <button className='px-2' onClick={changeIcon}>
            {home ? <AiFillHome size={18} /> : <AiOutlineHome size={18} />}
          </button>
          <span className='pt-1'>Главная</span>
        </div>
      </Link>
      <Link to='/subscriptions'>
        <div className='flex items-center flex-col justify-center outline-none rounded-lg pt-4 pb-3.5 hover:bg-[#272727] text-[10px]'>
          <button className='px-2' onClick={changeIcon}>
            {sub ? <SubscriptionsIcon /> : <SubscriptionsOutlinedIcon />}
          </button>
          <span className='pt-1'>Подписки</span>
        </div>
      </Link>
      <Link to='/library'>
        <div className='flex items-center flex-col justify-center outline-none rounded-lg pt-4 pb-3.5 hover:bg-[#272727] text-[10px]'>
          <button className='px-2' onClick={changeIcon}>
            {lib ? <VideoLibraryIcon /> : <VideoLibraryOutlinedIcon />}
          </button>
          <span className='pt-1'>Библиотека</span>
        </div>
      </Link>
    </div>
  );
};

export default Menu;
