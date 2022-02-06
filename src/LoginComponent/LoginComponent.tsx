import { ApolloConsumer } from "@apollo/client"
import { FC } from "react"
import { LoginLogic } from "./LoginLogic"
import { FormComponent } from "./Views/FormComponent"

export const LoginComponent: FC = () => {
    return <LoginLogic>
        {
            (onFinish: (value: any) => void, onFinishFailed: (value: any) => void) =>
                <ApolloConsumer>
                    {client =>
                        <FormComponent
                            client={client}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}>
                        </FormComponent>
                    }
                </ApolloConsumer>
        }
    </LoginLogic>
}

