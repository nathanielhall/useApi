import { Client } from './client'

interface ActionCreator<A> {
  (...args: any[]): A
}
interface ActionCreatorsMapObject<A = any> {
  [key: string]: ActionCreator<A>
}
export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<
  T[keyof T]
>

export type Method =
  | 'GET'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'POST'
  | 'PUT'
  | 'PATCH'

interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}
interface Cancel {
  message: string
}

export type RequestConfig<PAYLOAD = any> = {
  url?: string
  method?: Method
  baseURL?: string
  headers?: any
  params?: any
  data?: PAYLOAD
  cancelToken?: CancelToken
}

export type Response<TData = any> = {
  data: TData
  status: number
  statusText: string
  request?: any
}

export type RequestError = Error & {
  config: RequestConfig
  code?: string
  request?: any
  response?: Response
  stack?: string
}

export type Query = <T, D = any>(
  url?: string,
  body?: D | undefined,
  config?: RequestConfig<D>
) => Promise<void>

export type PromiseProp<T> = (client: Client) => Promise<T>

export type Request = {
  get: Query
  post: Query
  patch: Query
  put: Query
  delete: Query
  makeRequest: (props: any) => Promise<void> // FIXME:
  loading: boolean
  error: RequestError | undefined
  abort: () => void
}

// conditional type here?
// export type ApiState<T> = [Request, T | Response<T>]

export type MakeRequestProps<T> = {
  method?: Method
  url?: string
  requestConfig?: RequestConfig
  promise?: PromiseProp<T>
}
// export type MakeRequest = (
//   props: MakeRequestProps
// ) => Promise<any | Response<any>>
