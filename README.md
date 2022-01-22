# @nathanielhall/useapi
> This project contains a set of React hooks to reduce the boilerplate when working with async code. This was created to support my personal projects as a github package. 

## useApi

### Simple example
> 
```javascript
type DogApi = { id: number, name: string }

const Dog: FC = () => {
  const [request, response] = useApi<DogApi>('breeds/random', [])

  return (
    <>
      {request.loading && <span>Loading...</span>}
      {request.error && <div>Error!</div>}
      {response && <img src={response.data.message} alt="dog" />}
    </>
  )
}
```

### Trigger a later request
> The request object can be used to send api requests.

```javascript
export const Dog: FC = () => {
  const [request, response] = useApi()

  return (
    <>
      <button type="button" onClick={() => request.get<DogApi>('breeds/image/random')}>
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

### Sequence multiple requests
> This can be accomplished using a condition such as a ternary. 
> The request will not be triggered unless the URL is provided
```javascript
const [userRequest, userResponse] = useApi<User>('users/me')
const [detailsRequest, detailsResponse] = useApi<UserDetails>(
  userResponse ? `users/${userResponse.Id}details/` : null
)
```

### Trigger a request when state changes
> Trigger an api request when state changes using dependency array
```javascript
const [request, response] = useApi<User>('users/me', [selectedUser])
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

## useApiQuery
> This is very similar to `useApi`. However, it accepts a promise instead of the url or request object.

### Pass a promise using useApiQuery
> 
```javascript
  const [request, dogNames] = useApiQuery<DogName[]>((req) =>
    req.get<DogApi>('breeds/image/random').then((resp) => {
      return resp.data.map(d => ({name: d.name}))
    })
  )
```

```javascript
const Dog: FC = () => {
  const submitForm = (request) => request.post<Dog>({url, data, headers})
  const [requestToSave, responseFromSave] = useApiState(submitForm)

  return (
    <>
      <button type="button" onClick={requestToSave.send()}>
       Save
      </button>
      {(requestDogs.loading || requestToSave.loading) && <span>Loading...</span>}
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
## ApiConfigurationProvider
> Apply top level configuration without the need to pass through to every hook

```javascript
<ApiConfigurationProvider baseURL={baseURL} headers={headers}>
  ...
</ApiConfigurationProvider>
```


