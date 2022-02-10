import { FC } from "react"
import { LOGIN_USER } from '../Services/GraphQl/mutation'
import { ApolloClient, gql, useMutation } from '@apollo/client'
import { useNavigate } from "react-router-dom"
import { persistor } from "../App"

interface ILoginProps {
    children?: (onFinish: ({ email, password }: Credentials) => any, onFinishFailed: (value: any) => void) => JSX.Element,
    client: ApolloClient<object>
}
export type Credentials = {
    email: string,
    password: string
}

export const LoginLogic: FC<ILoginProps> = ({ client, children }) => {

    const [login, { data, loading, error }] = useMutation(LOGIN_USER)

    const navigate = useNavigate()
    const onFinish = async ({ email, password }: Credentials): Promise<any> => {
        return await login({
            variables: {
                loginUserInput: {
                    username: email, password
                }
            }
        })
            .then((res) => {
                // console.log(res.data.login.access_token)
                //write to cache
                client.writeQuery({
                    query: gql`
                  query WriteToken($email: String!) {
                    user(email: $email) {
                      id
                      email
                      token
                    }
                  }`,
                    data: {
                        user: {
                            __typename: 'user',
                            id: 1,
                            email: res.data.login.user.email,
                            token: res.data.login.access_token
                        },
                    },
                    variables: {
                        email: res.data.login.user.email,
                    }
                })
            })
            .then(() => persistor.persist()
            )
            .then(() => navigate("/")
            )
    }
    const onFinishFailed = (errorInfo: any): void => {
        if (error) {
            console.log(error)
        }
        console.log('Failed:', errorInfo)
    }
    return (
        <>
            {children && children(onFinish, onFinishFailed)}
        </>
    )
}

