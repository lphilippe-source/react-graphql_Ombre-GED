import { ApolloConsumer } from "@apollo/client"
import { FC } from "react"
import { LoginLogic } from "./LoginLogic"
import { FormComponent } from "./Views/FormComponent"

export const LoginComponent: FC = () => {
    return <ApolloConsumer>
        {
            client => <LoginLogic client={client}>
                {
                    (onFinish: (value: any) => void, onFinishFailed: (value: any) => void) =>
                        <FormComponent
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}>
                        </FormComponent>
                }
            </LoginLogic>
        }
    </ApolloConsumer>
}

