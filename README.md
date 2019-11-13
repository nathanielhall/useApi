# useApi (WIP)

`useApi` is a React hook used to send async api requests.


## Usage

### Simple Example


```javascript
import { useApi } from './useApi'

type DogApi = { message: string }

const Dog: FC = () => {
  const {
    response: { loading, error, response }
  } = useApi<DogApi>('breeds/image/random')

  return (
    <>
      {loading && <h2>Loading...</h2>}
      {error && <h2>`ERROR: ${error.message}`</h2>}
      {response && <img src={response.data.message} alt="dog" />}
    </>
  )
}

```


### Managed State
@todo



### Sequenced calls

@todo