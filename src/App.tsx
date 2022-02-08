import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink,
  ApolloLink,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { Login } from "./pages/Login"
import { Main } from "./pages/Main"
import { CachePersistor, LocalStorageWrapper  } from "apollo3-cache-persist"

interface UserConnectedDTO {
  __typename: string,
  id: number,
  email: string,
  token: string
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      alert(`graphQl error ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:3000/graphql' })
])
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('apollo-cache-persist')??null
console.log(token)
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })
  // Call the next link in the middleware chain.
  return forward(operation)
})
const client = new ApolloClient({
  // link: link,
  link: authLink.concat(link),
  cache: new InMemoryCache()
})
const persistor = new CachePersistor({
  cache: client.cache,
  storage: new LocalStorageWrapper(window.localStorage),
  persistenceMapper: async (token: any) => {
    // filter your cached data and queries
    // return filteredData;
    const d = JSON.parse(token)
    console.log('data: ', {token:d["user:1"].token})
    return d["user:1"].token
  },
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App;
