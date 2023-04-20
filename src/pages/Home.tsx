import { api } from '../store/api/api'
import MemeItem from '../components/MemeItem'

const Home = () => {
  const { isLoading, data } = api.useFetchAllMemesQuery('')
  return (
    <div className="mx-auto pt-10">
      <div className="flex flex-wrap gap-10 justify-center">
				{isLoading
					? <div>Loading...</div>
					: data
						? data?.map(meme =>
							(
								<div key={meme.id}>
									<MemeItem meme={meme} />
								</div>
							)
						)
						: <div>Not Found</div>
				}
      </div>
    </div>
  )
}

export default Home
