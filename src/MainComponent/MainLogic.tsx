import { FC } from "react"
import { LOGIN_USER } from '../Services/GraphQl/mutation'
import { ApolloClient, useMutation } from '@apollo/client'

interface IMainProps {
    children?:()=>JSX.Element
    client: ApolloClient<object>
}
// export type UserDto = {
//     email: string,
//     password: string
// }

export const MainLogic: FC<IMainProps> = ({ children,client }) => {

   console.log(client) 

    return (
        <>
            {children && children()}
        </>
    )
}

