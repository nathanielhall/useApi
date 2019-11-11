import React, { FC } from 'react'
import { useApi } from './useApi'

type DogApi = {
  message: string
}
export const App: FC = () => {
  const [getUsers] = useApi<DogApi>('breeds/image/random')

  if (getUsers.loading) return <h2>Loading</h2>
  if (getUsers.error) return <h2>'Error'</h2>

  return (
    <>
      {getUsers.response && (
        <img src={getUsers.response.data.message} alt="new" />
      )}
    </>
  )
}
