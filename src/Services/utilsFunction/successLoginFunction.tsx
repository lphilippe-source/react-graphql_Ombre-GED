import { gql  } from '@apollo/client'
import { client, persistor } from "../../MasterComponent/appConfig"
export type Credentials = {
    email: string,
    password: string
}
export type Login={
   (options:Options): Promise<any>
}
export type Options={
    variables:UserInput
}
export type UserInput={
    loginUserInput:Input
}
export type Input={
    username:string,
    password:string
}

export const onLoginValidate = async ({ email, password }: Credentials,login:Login): Promise<any> => {
    return await login({
        variables: {
            loginUserInput: {
                username: email,
                 password
            }
        }
    })
        .then((res) => {
            //write to cache
            console.log('login response', res)
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
        
}