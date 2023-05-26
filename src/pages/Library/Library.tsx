import { AiOutlineLike } from 'react-icons/ai'
import Menu from '../../components/Menu'
import { MdHistory } from 'react-icons/md'
import { useEffect, useState } from 'react'
import CustomProgressBar from '../../components/UI/CustomProgressBar/CustomProgressBar'

const Library = () => {

	const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

	return (
		<div className='pl-6 max-w-[1280px] mx-auto'>
			<Menu />
			{loading ? (
        <CustomProgressBar />
      ) : (
				<>	
					<div className='w-full text-[#f1f1f1]'>
						<div>
							<div className='flex items-center'>
								<MdHistory size={24} className='mr-4 '/>
								<span className='text-base font-medium'>История</span>
							</div>
							<div className='border-b border-[#3f3f3f] my-5 pb-6'>
								Здесь история
							</div>
						</div>
					</div>
					<div className='w-full text-[#f1f1f1]'>
						<div>
							<div className='flex items-center'>
								<AiOutlineLike size={24} className='mr-4 '/>
								<span className='text-base font-medium'>Понравившиеся</span>
							</div>
							<div className='border-b border-[#3f3f3f] my-5 pb-6'>
								Здесь Понравившиеся
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Library