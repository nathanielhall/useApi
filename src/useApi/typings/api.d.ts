export type Method =
  | 'GET'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'POST'
  | 'PUT'
  | 'PATCH'

export type Request<TBody = any> = {
  url?: string
  method?: Method
  headers?: any
  params?: any
  body?: TBody
}

export type Response<TData = any> = {
  data: TData
  status: number
  statusText: string
  request?: any
}

export type RequestError = Error & {
  config: Request
  code?: string
  request?: any
  response?: Response
  stack?: string
}
