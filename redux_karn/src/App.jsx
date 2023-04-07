import * as React from 'react'
import { useGetAllAttractionsQuery } from './services/attraction'

export default function App() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetAllAttractionsQuery('')
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  return (
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <ul>
            {data.map(attraction => (
              <li key={attraction.id}>
                {attraction.name}{attraction.detail}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  )
}