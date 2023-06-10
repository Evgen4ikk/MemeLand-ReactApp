import { Avatar } from '@mui/material'
import { useEffect, useState } from 'react'
import Menu from '../../components/Menu'
import CustomProgressBar from '../../components/UI/CustomProgressBar/CustomProgressBar'
import { userAPI } from '../../store/api/userAPI'
import classes from './myProfile.module.css'
import { memeAPI } from '../../store/api/memeAPI'
import MemeItem from '../../components/MemeItem'

const MyProfile = () => {
  const { data: myProfile, isLoading } = userAPI.useFetchProfileDataQuery('')

  const { data: memes } = memeAPI.useFetchAllMemesQuery('')

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const filteredMemes = memes && memes.filter(meme => meme.myMeme === true)

	console.log(filteredMemes)

  return (
    <div className={`pl-[30px] mx-auto ${classes.container}`}>
      <Menu />
      {loading ? (
        <CustomProgressBar />
      ) : (
        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div className="flex pt-3 pb-4">
                <div className="w-[196px] flex justify-center mb-2 items-center">
                  <Avatar
                    src={myProfile?.avatar}
                    sx={{ width: '102px', height: '102px', cursor: 'pointer' }}
                  />
                </div>
                <div className="text-[#f1f1f1] text-2xl pt-4 flex flex-1 pr-[10px]">
                  <div>
                    <div className="max-w-[380px] overflow-hidden pb-2 cursor-pointer">
                      {myProfile?.username}
                    </div>
                    <div className="text-sm text-[#aaa]">
                      <span className="pr-2">{myProfile?.subscribers} подписчиков</span>
                      <span>0 видео</span>
                    </div>
                  </div>
                  <div className="ml-auto pt-2 pr-3">
                    <button className="h-[36px] px-4 text-sm bg-white text-[#0f0f0f] rounded-[18px] font-semibold cursor-pointer hover:bg-[#d9d9d9]">
                      Редактировать
                    </button>
                  </div>
                </div>
              </div>
              <div className={`${classes.line} border-b border-[#3f3f3f] pt-4`} />
              <div className="flex mx-auto">
                {isLoading ? (
                  <div>Загрузка...</div>
                ) : filteredMemes && filteredMemes.length > 0 ? (
                  filteredMemes?.map((meme) => (
                    <div
                      key={meme.id}
                      className={`${classes.meme_container} pt-10 mx-auto`}
                    >
                      <MemeItem meme={meme} />
                    </div>
                  ))
                ) : (
                  <div>Ничего не найдено :(</div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MyProfile
