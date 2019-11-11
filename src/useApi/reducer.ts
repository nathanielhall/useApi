import { Reducer } from 'react'
import { FETCHING, SUCCESS, ERROR, Actions } from './actions'
import { Response, RequestError } from './typings/api'

export type ApiState<T> = {
  response?: Response<T>
  loading: boolean
  error?: RequestError
}

export const initialState = {
  response: undefined,
  loading: false,
  error: undefined
}

export const reducer: Reducer<ApiState<any>, Actions> = (
  state = initialState,
  actions
) => {
  switch (actions.type) {
    case FETCHING:
      return { ...initialState, loading: true }
    case SUCCESS:
      return { ...state, loading: false, response: actions.payload }
    case ERROR:
      return { ...state, loading: false, error: actions.payload }
    default:
      return state
  }
}
