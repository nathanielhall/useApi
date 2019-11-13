import axios, { AxiosRequestConfig } from 'axios'
import { RequestError, Response, Method } from './typings/api'

// FIXME: add env variable to hold api port
// const port =
//   process.env['NODE_ENV'] === 'development'
//     ? !!process.env['API_PORT']
//       ? `:${process.env['API_PORT']}`
//       : ''
//     : ''
// const baseURL = `${document.location.protocol}//${document.location.hostname}${port}`

const baseURL = 'https://dog.ceo/api'
const axiosClient = axios.create({ baseURL: baseURL, method: 'GET' }) // defaults

export const client: <TResponse>(
  url: string,
  data?: any,
  method?: Method
) => Promise<Response<TResponse>> = async (url, data = {}, method = 'GET') => {
  const onSuccess = (response: Response) => {
    console.debug('Success!', response)
    return response.data
  }

  const onError = (error: RequestError) => {
    console.error('ERROR', error.config)

    return Promise.reject(error.response || error.message)
  }

  try {
    const axiosConfig: AxiosRequestConfig = { url, data, method }
    const response = await axiosClient(axiosConfig)
    return onSuccess(response)
  } catch (error) {
    return onError(error)
  }
}
