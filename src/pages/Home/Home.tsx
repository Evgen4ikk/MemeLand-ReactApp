import MemeItem from '../../components/MemeItem'
import Menu from '../../components/Menu'
import { api } from '../../store/api/api'
import classes from './home.module.css'

const Home = () => {

  const { isLoading, data } = api.useFetchAllMemesQuery('')

  return (
    <div className="mx-auto pt-10 flex">
      <Menu />
			<div className={`${classes.container} mx-auto pl-6`}>
				{isLoading ? (
					<div>Загрузка...</div>
				) : data ? (
					data.map((meme) => (
						<div key={meme.id} className={classes.grid_item}>
							<MemeItem meme={meme} />
						</div>
					))
				) : (
					<div>Ничего не найдено :(</div>
				)}
			</div>
    </div>
  )
}

export default Home
