import { useState } from 'react'
import { useGetMemesQuery } from '../store/api/api'
import Memeitem from '../components/MemeItem'

const Home = () => {
	const [queryTerm, setQueryTerm] = useState('')
	const {isLoading, data} = useGetMemesQuery(queryTerm)
  console.log(data)
 return(
	<div>
	{isLoading 
		? <div>Loading...</div> 
		: data ? data.map(meme =>
		<Memeitem
			key={meme.id}
			meme={meme}
		/>
		)
		: <div> Not Found</div>
	}
</div>
 ) 
}

export default Home