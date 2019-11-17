interface ActionCreator<A> {
  (...args: any[]): A
}
interface ActionCreatorsMapObject<A = any> {
  [key: string]: ActionCreator<A>
}

/**
 * Returns union of all action creator types
 * @example
 * const Actions = {
 *    fetching: () => {type: FETCHING},
 *    success: (response) => {type: SUCCESS, payload: response}
 * }
 * export type Actions = ActionUnion<typeof Actions>
 */
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

export type RequestConfig<TData = any> = {
  url?: string
  method?: Method
  baseURL?: string
  headers?: any
  params?: any
  data?: TData
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
