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

//create query to write into cache
export const onLoginValidate = async ({ email, password }: Credentials,login:Login): Promise<any> => {
    return await login({
        variables: {
            loginUserInput: {
                username: email,
                 password
            }
        }
    })
        .then((userData) => {
            //write to cache
            console.log('login response', userData)
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
                        email: userData.data.login.user.email,
                        token: userData.data.login.access_token
                    },
                },
                variables: {
                    email: userData.data.login.user.email,
                }
            })
            return userData
        })
        .then((userData) => {
            //write to cache
            client.writeQuery({
                query: gql`
                query WriteListFiles($email: String!) {
                files(email: $email) {
                  id
                  files
                }
            }`,
                data: {
                    files: {
                        __typename: 'files',
                        id:1,
                        files: userData.data.login.user.files
                    },
                },
                variables: {
                    email: userData.data.login.user.email,
                }
            })
        })
        .then(() => persistor.persist()
        )
        
}