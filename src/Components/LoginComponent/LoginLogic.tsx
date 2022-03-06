import React, { FC } from "react"
import { LOGIN_USER } from '../../Services/GraphQl/mutation'
import { ApolloClient, useMutation } from '@apollo/client'
import { useNavigate } from "react-router-dom"
import { onLoginValidate } from "../../Services/utilsFunction/successLoginFunction"

interface ILoginProps {
    children?: [(onFinish: ({ email, password }: Credentials) => any, onFinishFailed: (value: any) => void) => JSX.Element, () => any],
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

        return onLoginValidate({ email, password }, login)
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

            {children && children[1]()}
            {children && children[0](onFinish, onFinishFailed)}
        </>
    )
}

