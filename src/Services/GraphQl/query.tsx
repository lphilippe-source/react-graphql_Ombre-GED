import { gql } from '@apollo/client'

export const GET_USERS = gql`
{
  users {
    id
    pseudo
    password
    email
  }
}
`