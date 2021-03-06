import { ApolloConsumer } from "@apollo/client"
import { FC } from "react"
import { MainLogic } from "./MainLogic"
import { ViewMainComponent } from "./Views/ViewMainComponent"

export const MainComponent: FC = () => {
    return <ApolloConsumer>
        {client =>
            <MainLogic client={client}>
                {
                    (fileInfo,DownloadFile,uploadFile,removeFile,isLoading) => <ViewMainComponent fileInfo={fileInfo} DownloadFile={DownloadFile} uploadFile={uploadFile} removeFile={removeFile} loading={isLoading} />
                }
            </MainLogic>
        }
    </ApolloConsumer>
}

