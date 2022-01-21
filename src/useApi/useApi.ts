import { useReducer, useEffect } from 'react'
import { reducer, initialState, Actions, InternalState } from './reducer'
import {
  Method,
  Query,
  PromiseProp,
  Response,
  RequestError,
  RequestConfig,
  Request,
  MakeRequestProps,
} from './types'
import { Client, client } from './client'

function useApiBase<RESPONSE, PAYLOAD = any>(): [
  Request,
  RESPONSE | undefined
] {
  const [state, dispatch] = useReducer<
    React.Reducer<InternalState<RESPONSE>, Actions>
  >(reducer, initialState)

  const { cancel, isCancel } = client.actions

  const makeRequest = async ({
    method = 'GET',
    url,
    requestConfig = { url, method },
    promise = (c: Client) => c.request(requestConfig), // default promise
  }: MakeRequestProps<RESPONSE | Response<RESPONSE>>) => {
    dispatch(Actions.fetching())

    try {
      const response = await promise(client)
      dispatch(Actions.success(response as Response<RESPONSE>))
    } catch (e) {
      if (isCancel(e as RequestError) === false) {
        dispatch(Actions.error(e as RequestError))
      }
    }
  }

  const getQuery: (method: Method) => Query = (method) => {
    const query: Query = (url, body, config = { url, data: body }) =>
      makeRequest({ method: method, ...config })

    return query
  }

  const request: Request = {
    get: getQuery('GET'),
    post: getQuery('POST'),
    patch: getQuery('PATCH'),
    put: getQuery('PUT'),
    delete: getQuery('DELETE'),
    makeRequest,
    loading: state.loading,
    error: state.error,
    abort: () => {
      cancel()
    },
  }

  const { response } = state
  return [request, response]
}

export function useApiQuery<RESPONSE, PAYLOAD = any>(
  promise: PromiseProp<RESPONSE>,
  deps: ReadonlyArray<any> = []
): [Request, RESPONSE | undefined] {
  //
  const [request, response] = useApiBase<RESPONSE, PAYLOAD>()

  useEffect(() => {
    return () => {
      request.abort()
    }
  }, [])

  // Handle Initial Request
  useEffect(() => {
    if (!promise) return
    request.makeRequest({ promise })
  }, deps)

  return [request, response]
}

export function useApi<RESPONSE, PAYLOAD = any>(
  props: string | RequestConfig<PAYLOAD>,
  deps: ReadonlyArray<any> = []
): [Request, Response<RESPONSE> | undefined] {
  const [request, response] = useApiBase<Response<RESPONSE>, PAYLOAD>()

  useEffect(() => {
    return () => {
      request.abort()
    }
  }, [])

  // Handle Initial Request
  useEffect(() => {
    if (!props) return

    // console.log('useApi request')
    request.makeRequest({
      url: typeof props === 'string' ? props : undefined,
      requestConfig: typeof props === 'string' ? undefined : props,
    })
  }, deps)

  return [request, response]
}
