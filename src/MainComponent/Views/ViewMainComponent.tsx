import { FC } from "react"

interface IToken{
    token:string
}

export const ViewMainComponent: FC<IToken> = ({token}) => {
  console.log(token) 
    return (
        <div>coucou</div>
    )
}
