import { Avatar } from '@mui/material'
import { FC } from 'react'
import { IUsers } from '../types/IUsers'
import { Link } from 'react-router-dom'

interface SubItemProps { 
  subscriptions: IUsers
}

const SubItem: FC<SubItemProps> = ({subscriptions}) => {

  return (
    <div className='flex flex-col items-center text-center'>
      <div className='w-[196px] h-[196px] flex justify-center items-end mb-2'>
      <Link
        to={`/user/${subscriptions.id}`}
      >
        <Avatar
          src={subscriptions.avatar}
          sx={{ width: '150px', height: '150px', cursor: 'pointer' }}
        />
      </Link>
      </div>
      <div className='text-[#f1f1f1] cursor-pointer'>{subscriptions.username}</div>
      <div className='text-[#aaa] text-xs'>{subscriptions.subscribers} подписчиков</div>
    </div>
  )
}

export default SubItem
