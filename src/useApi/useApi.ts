import { useReducer, useCallback, useEffect } from 'react'

import { reducer, initialState, ApiState } from './reducer'
import { Actions } from './actions'
import { Method, Response } from './typings/api'

import axios from 'axios'
const baseURL = 'https://dog.ceo/api'
const client = axios.create({ baseURL: baseURL, method: 'GET' }) // defaults
//import { client } from './client'

type RequestData<T = any> = (url: string, body?: any) => Promise<Response<T>>

type ApiRequest<T> = {
  get: RequestData<T>
  post: RequestData<T>
  patch: RequestData<T>
  put: RequestData<T>
  delete: RequestData<T>
}

type UseApi<TResponse = any> = {
  request: ApiRequest<TResponse>
  state: ApiState<TResponse> // FIXME: rename (request: ApiRequest, response: ApiResponse)
}

export const useApi: <T>(url?: string) => UseApi<T> = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const makeRequest = useCallback(
    (method: Method): RequestData => {
      const doRequest = async (url: string, body?: any): Promise<any> => {
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

  const request = {
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

  return { request, state }
}
