import { FC, useEffect } from "react"
import { ApolloClient, gql, useQuery } from '@apollo/client'
import { GET_USERS } from "../../Services/GraphQl/query"
import { useNavigate } from "react-router-dom"
import { persistor } from "../../MasterComponent/appConfig"

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


  const navigate = useNavigate()

  const { loading, error, data } = useQuery(GET_USERS)

  useEffect(() => {
    if (!loading) {
      if (error) {
        if (error.message = 'Unauthorized') {
          persistor.purge()
          client.clearStore()
          navigate("/Login")
        }
        console.log('error:', error)
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

