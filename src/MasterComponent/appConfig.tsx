import {
    ApolloClient,
    InMemoryCache,
    from,
    HttpLink,
    ApolloLink,
    gql,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist"
import { returnTokenFromLocal } from "../Services/utilsFunction/parsingTokenFunctions"
export const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
            alert(`graphQl error ${message}`)
        })
    }
})

export const link = from([
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
export const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authorization token from local storage.

    let access_token: null | string = returnTokenFromLocal()
    console.log('app access_token: ', access_token)
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            authorization: access_token ? `Bearer ${access_token}` : null
        }
    })
    // Call the next link in the middleware chain.
    return forward(operation)
})
export const cache = new InMemoryCache();

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
            console.log("string:", JSON.stringify({ "user:1": d["user:1"] }))
            return JSON.stringify({ "user:1": d["user:1"] })
        }
    },
})
export const client = new ApolloClient({
    link: authLink.concat(link),
    cache
})