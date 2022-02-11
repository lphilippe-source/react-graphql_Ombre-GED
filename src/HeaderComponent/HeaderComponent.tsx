import { FC } from "react"
import '../css/index.css'
import { ViewPageHeader } from './Views/ViewPageHeader'
import { HeaderLogic } from './HeaderLogic'

interface IHeaderComponentProps {
  route: BreadCrumb
}
export interface BreadCrumb {
  path: string,
  breadcrumbName: string
}

export const HeaderComponent: FC<IHeaderComponentProps> = ({ route }) => {

  return (
    < HeaderLogic route={route}>
      {
        (navigate: any, routes: any) => < ViewPageHeader navigate={navigate} routes={routes} />
      }
    </HeaderLogic>
  )
}
