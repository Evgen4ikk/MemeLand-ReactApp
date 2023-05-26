import { useEffect, useState } from 'react'
import MemeItem from '../../components/MemeItem'
import Menu from '../../components/Menu'
import CustomProgressBar from '../../components/UI/CustomProgressBar/CustomProgressBar'
import { api } from '../../store/api/api'
import classes from './home.module.css'

const Home = () => {

  const { isLoading, data } = api.useFetchAllMemesQuery('');

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
    <div className="mx-auto flex">
			<Menu />
      {loading ? (
        <CustomProgressBar />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Home
