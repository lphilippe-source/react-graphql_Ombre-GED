import { FC } from "react"
import { ApolloClient, gql, useMutation, useQuery } from '@apollo/client'
import { GET_USERS } from "../Services/GraphQl/query";
import { useNavigate } from "react-router-dom";
import { CREATE_USER } from "../Services/GraphQl/mutation";
import { Credentials } from "../LoginComponent/LoginLogic";


export interface UserModel {
  __typename?: string
  email?: string
  id?: string
  password?: string
  pseudo?: string
}
export interface UsersDTO {
  users: UserModel[]
}
interface ISignUpProps {

  children?: (onFinish: ({ email, password }: Credentials) => any, onFinishFailed: (value: any) => void) => JSX.Element,
  client: ApolloClient<object>
};

export const SignUpLogic: FC<ISignUpProps> = ({ children, client }) => {


  const [signUp, { data, loading, error }] = useMutation(CREATE_USER)
  const navigate = useNavigate()
  const onFinish = async ({ email, password ,pseudo}: UserModel): Promise<any> => {
    return await signUp({
      variables: {
        user: {
          pseudo: pseudo,
          password: password,
          email: email
        }
      }
    })
      .then((res) => {
        console.log(res)
        navigate("/")
        // client.writeQuery({
        //   query: gql`
        //           query WriteToken($email: String!) {
        //             user(email: $email) {
        //               id
        //               email
        //               token
        //             }
        //           }`,
        //   data: {
        //     user: {
        //       __typename: 'user',
        //       id: 1,
        //       email: res.data.login.user.email,
        //       token: res.data.login.access_token
        //     },
        //   },
        //   variables: {
        //     email: res.data.login.user.email,
        //   }
        // })
      })
  }

  const onFinishFailed = (errorInfo: any): void => {
    if (error) {
      console.log(error)
    }
    console.log('Failed:', errorInfo)
  }
  // TODO if token already exist-> you already have an account
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
  //   navigate("/Login")
  // }
  return (
    <>
      {!loading && !error && children && children(onFinish, onFinishFailed)
      }
    </>
  )
}

