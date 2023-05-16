import React, { FC } from 'react'
import { api } from '../store/api/api'
import { IMemes } from '../types/IMemes'
import RelatedMemeItem from './RelatedMemeItem'

interface RelatedMemesProps { 
  memeId: number;
}

const RelatedMemes: FC<RelatedMemesProps> = ({ memeId }) => {
  const { isLoading, data } = api.useFetchAllMemesQuery('')

  const randomizedMemes: any = data && [...data].sort(() => Math.random() - 0.5).filter(meme => meme.id !== memeId);

  return (
    <div>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : randomizedMemes?.length > 0 ? (
        randomizedMemes.map((meme: IMemes) => (
          <div key={meme.id}>
            <RelatedMemeItem meme={meme}/>
          </div>
        ))
      ) : (
        <div>Ничего не найдено :(</div>
      )}
    </div>
  )
}

export default RelatedMemes;
