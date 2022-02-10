import { ApolloConsumer } from "@apollo/client"
import { FC } from "react"
import { MainLogic } from "./MainLogic"
import { ViewMainComponent } from "./Views/ViewMainComponent"

export const MainComponent: FC = () => {
    return <ApolloConsumer>
        {client =>
            <MainLogic client={client}>
                {
                    (data) => <ViewMainComponent data={data}  />
                }
            </MainLogic>
        }
    </ApolloConsumer>
}

