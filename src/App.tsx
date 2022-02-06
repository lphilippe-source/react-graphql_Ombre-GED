import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { Login } from "./pages/Login"
import { Main } from "./pages/Main"

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

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})
console.log(client.cache)
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
