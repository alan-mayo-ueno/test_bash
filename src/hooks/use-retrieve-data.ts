import { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios'
import useAxios, { RefetchOptions } from 'axios-hooks'

export interface UseRetrieveDataProps {
  url: string
  path: string
  headers?: Record<string, string>
}

export type UseRetrieveDataResult<Result, Error> = [
  { data?: Result; error?: AxiosError<Error>; loading: boolean },
  (config?: AxiosRequestConfig, options?: RefetchOptions) => AxiosPromise<Result>
]

/**
 * useRetrieveData is a retrieve data hook that returns a tuple 
 * containing an object with data, loading and error and a function.
 * 
 * ```typescript
 * 
 * const url = 'http://localhost:9000/api'
 * 
 * const [{ data, error, loading }, execute] = useRetrieveData({
 *  url,
 *  path: "test"
 * })
 * ```   
 * 
 * The execute method receives two optional parameters. The first is the configuration and the second options.
 */
function useRetrieveData<Result = unknown, ErrorResponse = unknown>({ 
  url = "", 
  path,
  headers 
}: UseRetrieveDataProps): UseRetrieveDataResult<Result, ErrorResponse> {
  const [{ data, error, loading }, execute] = useAxios<Result>({ url: `${url}/${path}`, method: 'GET', headers })
  return [{ data, error, loading }, execute]
}

export default useRetrieveData
