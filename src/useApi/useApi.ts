import { useReducer, useCallback, useEffect, useRef } from 'react'
import { reducer, initialState, Actions } from './reducer'
import { Method, Response, RequestError } from './types'
import { client, CancelToken } from './client'

type Query = <T>(url: string, body?: any) => Promise<Response<T>>

type UseApi<T> = [
  {
    get: Query
    post: Query
    patch: Query
    put: Query
    delete: Query
    loading: boolean
    error: RequestError | undefined
    abort: () => void
  },
  Response<T> | undefined
]

export const useApi: <T>(url?: string) => UseApi<T> = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const mountedRef = useRef(true)

  const makeRequest = useCallback(
    (method: Method): Query => {
      const doRequest: Query = async (url, body) => {
        let data: any = {}

        dispatch(Actions.fetching())
        try {
          const response = await client({
            url,
            data: body, // FIXME: rename body to data for simplicity
            method,
            cancelToken: CancelToken.token
          })

          if (mountedRef.current) {
            dispatch(Actions.success(response))
            data = response
          }
        } catch (e) {
          dispatch(Actions.error(e))
        }

        return data
      }

      return doRequest
    },
    [url]
  )

  const httpClient = {
    get: makeRequest('GET'),
    post: makeRequest('POST'),
    patch: makeRequest('PATCH'),
    put: makeRequest('PUT'),
    delete: makeRequest('DELETE'),
    abort: () => {
      mountedRef.current = false
      CancelToken.cancel('Abort request')
    }
  }

  // cleanup
  useEffect(() => {
    return () => {
      httpClient.abort()
    }
  }, [])

  useEffect(() => {
    if (!url) return

    httpClient.get(url)
  }, [url])

  const { loading, error, ...other } = state
  return [{ loading, error, ...httpClient }, other.response]
}
