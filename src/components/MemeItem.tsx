import { IMemes } from '../types/IMemes'

interface IMemeItem {
	meme: IMemes
}

const Memeitem = ({ meme }: IMemeItem) => {
	console.log(meme)
	
	return (
		<div className='bg-[#363636] rounded-lg  m-3 p-3'>
			<img width={300} src={meme.image}/>
			<h3 className='mb-1 '>{meme.name}</h3>
		</div>
	)
}

export default Memeitem