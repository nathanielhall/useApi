import React, { FC } from 'react'
import { useApi } from './useApi'

type DogApi = {
  message: string
}
export const App: FC = () => {
  const [getDog] = useApi<DogApi>('breeds/image/random')

  if (getDog.loading) return <h2>Loading</h2>
  if (getDog.error) return <h2>'Error'</h2>

  return (
    <>
      {getDog.response && <img src={getDog.response.data.message} alt="new" />}
    </>
  )
}
