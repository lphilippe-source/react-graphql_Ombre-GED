import { FC } from "react"
import { ApolloClient, useMutation } from '@apollo/client'
import { useNavigate } from "react-router-dom"
import { CREATE_USER, LOGIN_USER } from "../../Services/GraphQl/mutation"
import { Credentials, LoginLogic } from "../../Components/LoginComponent/LoginLogic"
import { onLoginValidate } from "../../Services/utilsFunction/successLoginFunction"


export interface UserModel {
  __typename?: string
  email?: string
  id?: string
  password: string
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


  const [signUp, { loading, error }] = useMutation(CREATE_USER)
  const [login] = useMutation(LOGIN_USER)
  const navigate = useNavigate()
  const onFinish = async ({ email, password, pseudo }: UserModel): Promise<any> => {
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
        return onLoginValidate({ email: res.data.createUser.email, password }, login)
      })
      .then((afterValidation) => {
        console.log('afterValidation: ', afterValidation)
        navigate("/")
      }
      )
  }

  const onFinishFailed = (errorInfo: any): void => {
    if (error) {
      console.log(error)
    }
    console.log('Failed:', errorInfo)
  }
  // TODO if token already exist-> you re already connected
  // TODO if email already exist-> you already have an account

  return (
    <>
      {!loading && !error && children && children(onFinish, onFinishFailed)
      }
    </>
  )
}

