import axios from 'axios'
import { RequestConfig, Response, RequestError } from './types'

// FIXME:
const baseURL = 'https://dog.ceo/api'

// Set axios defaults here
const axiosClient = axios.create({ baseURL, method: 'GET' })

export const client: <TRequestData, TResponseData>(
  config: RequestConfig<TRequestData>
) => Promise<Response<TResponseData>> = async (config) => {
  const onSuccess = (response: Response) => {
    console.debug('Success!', response)
    return response
  }

  const onError = (error: RequestError) => {
    console.error('ERROR', error.config)
    return Promise.reject(error)
  }

  try {
    const response = await axiosClient(config)
    return onSuccess(response)
  } catch (error) {
    return onError(error)
  }
}
