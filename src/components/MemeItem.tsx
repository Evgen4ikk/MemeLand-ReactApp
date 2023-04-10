import { IMemes } from '../types/IMemes'

interface IMemeItem {
  meme: IMemes
}

const MemeItem = ({ meme }: IMemeItem) => {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden w-64 h-70">
      <div>
        <img src={meme.image} alt={meme.name} className="w-full h-48 object-cover" />
      </div>
      <div className="px-3 py-4">
        <p className="font-semibold text-xs mb-2">{meme.name}</p>
				<div className='flex justify-between items-center'>
					<div>
        	<p className="text-gray-700 text-sm ">{meme.author}</p>
					</div>
					<div></div>
				</div>
      </div>
    </div>
  )
}

export default MemeItem
