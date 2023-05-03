import { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { MdSubscriptions } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false)

  return(
		isOpen
			? <div>
					<ul>
						<li>Menu Item 1</li>
						<li>Menu Item 2</li>
						<li>Menu Item 3</li>
					</ul>
				</div>
			: <div className='text-white'>
					<Link to='/'>
						<div className='flex items-center flex-col justify-center outline-none rounded-lg pt-4 pb-3.5 hover:bg-[#272727] text-xs'>
							<AiFillHome size={24}/>
							<span className='pt-1'>
								Главная
							</span>
						</div>
					</Link>
					<Link to='/'>
						<div className='flex items-center flex-col justify-center outline-none rounded-lg pt-4 pb-3.5 hover:bg-[#272727] text-xs'>
							<MdSubscriptions size={24}/>
							<span className='pt-1'>
								Подписки
							</span>
						</div>
					</Link>
				</div>
  );
};

export default Menu;