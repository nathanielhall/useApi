import { useReducer, useCallback, useEffect } from 'react'

import { reducer, initialState } from './reducer'
import { Actions } from './actions'
import { Method, Response, RequestError } from './typings/api'

import axios from 'axios'
const baseURL = 'https://dog.ceo/api'
const client = axios.create({ baseURL: baseURL, method: 'GET' }) // defaults
//import { client } from './client'

type Query = <T>(url: string, body?: any) => Promise<Response<T>>

type HttpClient = {
  get: Query
  post: Query
  patch: Query
  put: Query
  delete: Query
}

type UseApi<T> = [
  HttpClient & { loading: boolean; error: RequestError | undefined },
  Response<T> | undefined
]

export const useApi: <T>(url?: string) => UseApi<T> = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const makeRequest = useCallback(
    (method: Method): Query => {
      const doRequest: Query = async (url, body) => {
        let data: any = {}

        dispatch(Actions.fetching())

        try {
          const response = await client({ url, data: body, method })
          dispatch(Actions.success(response))
          data = response.data
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
    delete: makeRequest('DELETE')
  }

  useEffect(() => {
    if (!url) {
      return
    }

    const get = makeRequest('GET')
    get(url)
  }, [url])

  const { loading, error, ...other } = state
  const { response } = other

  return [{ loading, error, ...httpClient }, response]
}
