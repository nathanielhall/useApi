import React, { FC } from 'react'
import { useApi } from './useApi'

type DogApi = {
  message: string
}

export const App: FC = () => {
  const [getDog] = useApi<DogApi>('breeds/image/random')

  return (
    <>
      {getDog.loading && <h2>Loading...</h2>}
      {getDog.error && <h2>`ERROR: ${getDog.error.message}`</h2>}
      {getDog.response && <img src={getDog.response.data.message} alt="new" />}
    </>
  )
}
