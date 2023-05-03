import MemeItem from '../../components/MemeItem'
import { api } from '../../store/api/api'

const Home = () => {
  const { isLoading, data } = api.useFetchAllMemesQuery('')
  return (
    <div className="mx-auto pt-10">
			{/* <div className='fixed left-0 top-[60px] px-1 w-[72px]'>
				<Menu />
			</div> */}
      <div className="flex flex-wrap gap-10 justify-center ">
				{isLoading
					? <div>Загрузка...</div>
					: data
						? data?.map(meme =>
							(
								<div key={meme.id}>
									<MemeItem meme={meme} />
								</div>
							)
						)
						: <div>Ничего не найдено :(</div>
				}
      </div>
    </div>
  )
}

export default Home
