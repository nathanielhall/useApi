import { Response, RequestError } from './typings/api'
import { ActionUnion } from './typings/types'

export const FETCHING = '[api] Fetching'
export const SUCCESS = '[api] Success'
export const ERROR = '[api] Error'

export const Actions = {
  fetching: () => <const>{ type: FETCHING },
  success: <T>(response: Response<T>) => <const>{ type: SUCCESS, payload: response },
  error: (error: RequestError) => <const>{ type: ERROR, payload: error }
}

export type Actions = ActionUnion<typeof Actions>
