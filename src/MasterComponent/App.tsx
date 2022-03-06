import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink,
  ApolloLink,
  gql,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { Login } from "../pages/Login"
import { Main } from "../pages/Main"
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist"
import { SignUp } from "../pages/SignUp"
import { ForgotPass } from "../pages/ForgotPass"
import { returnTokenFromLocal } from "../Services/utilsFunction/parsingTokenFunctions"

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
export const returnToken = () => {

  persistor.restore().then((res) => console.log('persistor: ', res))
  try {
    const { token } = client.readFragment({
      id: 'user:1',
      fragment: gql`
    fragment MyToken on user {
        email
      id
      token
    }
  `
      , variables: {
        id: 1,
      },
    })
    console.log("token: ", token)
    return token
  }
  catch (err) {
    console.log('user not logged in!', err)
  }
}
// export function returnTokenFromLocal() {

//   const data = window.localStorage.getItem('user-logged-in')
//   console.log(data)

//   if (isJson(data)) {
//     let token
//     if (data)
//       token = data && JSON.parse(data)['user:1'].token
//     console.log('data from storage: ', token)
//     return token && token
//   }
//   // return null
// }
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  // const token = localStorage.getItem('user-logged-in') ?? null
  // const setHeaders = async () => {
  // let access_token: null | string = returnToken()

  //   await returnToken()
  //     .then((access_token) => operation.setContext({
  //       headers: {
  //         authorization: access_token ? `Bearer ${access_token}` : null
  //       }
  //     }))
  let access_token: null | string = returnTokenFromLocal()
  console.log('app access_token: ', access_token)
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: access_token ? `Bearer ${access_token}` : null
    }
  })
  // }
  // Call the next link in the middleware chain.
  // setHeaders()
  return forward(operation)
})
const cache = new InMemoryCache();

//persist cache into localstorage
export const persistor = new CachePersistor({
  cache,
  key: 'user-logged-in',
  storage: new LocalStorageWrapper(window.localStorage),
  persistenceMapper: async (token: any) => {
    // filter your cached data and queries
    // return filteredData;
    const d = JSON.parse(token)
    console.log('dataformcache: ', d)
    if (d["user:1"]) {
      // console.log('data: ', d["user:1"])
      // return d["user:1"].token
      console.log("string:", JSON.stringify({ "user:1": d["user:1"] }))
      return JSON.stringify({ "user:1": d["user:1"] })
      // return d
    }

    // return localStorage.getItem('user-logged-in') ?? null
    // return returnToken() ?? null
  },
})
const client = new ApolloClient({
  // link: link,
  link: authLink.concat(link),
  cache
})
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login route="Login" />} />
          <Route path="/forgotpass" element={<ForgotPass route="ForgotPass" />} />
          <Route path="/" element={<Main route="Home" />} />
          <Route path="/signup" element={<SignUp route="Signup" />} />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App
