# useApi

> `useApi` is a React hook used to send async api requests. It includes only the basic features. This is a work in progress!


## Usage


### Simple example
> By supplying a url to the hook, a request will be executed when the component renders for the first time.
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

### How to trigger a request
> The request object can be used to send api requests.

```javascript
export const Dog: FC = () => {
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

### How to maintain state outside useApi
> Since the request will return a response, you can maintain this state locally (outside the hook). 

```javascript
const Dog: FC = () => {
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
```

### How to sequence multiple requests
> This can be accomplished using a condition such as a ternary. 
> The request will not be triggered unless the URL is provided
```javascript
const [userRequest, userResponse] = useApi<User>('users/me')
const [detailsRequest, detailsResponse] = useApi<UserDetails>(
  userResponse ? `users/${userResponse.Id}details/` : null
)
```

### How to abort request
> When a component is unmounted the request will be cancelled. 
```js
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

export const Usage: FC = () => {
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
```

> Use `request.abort()` to manually cancel the request
```js
export const Dogs: FC = () => {
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
      <div>
        {response && <img src={response.data.message} alt="new" />}
      </div>
    </>
  )
}

```


### Todo Items
- [X] Ability to abort requests when the component unmounts
- [ ] Add function to ```resend``` the request provided through useApi
- [ ] Review the idea of having a separate function and typing for get requests(queries) and all others (commands)
- [ ] Ability to specify dependents through the useApi hook and request
  - `const x = useApi('myurl', [state])`
- [ ] Ability to specify a baseUrl from the usage