import { RequestConfig } from './types'
import React, { useContext, createContext } from 'react'

const ApiConfigContext = createContext<RequestConfig | undefined>(undefined)

type Props = RequestConfig & { children: React.ReactNode }
export const ApiConfigurationProvider = ({ children, ...configs }: Props) => {
  return (
    <ApiConfigContext.Provider value={{ ...configs }}>
      {children}
    </ApiConfigContext.Provider>
  )
}

export const useApiConfiguration = () => {
  const context = useContext<RequestConfig | undefined>(ApiConfigContext)
  return context === undefined ? {} : context
}
