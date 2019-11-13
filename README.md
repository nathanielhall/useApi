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
```javascript

const Dog: FC = () => {
  const [dog, setDog] = useState<DogApi>()    // maintain state
  const { request, response } = useApi<DogApi>()

  const getDog = async () => {
    const dog = await request.get('breeds/image/random')
    if (!response.error) setDog(dog)
  }

  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted.current) return
    isMounted.current = true

    getDog()
  })  // todo: add dependencies here

  return (
    <>
      {response.loading && <h2>Loading...</h2>}
      {response.error && <h2>`ERROR: ${response.error.message}`</h2>}
      {dog && <img src={dog.message} alt="new" />}
    </>
  )
}
```



### Sequenced calls

```javascript
import { useApi } from './useApi'

type DogApi = {
  message: string
}
export const App: FC = () => {
  const [response] = useApi<DogApi>('breeds/list/all')
  const [getImage] = useApi<DogApi>(response.data 
          ? `breed/${response.data.message[3]}/images/random` 
          : null)

  return (
    <>
      {getImage.loading && <h2>Loading...</h2>}
      {getImage.error && <h2>`ERROR: ${getImage.error.message}`</h2>}
      {getImage.response && <img src={getImage.response.data.message} alt="new" />}
    </>
  )
}
```