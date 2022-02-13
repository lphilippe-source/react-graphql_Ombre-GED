import { ApolloConsumer } from "@apollo/client"
import { FC } from "react"
import { ForgotPassLogic } from "./ForgotPassLogic"
import { EnterMailForPassGen } from "./Views/EnterMailForPassGen"
import { FormComponent } from "./Views/FormComponent"
import { ViewTitle } from "./Views/ViewTitle"

export const ForgotPassComponent: FC = () => {
    return <ApolloConsumer>
        {
            client => <ForgotPassLogic client={client}>
                {
                    (onFinish: (value: any) => void, onFinishFailed: (value: any) => void) =>
                        <FormComponent
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}>
                        </FormComponent>
                }
                        {()=><ViewTitle/>}
                        {(sendMail:(email:any)=>any)=><EnterMailForPassGen sendMail={sendMail}/>}
            </ForgotPassLogic>
        }
    </ApolloConsumer>
}

