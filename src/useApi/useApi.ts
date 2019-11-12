import { useReducer, useCallback } from 'react'
import axios from 'axios'
import { reducer, initialState, ApiState } from './reducer'
import { Actions } from './actions'
import { Method } from './typings/api'

const baseURL = 'https://dog.ceo/api'
const client = axios.create({ baseURL: baseURL, method: 'GET' }) // defaults

type RequestData = (url: string, body?: object) => Promise<any>

type ApiRequest = {
  get: RequestData
  post: RequestData
  patch: RequestData
  put: RequestData
  delete: RequestData
}

type UseApi<T = any> = {
  request: ApiRequest
  state: ApiState<T>
}

export const useApi: <T>(url?: string) => UseApi<T> = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const makeRequest = useCallback(
    (method: Method): RequestData => {
      const doRequest = async (url: string, body?: object): Promise<any> => {
        let data: object = {}

        dispatch(Actions.fetching())

        try {
          const response = await client({
            url,
            data: body,
            method
          })
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

  const request: ApiRequest = {
    get: makeRequest('GET'),
    post: makeRequest('POST'),
    patch: makeRequest('PATCH'),
    put: makeRequest('PUT'),
    delete: makeRequest('DELETE')
  }

  return { request, state }
}
