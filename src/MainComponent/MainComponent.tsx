import { ApolloConsumer } from "@apollo/client"
import { FC } from "react"
import { MainLogic } from "./MainLogic"
import { ViewMainComponent } from "./Views/ViewMainComponent"

export const MainComponent: FC = () => {
    return <ApolloConsumer>
        {client =>
            <MainLogic client={client}>
                {
                    (token,data) => <ViewMainComponent data={data} token={token} />
                }
            </MainLogic>
        }
    </ApolloConsumer>
}

