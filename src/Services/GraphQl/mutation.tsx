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