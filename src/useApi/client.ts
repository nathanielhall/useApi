import axios from 'axios'
import { RequestConfig, Response, RequestError } from './types'

const axiosClient = axios.create({ method: 'GET' })
let cancelToken = axios.CancelToken.source()

const actions = {
  cancel: () => cancelToken.cancel('cancel request'),
  isCancel: (error: RequestError) => axios.isCancel(error)
}

const request: <T = any>(
  config: RequestConfig
) => Promise<Response<T>> = async (config) => {
  const onSuccess = (response: Response) => {
    return response
  }

  const onError = (error: RequestError) => {
    if (axios.isCancel(error)) {
      cancelToken = axios.CancelToken.source()
    }

    console.error(error, 'onError')
    return Promise.reject(error)
  }

  try {
    const response = await axiosClient({
      ...config,
      cancelToken: cancelToken.token
    })
    return onSuccess(response)
  } catch (error) {
    console.error('error')
    return onError(error as RequestError)
  }
}

export const client = {
  actions,
  request,
  get: <T>(url: string) => request<T>({ url, method: 'GET' }),
  post: <T>(url: string, data: any) =>
    request<T>({ url, data, method: 'POST' }),
  put: <T>(url: string, data: any) => request<T>({ url, data, method: 'PUT' }),
  delete: <T>(url: string, data: any) =>
    request<T>({ url, data, method: 'DELETE' }),
  patch: <T>(url: string, data: any) =>
    request<T>({ url, data, method: 'PATCH' })
}
export type Client = typeof client
