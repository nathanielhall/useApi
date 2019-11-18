# useApi

> `useApi` is a React hook used to send async api requests. 
> The purpose of this repository is to build the foundation for the useApi hook. Over time features will be added in, until then, the only purpose is to build a **simple foundation**.


## Usage


#### Notes
+ The useApi hook returns an array with the first element as the request and second as the response. 
+ When a resource url is passed as argument, the hook will execute the request, as _GET_ request, when the component first renders.  
+ The request functions return ```Promise<Response<T>>``` which can be typed through the useApi or on the api request functions such as ```request.get<SomeType>('some/resourceUrl')```. This typing sets the type on the response data. Currently, the request data (body) is an ```any```. 

```javascript
 const [request, response] = useApi<DogApi>('breeds/image/random')
```


> The properties of both elements are listed below. Keep in mind, the response is undefined until retrieved. 
```js
request: {get, delete, patch, post, put, loading, error}
response: {data, status, statusText}
```


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
const [getUser, userResp] = useApi<User>('users/me')
const [getUserDetails, detailsResp] = useApi<UserDetails>(
  userResp ? `users/${userResp.Id}details/` : null
)
```

### How to trigger multiple requests that are different
>
@todo

### Todo Items
+ Ability to abort requests when the component unmounts
+ Add function to ```resend``` the request provided through useApi
+ Review the idea of having a separate function and typing for get requests(queries) and all others (commands)
+ 