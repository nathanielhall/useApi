# useApi

`useApi` is a React hook used to send async api requests.

## Install

```git
git clone https://github.com/nathanielhall/starter-app-typescript.git
```

## Examples

### Basic Query Example

```jsx
import React, { FC } from 'react'
import { useApi } from './useApi'

type DogApi = {
  message: string
}
export const App: FC = () => {
  const [getDog] = useApi < DogApi > 'breeds/image/random'

  if (getDog.loading) return <h2>Loading</h2>
  if (getDog.error) return <h2>'Error'</h2>

  return (
    <>
      {getDog.response && <img src={getDog.response.data.message} alt="new" />}
    </>
  )
}
```

### Sequenced useApi calls

@todo
