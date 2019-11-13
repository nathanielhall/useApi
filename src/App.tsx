import React, {
  FC
  // useEffect,
  // useState,
  // useRef
} from 'react'
import { useApi } from './useApi'

type DogApi = { message: string }

const UnManagedState: FC = () => {
  const {
    request,
    state: { loading, error, response }
  } = useApi<DogApi>('breeds/image/random')

  return (
    <>
      <button type="button" onClick={() => request.get('breeds/image/random')}>
        New Image!
      </button>
      <div>
        {loading && <h2>Loading...</h2>}
        {error && <h2>{`ERROR: ${error.stack || error.message}`}</h2>}
        {response && <img src={response.data.message} alt="new" />}
      </div>
    </>
  )
}

// const ManagedState: FC = () => {
//   const [dog, setDog] = React.useState<DogApi>() // managing state
//   const { request, state: response } = useApi<DogApi>()

//   React.useEffect(() => {
//     request.get('breeds/image/random').then((response) => setDog(response.data))
//     console.log('getDog()', 'Local useEffect')
//   }, [])

//   return (
//     <>
//       <button type="button" onClick={() => request.get('breeds/image/random')}>
//         New Image!
//       </button>
//       <pre>{JSON.stringify(response, null, 2)}</pre>
//       <div>
//         {response.loading && <h2>Loading...</h2>}
//         {response.error && (
//           <h2>{`ERROR: ${response.error.stack || response.error.message}`}</h2>
//         )}
//         {response && dog && <img src={dog.message} alt="new" />}
//       </div>
//     </>
//   )
// }

export const App: FC = () => <UnManagedState />
