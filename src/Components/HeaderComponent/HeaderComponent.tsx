import { FC } from "react"
// import '../css/index.css'
import { ViewPageHeader } from './Views/ViewPageHeader'
import { HeaderLogic } from './HeaderLogic'
import { ApolloConsumer } from "@apollo/client"

interface IHeaderComponentProps {
  route: BreadCrumb
}
export interface BreadCrumb {
  path: string,
  breadcrumbName: string
}

export const HeaderComponent: FC<IHeaderComponentProps> = ({ route }) => {

  return (
    <ApolloConsumer>
      {client =>
        <HeaderLogic route={route} client={client}>
          {
            (navigate: any, routes: any,isLoginToken:any,toggleLogin:()=>void) => < ViewPageHeader toggleLogin={toggleLogin} isLoginToken={isLoginToken} navigate={navigate} routes={routes} />
          }
        </HeaderLogic>}
    </ApolloConsumer>
  )
}
