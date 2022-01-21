import { ActionUnion, Response, RequestError } from './types'

// Constants
export const FETCHING = '[api] Fetching'
export const SUCCESS = '[api] Success'
export const ERROR = '[api] Error'

// Action Creators
export const Actions = {
  fetching: () => ({ type: FETCHING } as const),
  success: (response: Response) =>
    ({ type: SUCCESS, payload: response } as const),
  error: (error: RequestError) => ({ type: ERROR, payload: error } as const)
}

export type Actions = ActionUnion<typeof Actions>

// Reducer
export type InternalState<T> = {
  response?: T
  loading: boolean
  error?: RequestError
}
// const initialResponse: Response = { status: 500, statusText: '', data: [] }
export const initialState = {
  response: undefined,
  loading: false,
  error: undefined
}

export const reducer = (
  state: InternalState<any> = initialState,
  actions: Actions
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
