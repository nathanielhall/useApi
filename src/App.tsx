import React, { FC } from 'react'
import { useApi } from './useApi'

type DogApi = { message: string; status: string }

export const UnManagedState: FC = () => {
  const [request, response] = useApi<DogApi>('breeds/image/random')

  return (
    <>
      {request.loading && <span>Loading...</span>}
      {request.error && <div>Error!</div>}
      {response && <img src={response.data.message} alt="dog" />}
    </>
  )
}

export const Example3: FC = () => {
  const [request, response] = useApi<DogApi>('breeds/image/random')

  return (
    <>
      <button type="button" onClick={() => request.get('breeds/image/random')}>
        New Image!
      </button>
      {request.loading && <span>Loading...</span>}
      <div>
        {request.error && (
          <h2>{`ERROR: ${request.error.stack || request.error.message}`}</h2>
        )}
        {response && <img src={response.data.message} alt="new" />}
      </div>
    </>
  )
}

export const ManagedState: FC = () => {
  const [dog, setDog] = React.useState<DogApi>()
  const [request] = useApi<DogApi>()

  React.useEffect(() => {
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
  const [dog, setDog] = React.useState<DogApi>()
  const [request] = useApi<DogApi>()

  const getRandomDog = async () => {
    request.get<DogApi>('breeds/image/random').then((response) => {
      if (response.status === 200) {
        setDog(response.data)
      }
    })
  }

  React.useEffect(() => {
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
