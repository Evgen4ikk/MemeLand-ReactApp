import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IMemes } from '../../../types/IMemes'

interface LibraryLikedProps {
  liked: IMemes
}

const LibraryLikedItem: FC<LibraryLikedProps> = ({ liked }) => {
  return (
    <div className='rounded-lg overflow-hidden pb-3'>
      <Link to={`/meme/${liked.id}`}>
        <img
          src={liked.image}
          alt={liked.name}
          className='h-[118px] w-full object-cover rounded-lg'
        />
      </Link>
      <div className='flex'>
        <div className='pt-2'>
          <Link to={`/meme/${liked.id}`}>
            <h3 className='leading-tight font-semibold text-[#f1f1f1] mb-1 overflow-hidden max-h-9 cursor-pointer text-sm'>
              {liked.name}
            </h3>
          </Link>
          <div className='text-[#AAAAAA] text-xs'>
            <Link
              to={`/user/${liked.userId}`}
              className='hover:text-[#f1f1f1]'
            >
              {liked.author}
            </Link>
            <div>{liked.views} просмотров</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LibraryLikedItem
