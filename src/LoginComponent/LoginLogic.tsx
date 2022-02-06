import { FC } from "react"
import { LOGIN_USER } from '../Services/GraphQl/mutation'
import { useMutation } from '@apollo/client'
import {  useNavigate } from "react-router-dom"

interface ILoginProps {
    children?: (onFinish: ({email,password}: UserDto) => any, onFinishFailed: (value: any) => void) => JSX.Element
}
export type UserDto = {
    email: string,
    password: string
}

export const LoginLogic: FC<ILoginProps> = ({ children }) => {

    const [login, {data,loading, error }] = useMutation(LOGIN_USER)
    
    const navigate = useNavigate()
    const onFinish =async ({ email, password }: UserDto): Promise<any> => {
      return await login({
            variables: {
                loginUserInput: {
                    username: email, password
                }
            }
        })
        .then((res)=>{
            console.log(res.data.login.access_token)
            navigate("/main")
        })
        // console.log('Success:', email, password)
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

