import React, { FC } from "react"
import { FORGOT_PASSWORD, UPDATE_USER } from '../../Services/GraphQl/mutation'
import { ApolloClient, gql, useMutation } from '@apollo/client'
import { useLocation, useNavigate } from "react-router-dom"
import { persistor } from "../../MasterComponent/appConfig"

interface IForgotPassProps {
    children?: [(onFinish: ({ password2, password }: DoublePass) => any, onFinishFailed: (value: any) => void) => JSX.Element, () => JSX.Element, (sendMail: (email: string) => any) => any],
    client: ApolloClient<object>
}
export type DoublePass = {
    password: string
    password2: string
}

export const ForgotPassLogic: FC<IForgotPassProps> = ({ client, children }) => {

    const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER)
    const searchToken = useLocation().search
    const searchId = useLocation().search
    const token = new URLSearchParams(searchToken).get('token')
    const technicalId = new URLSearchParams(searchId).get('id')
    const navigate = useNavigate()
    const onFinish = async ({ password, password2 }: DoublePass): Promise<any> => {

        //write custom data to cache
        // TODO check double password
        const writeCache = async () => {
            return client.writeQuery({
                query: gql`
                  query WriteToken($id: Int!) {
                    user(id: $id) {
                      id
                      token
                    }
                  }`,
                data: {
                    user: {
                        __typename: 'user',
                        id: 1,
                        token
                    },
                },
                variables: {
                    id: 1
                }
            })
        }
        writeCache().then(() => persistor.persist()
        )
            .then(() => updateUser({
                variables: {
                    userIdOrMail: technicalId,
                    updatedUser: {
                        password
                    }
                }
            })
            )
    }
    const onFinishFailed = (errorInfo: string): void => {
        if (error) {
            console.log(error)
        }
        console.log('Failed:', errorInfo)
    }
    //query after submitting mail to get mail with link
    const [forgotPass] = useMutation(FORGOT_PASSWORD)
    const sendMail = async ({ email }: any) => {
        console.log('emal:', email)
        return await forgotPass({
            variables: {
                userMail: email
            }
        })
            .then((res) => console.log('response forgotpass: ', res))
    }
    const enterMailOrTypeTwoPassword = () => {
        if (token) {
            return children && children[0](onFinish, onFinishFailed)
        }
        return children && children[2](sendMail)
    }
    return (
        <>
            {children && children[1]()}
            {children && enterMailOrTypeTwoPassword()}
        </>
    )
}

