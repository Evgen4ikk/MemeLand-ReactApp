import React, { FC } from 'react';
import { api } from '../store/api/api';
import { IMemes } from '../types/IMemes';
import RelatedMemeItem from './RelatedMemeItem';

interface RelatedMemesProps { 
  memeId: number;
}

const RelatedMemes: FC<RelatedMemesProps> = ({ memeId }) => {
  const { isLoading, data } = api.useFetchAllMemesQuery('');

  const filteredMemes = data && data.filter(meme => meme.id !== memeId);

  return (
    <div>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : filteredMemes && filteredMemes.length > 0 ? (
        filteredMemes.map((meme: IMemes) => (
          <div 
            key={meme.id}
            className='pb-3'  
          >
            <RelatedMemeItem meme={meme}/>
          </div>
        ))
      ) : (
        <div>Ничего не найдено :(</div>
      )}
    </div>
  );
}

export default RelatedMemes;
