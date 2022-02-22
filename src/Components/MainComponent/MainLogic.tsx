import { FC, useEffect } from "react"
import { ApolloClient, gql, useQuery } from '@apollo/client'
import { GET_USERS } from "../../Services/GraphQl/query";
import { useNavigate } from "react-router-dom";
import { persistor } from "../../App";

interface IMainProps {
  children?: (data: any) => JSX.Element
  client: ApolloClient<object>
}
interface UserModel {
  __typename: string
  email: string
  id: string
  password: string
  pseudo: string
}
export interface UsersDTO {
  users: UserModel[]
}

export const MainLogic: FC<IMainProps> = ({ children, client }) => {

  // console.log(client)
  const { loading, error, data } = useQuery(GET_USERS)
  const navigate = useNavigate()
  // if (loading) return 'Loading...'
  //   if (error) return `Error! ${error.message}`
  //  let access_token:null|string = null
  // try {
  //   const { token } = client.readFragment({
  //     id: 'user:1',
  //     fragment: gql`
  //   fragment MyToken on user {
  //       email
  //     id
  //     token
  //   }
  // `
  //     , variables: {
  //       id: 1,
  //     },
  //   })
  //   access_token = token
  // }
  // catch (err) {
  //   console.log('user not logged in!', err)
  // }
  // if (!token)
  // console.log('token: ', token)
  useEffect(() => {
    if (!loading) {
      if (error) {
        console.log('error:',error)
        persistor.purge()
        navigate("/Login")
        return console.log('user not connected!', error)
      }
      return console.log('user connected!')
    }
    return console.log('waiting response...')
  }, [error, loading])
  return (
    <>
      {!loading && !error && data && children && children(data)
      }
    </>
  )
}

