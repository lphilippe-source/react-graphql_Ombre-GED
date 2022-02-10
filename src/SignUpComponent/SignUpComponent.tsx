import { ApolloConsumer } from "@apollo/client"
import { FC } from "react"
import { SignUpLogic } from "./SignUpLogic"
import { ViewSignUpComponent } from "./Views/ViewSignUpComponent"

export const SignUpComponent: FC = () => {
    return <ApolloConsumer>
        {client =>
            <SignUpLogic client={client}>
                {
                    (onFinish: (value: any) => void, onFinishFailed: (value: any) => void) =>
                     <ViewSignUpComponent onFinish={onFinish} onFinishFailed={onFinishFailed} />
                }
            </SignUpLogic>
        }
    </ApolloConsumer>
}

