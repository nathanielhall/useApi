# useApi (WIP)

`useApi` is a React hook used to send async api requests.






## Usage

### Overview
> The useApi hook returns an array with the first element as the request and second as the response. 
> When a resource url is passed as argument, the hook will execute the request when the component first renders. The request executes as _GET_ request.
> The request returns ```Promise<Response<T>>``` which can be typed through the useApi or on the api request functions ```request.get<User>('api/user')```

```javascript
 const [request, response] = useApi<DogApi>('breeds/image/random')
```

### Simple example
> 
```javascript
import { useApi } from './useApi'
type DogApi = { message: string }

const Dog: FC = () => {
  const [request, response] = useApi<DogApi>('breeds/image/random')

  return (
    <>
      {request.loading && <span>Loading...</span>}
      {request.error && <div>Error!</div>}
      {response && <img src={response.data.message} alt="dog" />}
    </>
  )
}
```


### Manage State
> Maintain state for data while allowing the hook to manage state on the request (loading, error, e.g.).

```javascript
const Dog: FC = () => {
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
```


### Execute another request
> An api request is sent when the comoponent loads, and when the button is clicked. 
```javascript
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
```


### Sequenced calls

@todo


### Multiple Requests / Chaining
@todo