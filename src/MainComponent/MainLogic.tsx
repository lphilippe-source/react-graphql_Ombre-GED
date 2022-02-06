import { FC } from "react"
import { ApolloClient, gql } from '@apollo/client'

interface IMainProps {
    children?: (token: string) => JSX.Element
    client: ApolloClient<object>
}


export const MainLogic: FC<IMainProps> = ({ children, client }) => {

    console.log(client)
    const READ_TOKEN = gql`
  query ReadToken($id: Int!) {
    user(id: $id) {
        email
        id
      token
    }
  }
`
    const { token } =  client.readFragment({
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
    console.log('token: ', token)
    return (
        <>
            {token && children && children(token)
            }
        </>
    )
}

