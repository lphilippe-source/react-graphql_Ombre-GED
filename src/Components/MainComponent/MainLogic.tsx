import { FC, useEffect } from "react"
import { ApolloClient, gql, useQuery } from '@apollo/client'
import { GET_USERS } from "../../Services/GraphQl/query"
import { useNavigate } from "react-router-dom"
import { persistor } from "../../MasterComponent/appConfig"
import { isJson } from "../../Services/utilsFunction/parsingTokenFunctions"

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

  // const { loading, error, data } = useQuery(GET_USERS)


  //   try {
  //     const { userModel } = client.readFragment({
  //         id: 'UserModel:c76c827c-da2b-42aa-b911-1ff6648aa16b',
  //         fragment: gql`
  //   fragment getUserMail on userModel {
  //       email
  //   }
  // `
  //         // , variables: {
  //         //     id: 1,
  //         // },
  //     })
  //     console.log("userModel ----->: ",userModel )
  //     // return userModel
  // }
  // catch (err) {
  //     console.log('user not logged in!', err)
  // }
  const userData = window.localStorage.getItem('user-logged-in')
  let files
  if (isJson(userData)) {
    if (userData && JSON.parse(userData)) {
      console.log("userData----->", JSON.parse(userData)['files:1'])
      files = JSON.parse(userData)['files:1']
    }
  }
  else {
    persistor.purge()
    client.clearStore()
    navigate("/Login")
  }
  // console.log("userData------>", userData)

  // useEffect(() => {
  //   if (!loading) {
  //     if (error) {
  //       if (error.message = 'Unauthorized') {
  //         persistor.purge()
  //         client.clearStore()
  //         navigate("/Login")
  //       }
  //       console.log('error:', error)
  //       return console.log('user not connected!', error)
  //     }
  //     return console.log('user connected!')
  //   }
  //   return console.log('waiting response...')
  // }, [error, loading])
  return (
    <>
      {/* {!loading && !error && data && children && children(data) */}
      {files && children && children(files)
      }
    </>
  )
}

