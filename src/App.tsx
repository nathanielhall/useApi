import React, {
  FC
  // useEffect,
  // useState,
  // useRef
} from 'react'
import { useApi } from './useApi'

type DogApi = { message: string }

// const UnManagedState: FC = () => {
//   const [{ get, loading, error }, response] = useApi<DogApi>(
//     'breeds/image/random'
//   )
//   return (
//     <>
//       <button type="button" onClick={() => get('breeds/image/random')}>
//         New Image!
//       </button>
//       <div>
//         {loading && <h2>Loading...</h2>}
//         {error && <h2>{`ERROR: ${error.stack || error.message}`}</h2>}
//         {response && <img src={response.data.message} alt="new" />}
//       </div>
//     </>
//   )
// }

const ManagedState: FC = () => {
  const [dog, setDog] = React.useState<DogApi>() // managing state
  const [request] = useApi<DogApi>()

  React.useEffect(() => {
    request.get<DogApi>('breeds/image/random').then((response) => {
      if (response.status === 200) {
        setDog(dog)
      }
    })
  }, [])

  return (
    <>
      <button type="button" onClick={() => request.get('breeds/image/random')}>
        New Image!
      </button>
      <div>
        {request.loading && <h2>Loading...</h2>}
        {request.error && (
          <h2>{`ERROR: ${request.error.stack || request.error.message}`}</h2>
        )}
        {/* {response && <img src={response.data.message} alt="new" />} */}
        {dog && <img src={dog.message} alt="new" />}
      </div>
    </>
  )
}

export const App: FC = () => <ManagedState />
