import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      access_token
      user {
        id
        email
        pseudo
      }
    }
  }
`
export const CREATE_USER = gql`
mutation createUser($user: UserDTO!) {
  createUser(user: $user) {
    id
    pseudo
    password
    email
  }
}`

export const UPDATE_USER = gql`
mutation updateUser($userIdOrMail: String!, $updatedUser: UserDTO!) {
  updateUser(userIdOrMail: $userIdOrMail, updatedUser: $updatedUser) {
    id
    password
    email
    pseudo
  }
}
`
export const FORGOT_PASSWORD=gql`
mutation forgotPassword($userMail: String!) {
  forgotPassword(userMail: $userMail) {
    id
    pseudo
    email
  }
}
`