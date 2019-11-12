import React, { FC, useEffect, useState, useRef } from 'react'
import { useApi } from './useApi'

type DogApi = {
  message: string
}

export const App: FC = () => {
  const { request, state: response } = useApi<DogApi>()
  const [dog, setDog] = useState<DogApi>()

  const getDog = async () => {
    const dog = await request.get('breeds/image/random')
    if (!response.error) setDog(dog)
  }

  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted.current) return
    isMounted.current = true

    getDog()
  })

  return (
    <>
      {response.loading && <h2>Loading...</h2>}
      {response.error && <h2>`ERROR: ${response.error.message}`</h2>}
      {dog && <img src={dog.message} alt="new" />}
    </>
  )
}
