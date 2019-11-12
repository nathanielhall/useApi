import { Response, RequestError } from './typings/api'
import { ActionUnion } from './typings/types'

export const FETCHING = '[api] Fetching'
export const SUCCESS = '[api] Success'
export const ERROR = '[api] Error'

export const Actions = {
  fetching: () => ({ type: FETCHING } as const),
  success: <T>(response: Response<T>) =>
    ({ type: SUCCESS, payload: response } as const),
  error: (error: RequestError) => ({ type: ERROR, payload: error } as const)
}

export type Actions = ActionUnion<typeof Actions>
