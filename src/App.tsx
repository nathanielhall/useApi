import React, { FC, useEffect, useState } from 'react'
import { useApi } from './useApi'

type DogApi = { message: string; status: string }

export const Dogs: FC = () => {
  const [request, response] = useApi<DogApi>('breeds/image/random')

  if (request.loading) return <span>Loading...</span>
  if (request.error) return <span>{request.error.message}</span>

  return (
    <>
      <div>{response && <img src={response.data.message} alt="dog" />}</div>
    </>
  )
}

export const UnMountExampleApp: FC = () => {
  const [show, setShow] = useState(true)

  return (
    <>
      <button type="button" onClick={() => setShow(!show)}>
        Toggle
      </button>
      <div>{show && <Dogs />}</div>
    </>
  )
}

export const Abort: FC = () => {
  const [request, response] = useApi<DogApi>('breeds/image/random')

  if (request.error) return <span>ERROR!</span>
  if (request.loading) {
    return (
      <>
        <div>
          <button type="button" onClick={() => request.abort()}>
            Abort Request!!
          </button>
        </div>
        <span>Loading...</span>
      </>
    )
  }

  return response ? (
    <>
      <div>
        <button onClick={() => request.get<DogApi>('breeds/image/random')}>
          New Dog
        </button>
      </div>
      <img src={response.data.message} alt="dog" />
    </>
  ) : null
}

export const Example3: FC = () => {
  const [request, response] = useApi<DogApi>('breeds/image/random')

  if (request.loading) return <span>Loading...</span>
  if (request.error) return <span>{request.error.message}</span>

  return (
    <>
      <button type="button" onClick={() => request.abort()}>
        Abort
      </button>
      <button type="button" onClick={() => request.get('breeds/image/random')}>
        New
      </button>
      <div>{response && <img src={response.data.message} alt="new" />}</div>
    </>
  )
}

export const ManagedState: FC = () => {
  const [dog, setDog] = useState<DogApi>()
  const [request] = useApi<DogApi>()

  useEffect(() => {
    const getRandomDog = async () => {
      request.get<DogApi>('breeds/image/random').then((response) => {
        if (response.status === 200) {
          setDog(response.data)
        }
      })
    }

    getRandomDog()
  }, [])

  return (
    <>
      {request.loading && <span>Loading...</span>}
      {request.error && <div>Error!</div>}
      {dog && <img src={dog.message} alt="dog" />}
    </>
  )
}

export const ManagedStateWithReload: FC = () => {
  const [dog, setDog] = useState<DogApi>({ message: '', status: '' })
  const [request] = useApi<DogApi>()

  const getRandomDog = async () => {
    request.get<DogApi>('breeds/image/random').then((response) => {
      if (response.status === 200) {
        setDog(response.data)
      }
    })
  }

  useEffect(() => {
    getRandomDog()
  }, [])

  return (
    <>
      <button type="button" onClick={getRandomDog}>
        New Image!
      </button>
      {request.loading && <span>Loading...</span>}
      <div>
        {request.error && (
          <h2>{`ERROR: ${request.error.stack || request.error.message}`}</h2>
        )}
        {dog && <img src={dog.message} alt="new" />}
      </div>
    </>
  )
}

// Display example
export const App: FC = () => <Example3 />
