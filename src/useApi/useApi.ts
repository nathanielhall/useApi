import { useReducer, useEffect } from 'react'
import axios from 'axios'
import { reducer, initialState, ApiState } from './reducer'
import { Actions } from './actions'
import { Method } from './typings/api'

const baseURL = 'https://dog.ceo/api'
const client = axios.create({ baseURL: baseURL, method: 'GET' }) // defaults

// https://www.freecodecamp.org/news/how-to-work-with-react-the-right-way-to-avoid-some-common-pitfalls-fc9eb5e34d9e/
const signal = axios.CancelToken.source()

type UseApi<T = any> = [
  ApiState<T>,
  (url: string, body?: any, method?: Method) => Promise<void>
]

export const useApi: <T>(url?: string) => UseApi<T> = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (!url) {
      return
    }

    makeRequest(url)
    return () => {
      signal.cancel('Api is being canceled')
    }
  }, [url])

  const makeRequest: (
    url: string,
    body?: any,
    method?: Method
  ) => Promise<void> = async (url, body, method = 'GET') => {
    // @todo - cancel token...
    dispatch(Actions.fetching())

    try {
      const response = await client({
        url,
        data: body,
        method,
        cancelToken: signal.token
      })
      dispatch(Actions.success(response))
    } catch (e) {
      if (axios.isCancel(e)) {
        console.error('Error: ', e.message) // => prints: Api is being canceled
      } else {
        dispatch(Actions.error(e))
      }
    }
  }

  return [state, makeRequest]
}
